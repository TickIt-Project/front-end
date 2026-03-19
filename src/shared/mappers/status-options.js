import {Status} from "@/shared/mappers/status.ts"

export const STATUS_OPTIONS = (t) => [
    { label: t('status.open'), value: Status.OPEN },
    { label: t('status.in_progress'), value: Status.IN_PROGRESS },
    { label: t('status.on_hold'), value: Status.ON_HOLD },
    { label: t('status.closed'), value: Status.CLOSED },
    { label: t('status.cancelled'), value: Status.CANCELLED }
]