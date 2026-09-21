import { User } from "./user.types";

export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";
export interface AdditionalFile {
    url: string;
    publicId: string;
}


export interface ApplyDoctorApplicationData {
    user: {
        name: string;
        email: string;
    };

    doctor: {
        address?: string | null;
        specialization: string;
        licenseNumber: string;
        qualification: string;
        experinenceYears: number;
        bio?: string | null;
        consultationFee?: number | null;
        contactNumber?: string | null;
    };
};

export interface ApplyAsDoctorApplicationPayload {
    resume: File;
    additionalFiles: File[];
    data: ApplyDoctorApplicationData
}


export interface IDoctorEmailVerify {
    otp: string,
    email: string
}


export interface Doctor {
    id: string;
    name: string;
    email: string;
    address: string | null;
    specialization: string;
    licenseNumber: string;
    qualification: string;
    experinenceYears: number;
    bio: string | null;
    consultationFee: number | null;
    contactNumber: string | null;
    verificationStatus: VerificationStatus;
    rejectionReason: string | null;
    reviewedBy: string | null;
    reviewdAt: string | null;
    resume: string | null;
    resumePublicId: string | null;
    additionalFiles: AdditionalFile[];
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: User;
}

export interface DoctorParams {
    searchTerm?: string;
    specialization?: string;
    email?: string;
    licenseNumber?: string;
    verificationStatus?: VerificationStatus;
    page?: number;
    limit?: number;
}