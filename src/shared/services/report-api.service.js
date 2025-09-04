import { http } from "@/shared/services/http-common.js";

export class IssueReportService {

    getRolesOfCompanyByCompanyId() {
        return http.get(`/rolesCompany`);
    }

    getSeverityOptions(){
        return http.get(`/severityOptions`);
    }

    getStatusOptions(){
        return http.get(`/statusOptions`);
    }

    getScreenLocationOptions(){
        return http.get(`/screenLocations`);
    }
    getIssuesByCompanyId(){
        return http.get(`/issues`);
    }
}