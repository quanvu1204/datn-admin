export interface ResponseType<T> {
    code: number;
    data: T;
    message: string;
}

export interface CustomerDTO {
    avatar: string;
    createdAt: string;
    deleted: boolean;
    email: string;
    firstName: string;
    id: string;
    isActive: boolean;
    lastName: string;
    sex: string;
    updatedAt: string;
}
