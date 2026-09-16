import apiClint from "@/lib/apiClint";

export function userLogin(payload: { email: string, password: string }) {
    return apiClint("/auth/login", { method: "POST", body: payload })
}
export function userLogOut() {
    return apiClint("/auth/logout", { method: "POST" })
}
export function getMe() {
    return apiClint("/auth/me", { method: "GET" })
} 