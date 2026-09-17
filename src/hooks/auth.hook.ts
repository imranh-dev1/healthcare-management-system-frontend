import { getMe, userLogin, userLogOut } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export function useGetMe() {
    return useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false
    })
} 