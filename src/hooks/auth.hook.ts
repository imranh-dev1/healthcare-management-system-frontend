import { userLogin } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
    return useMutation({
        mutationFn: userLogin
    })
} 