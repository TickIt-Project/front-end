import { http } from "@/shared/services/http-common.js";

export class AuthService {

    signUp(formData) {
        return http.post("authentication/sign-up", formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
    }

    signIn(formValues) {
        return http.post(`authentication/sign-in`,formValues);
    }

}