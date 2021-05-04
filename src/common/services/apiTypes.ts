export interface ResponseType<T> {
    code: number;
    data: T;
    message: string;
}

export interface SignUpResponse {
    customer: UserResponse;
}

export interface UserResponse {
    id: string;
    email: string;
    avatar: string | null;
    createdAt: string;
    deleted: boolean;
    firstName: string;
    isActive: boolean;
    lastName: string;
    sex: string;
    updatedAt: string;
}

export interface UpdateRequest {
    email: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    sex: string;
}

export interface RasaRequest {
    sender: string;
    message: string;
}

export interface MessageDTO {
    id: string;
    customerId: string;
    isBot: boolean;
    message: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
