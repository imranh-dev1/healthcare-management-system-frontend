import apiClint from "@/lib/apiClint";
import { ApplyAsDoctorApplicationPayload } from "@/types/doctor.types";

export function applyAsDoctor(payload: ApplyAsDoctorApplicationPayload) {
    const formData = new FormData()

    formData.append("data", JSON.stringify(payload.data))
    formData.append("resume", payload.resume)

    for (const file of payload.additionalFiles) {
        formData.append("additionalFiles", file)
    }

    return apiClint("/doctor/applying-as-doctor", { method: "POST", body: formData })
}