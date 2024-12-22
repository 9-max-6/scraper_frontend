import { Skeleton } from "@/components/ui/skeleton";

export function Fallback() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="ml-auto h-8 w-24" />
        </div>
    )
}