import {Roles, Severity, Status} from "@/troubleshooting/model/enums.js";

export class IssueReportEntity {
    constructor(
                    id = '',
                    companyId = '',
                    title = '',
                    description = '',
                    screenId = '',
                    companyRoleId = '',
                    severity = Severity.LOW,
                    imgUrl = '',
                    status = Status.OPEN,
                    reporterId = Roles.EMPLOYEE,
                    assigneeId = Roles.IT_MEMBER,
                    resolvedAt = Date(),
                    ticketOption = false
                ) {
        this.id = id;
        this.companyId = companyId;
        this.title = title;
        this.description = description;
        this.screenId = screenId;
        this.companyRoleId = companyRoleId;
        this.severity = severity;
        this.imgUrl = imgUrl;
        this.status = status;
        this.reporterId = reporterId;
        this.assigneeId = assigneeId;
        this.resolvedAt = resolvedAt;
        this.ticketOption = ticketOption;
    }
}