import {IssueReportEntity} from "@/troubleshooting/model/report-entity.js";


//here I use the t to translate directly here!
export class IssueReportAssembler {
    EntityFromResponse(response) {
        const reportRaw = response;
        return new IssueReportEntity(
            reportRaw.id,
            reportRaw.companyId,
            reportRaw.title,
            reportRaw.description,
            reportRaw.screen,
            reportRaw.url,
            reportRaw.companyRole,
            reportRaw.severity,
            reportRaw.img_url ?? null,
            reportRaw.status,
            reportRaw.reporterId,
            reportRaw.assigneeId ?? null,
            reportRaw.resolvedAt ? new Date(reportRaw.resolvedAt) : null,
            reportRaw.submittedAt ? new Date(reportRaw.submittedAt) : null,
            reportRaw.ticketOption, //this is for jira

        )
    }

    EntitiesFromResponse(responseArray) {
        if (!Array.isArray(responseArray)) return [];
        return responseArray.map(item => this.EntityFromResponse(item)); }

}