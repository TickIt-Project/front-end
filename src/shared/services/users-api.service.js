import { http } from "@/shared/services/http-common.js";

export class UsersService {

    getEmployeesByCompanyId() {
        return http.get(`/employees`);
    }

    getITMembersByCompanyId() {
        return http.get(`/it-members`);
    }

}