import {IssueReportEntity} from "@/troubleshooting/model/report-entity.js";

export class IssueReportAssembler {
    static EntityFromResponse(response) {
        const reportRaw = response.data;
        return new IssueReportEntity(
            reportRaw.id,
            reportRaw.companyId,
            reportRaw.title,
            reportRaw.description,
            reportRaw.screenId,
            reportRaw.companyRoleId,
            reportRaw.severity,
            reportRaw.imgUrl,
            reportRaw.status,
            reportRaw.reporterId,
            reportRaw.assigneeId,
            reportRaw.resolvedAt,
            reportRaw.ticketOption
        )
    }
}