'use client'
import React, { useState, useEffect } from "react";
import { aggregatedBidsStore, bidStore } from "@/store/bid-store";
import DataCard from "./data-card";
import { BidTypeArray } from "@/types/types";
import { Skeleton } from "./ui/skeleton";

async function fetchOpportunities() {
    const response = await fetch("/api/bids");
    const data = await response.json();

    if (response.ok) {
        return data.data;
    } else {
        console.error("Failed to fetch opportunities:", data.error);
        return [];
    }
}

function Bids() {
    const [data, setData] = useState<BidTypeArray>([]);
    const [loading, setLoading] = useState(true);
    const bidCount = bidStore((state) => state.bidCount);
    const aggregatedBidsInit = aggregatedBidsStore((state) => state.aggregatedBidsInit)

    useEffect(() => {
        fetchOpportunities()
            .then((opportunities) => {
                setData(opportunities);
                setLoading(false);
                aggregatedBidsInit()
            })
            .catch((error) => {
                console.error("Error fetching opportunities:", error);
                setLoading(false);
            });
    }, [bidCount, aggregatedBidsInit]);

    useEffect(() => {
        // rerender the component.
    }, [data])


    if (loading) {
        return (
            <div className="flex flex-col space-y-3">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        )
    }

    if (data.length === 0) {
        return <div className="w-full h-[50vh] flex justify-center items-center ">
            <p className="text-sm text-muted-foreground">
                No results
            </p>
        </div>;
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            {/* Add url to the actual opportunity */}
            {data.map((entry, index) => (
                <DataCard key={index} entry={entry} />
            ))}
        </div>
    );
}

export default Bids;
