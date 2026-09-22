import { applyAsDoctor, approvedDoctor, doctorVerifyAccount, getAllDoctors, getSingleDoctor } from "@/api";
import { DoctorParams } from "@/types";
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

export function useGetAllDoctors(params: DoctorParams) {
    return useQuery({
        queryKey: ["doctors", params],
        queryFn: () => getAllDoctors(params),
    })
}

export function useSuspenceGetAllDoctors(params: DoctorParams) {
    return useSuspenseQuery({
        queryKey: ["doctors", params],
        queryFn: () => getAllDoctors(params),
    })
}

export function useGetSingleDoctor(params: { doctorId: string }, enabled: boolean) {
    return useQuery({
        queryKey: ["doctor", params.doctorId],
        queryFn: () => getSingleDoctor(params),
        enabled
    })
}

export function useApprovedDoctor() {
    return useMutation({
        mutationFn: approvedDoctor
    })
}