export default interface Chat{
    id: number;
}

export default interface User {
    id: number;
    login: string;
    password: string;
    nickname: string;
    public_key: string;
    created_at: string;
    description: string | null;
    is_active: boolean;
    chats: Chat[];
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}