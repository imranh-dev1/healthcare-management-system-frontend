import { applyAsDoctor } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useApplyAsDoctor() {
    return useMutation({
        mutationFn: applyAsDoctor
    })
}