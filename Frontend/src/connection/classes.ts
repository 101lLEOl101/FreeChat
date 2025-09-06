export interface Chat {
    id: number;
    is_group: boolean;
    title: string;
    description: string | null;
    last_message_id: number | null;
    last_message_content: string | null;
    created_at: string;
}


export interface User {
    id: number;
    login: string;
    nickname: string;
    description: string | null;
    is_active: boolean;
    chats: Chat[] | null;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface ChatState {
    user: User | null;
    loading: boolean;
    error: string | null;
}