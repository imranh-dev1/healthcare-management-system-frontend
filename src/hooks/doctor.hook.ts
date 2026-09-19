import { applyAsDoctor, doctorVerifyAccount } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useApplyAsDoctor() {
    return useMutation({
        mutationFn: applyAsDoctor
    })
}

export function useDoctorVerifyAccount() {
    return useMutation({
        mutationFn: doctorVerifyAccount
    })
}

