import { getMe, googleAuthLogin, userLogin, userLogOut, userRegister } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";



export function useRegister() {
    return useMutation({
        mutationFn: userRegister
    })
}

export function useLogin() {
    return useMutation({
        mutationFn: userLogin
    })
}

export function useLogOut() {
    return useMutation({
        mutationFn: userLogOut
    })
}

export function useGoogleAuthLogin() {
    return useMutation({
        mutationFn: googleAuthLogin
    })
}

export function useGetMe() {
    return useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false
    })
} 