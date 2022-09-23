export declare const TABLE_REFERENCE = "user";
export interface User {
    id: number;
    username: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare function userModel(): object;
