export interface Login {
    accessToken: string;
    refreshToken: string;
}
export interface Register {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    roleId: number;
}
