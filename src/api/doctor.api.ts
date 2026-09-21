import apiClint from "@/lib/apiClint";
import { ApiResponse, ApplyAsDoctorApplicationPayload, Doctor, DoctorParams, IDoctorEmailVerify } from "@/types";

export function applyAsDoctor(payload: ApplyAsDoctorApplicationPayload) {
    const formData = new FormData()

    formData.append("data", JSON.stringify(payload.data))
    formData.append("resume", payload.resume)

    for (const file of payload.additionalFiles) {
        formData.append("additionalFiles", file)
    }

    return apiClint("/doctor/applying-as-doctor", { method: "POST", body: formData })
}

export function doctorVerifyAccount(payload: IDoctorEmailVerify) {
    return apiClint("/doctor/applying-as-doctor/email-verify", { method: "POST", body: payload })
}

export function getAllDoctors(params: DoctorParams) {
    return apiClint<ApiResponse<Doctor[]>>("/doctor/all-doctors", {
        params: params,
        method: "GET"
    })
}

export function getSingleDoctor(params: { doctorId: string }) {
    return apiClint<ApiResponse<Doctor>>(`/doctor/admin/doctors/${params.doctorId}`, { method: "GET" });
}

