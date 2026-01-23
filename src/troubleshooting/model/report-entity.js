
export class IssueReportEntity {
    constructor(
                    id = '',
                    companyId = '',
                    title = '',
                    description = '',
                    screen = '',
                    companyRole = '',
                    severity,
                    imgUrl = '',
                    status ='',
                    reporter = '',
                    assignee = {name: '', imgUrl: ''} ?? null,
                    resolvedAt = new Date(),
                    submittedAt = new Date(),
                    ticketOption = false
                ) {
        this.id = id;
        this.companyId = companyId;
        this.title = title;
        this.description = description;
        this.screen = screen;
        this.companyRole = companyRole;
        this.severity = severity;
        this.imgUrl = imgUrl;
        this.status = status;
        this.reporter = reporter;
        this.assignee = assignee;
        this.resolvedAt = resolvedAt;
        this.submittedAt = submittedAt;
        this.ticketOption = ticketOption;
    }
}