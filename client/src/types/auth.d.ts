export interface registerUserPayload {
    username: string;
    email: string;
    phoneNumber: number;
    dob: string;
    password: string;

}

export interface loginUserPayload {
    username: string;
    email: string;
    phoneNumber: number;
    dob: string;
    password: string;

}

export interface updatedData {
    name?: string;
    username?: string;
    email?: string;
    avatar?: string;
    phoneNumber?: number;
    dob?: string;
    password?: string;
}
