export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT"
export type AuthProvider = "CREDENTIAL" | "GOOGLE";
export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface User {
    id: string;
    name: string;
    email: string;
    googleId: string | null;
    authProvider: AuthProvider;
    emailVerified: boolean;
    role: UserRole;
    status: UserStatus;
    needPasswordChange: boolean;
    isDeleted: boolean;
    imagePublicId: string;
    imageUrl: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}
