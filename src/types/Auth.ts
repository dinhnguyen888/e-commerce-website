export interface Login {
    accessToken: string;
    refreshToken: string;
}
export interface Register {
    email: string;
    password: string;
    confirmPassword: string;
    roleId: number;
}
