
export interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
    patient: {
        contactNumber?: string;
        address?: string;
    };
}

export interface IVerifyAccountPayload {
    email: string;
    otp: string;
}