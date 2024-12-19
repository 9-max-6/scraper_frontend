import { Skeleton } from "@/components/ui/skeleton"

export function CardWrapperFallback() {
    return (
        <div className="grid grid-cols-4 h-full w-full col-span-4 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
    )
}

export function OverviewFallback() {
    return (
        <div className="h-full w-full">
            <Skeleton className="h-[500px] w-full" />
        </div>
    )
}