import { differenceInCalendarDays } from "date-fns";
export function getTime(updatedAt: Date | null, createdAt: Date) {
    if (!updatedAt) {
        const diff = differenceInCalendarDays(new Date(), createdAt)
        if (diff === 0) return "Last updated today"
        if (diff === 1) return "Last updated yesterday"

        return `Last updated ${diff} days ago`
    }
    const diff = differenceInCalendarDays(new Date(), createdAt)
    if (diff === 0) return "Last updated today"
    if (diff === 1) return "Last updated yesterday"

    return `Last updated ${diff} days ago`
}