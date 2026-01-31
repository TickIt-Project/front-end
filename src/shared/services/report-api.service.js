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

    getScreenLocationByName(url) {
        return http.get('/screenLocations').then(res => {
            const screens = res.data[0];

            const entry = Object.entries(screens)
                .find(([_, value]) => value.toLowerCase() === url.toLowerCase());

            return entry ? entry[0] : null;
        });
    }

    getIssuesByCompanyId(){
        return http.get(`/issues`);
    }
    detakeIssue(issueId) {
        return http.patch(`/issues/${issueId}`, {
            assignee: null,
            status: "open"
        });
    }
    takeIssue(issueId, _assignee) {
        return http.patch(`/issues/${issueId}`, {
            assignee: _assignee,
            status: "in_progress"
        });
    }
    updateIssueStatus(issueId, status) {
        const payload = {
            status
        };

        if (status === 'closed' || status === 'cancelled') {
            payload.resolvedAt = new Date().toISOString();
        } else {
            payload.resolvedAt = null;
        }

        return http.patch(`/issues/${issueId}`, payload);
    }
}