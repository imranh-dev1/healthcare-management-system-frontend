import apiClint from "@/lib/apiClint";
import { IRegisterPatientPayload } from "@/types";

export function userRegister(payload: IRegisterPatientPayload) {
    return apiClint("/auth/register", { method: "POST", body: payload })
}

export function userLogin(payload: { email: string, password: string }) {
    return apiClint("/auth/login", { method: "POST", body: payload })
}
export function userLogOut() {
    return apiClint("/auth/logout", { method: "POST" })
}

export function googleAuthLogin(payload: { idToken: string }) {
    return apiClint("/auth/google", { method: "POST", body: payload })
}

export function getMe() {
    return apiClint("/auth/me", { method: "GET" })
} 