import { CryptoStorage } from "@webcrypto/storage";

async function deriveMasterKey(login: string, password: string): Promise<string> {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );

    const derivedKey = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: enc.encode(login),
            iterations: 100_000,
            hash: "SHA-256"
        },
        keyMaterial,
        256
    );

    return btoa(String.fromCharCode(...new Uint8Array(derivedKey)));
}

async function openKeyStorage(login: string, password: string) {
    const masterKey = await deriveMasterKey(login, password);
    return new CryptoStorage(masterKey);
}

async function generateKeyPair() {
    return await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
    );
}

async function exportPublicKey(publicKey: CryptoKey): Promise<string> {
    const spki = await crypto.subtle.exportKey("spki", publicKey);
    return btoa(String.fromCharCode(...new Uint8Array(spki)));
}

async function exportPrivateKey(privateKey: CryptoKey): Promise<string> {
    const pkcs8 = await crypto.subtle.exportKey("pkcs8", privateKey);
    return btoa(String.fromCharCode(...new Uint8Array(pkcs8)));
}

async function importPublicKey(base64: string): Promise<CryptoKey> {
    const binary = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    return await crypto.subtle.importKey(
        "spki",
        binary,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"]
    );
}

async function importPrivateKey(base64: string): Promise<CryptoKey> {
    const binary = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    return await crypto.subtle.importKey(
        "pkcs8",
        binary,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["decrypt"]
    );
}

export async function createAndStoreKeys(login: string, password: string){
    const storage = await openKeyStorage(login, password);
    const { publicKey, privateKey } = await generateKeyPair();

    const publicKeyB64 = await exportPublicKey(publicKey);
    const privateKeyB64 = await exportPrivateKey(privateKey);

    await storage.set("publicKey", publicKeyB64);
    await storage.set("privateKey", privateKeyB64);

    return { publicKey: publicKeyB64 };
}

export async function loadKeys(login: string, password: string){
    const storage = await openKeyStorage(login, password);
    const publicKeyB64 = (await storage.get("publicKey")) as string | undefined;
    const privateKeyB64 = (await storage.get("privateKey")) as string | undefined;

    if (!publicKeyB64 || !privateKeyB64) {
        throw new Error("Keys not found in storage");
    }

    const publicKey = await importPublicKey(publicKeyB64);
    const privateKey = await importPrivateKey(privateKeyB64);

    return { publicKey, privateKey };
}

export async function clearKeys(login: string, password: string) {
    const storage = await openKeyStorage(login, password);
    await storage.clear();
}