import { applyAsDoctor, doctorVerifyAccount, getAllDoctors } from "@/api";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

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

export function useGetAllDoctors() {
    return useQuery({
        queryKey: ["doctors"],
        queryFn: getAllDoctors,
    })
}

export function useSuspenceGetAllDoctors() {
    return useSuspenseQuery({
        queryKey: ["doctors"],
        queryFn: getAllDoctors,
    })
}
