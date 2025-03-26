export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: RolesEnum;
    avatar?: string;
}

export enum RolesEnum {
    ADMIN = 'admin',
    GUEST = 'guest',
    NONE = 'none'
} 