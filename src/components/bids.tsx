'use client'
import React, { useState, useEffect } from "react";
import { bidStore } from "@/store/bid-store";
import DataCard from "./data-card";
import { BidTypeArray } from "@/types/types";

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

    useEffect(() => {
        fetchOpportunities()
            .then((opportunities) => {
                setData(opportunities);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching opportunities:", error);
                setLoading(false);
            });
    }, [bidCount]);

    if (loading) {
        return <div>Loading opportunities...</div>;
    }

    if (data.length === 0) {
        return <div>No opportunities found.</div>;
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
