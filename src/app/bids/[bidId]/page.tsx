'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataCard from '@/components/data-card';

async function fetchBid(bidId) {
    const response = await fetch(`/api/bid/${bidId}`);
    const data = await response.json();

    if (response.ok) {
        return data.data;
    } else {
        console.error('Failed to fetch bid:', data.error);
        return null;
    }
}

export default function BidDetailPage({ params }) {
    const { bidId } = params; // Access dynamic route parameter
    const [bid, setBid] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (bidId) {
            fetchBid(bidId)
                .then((bidData) => {
                    setBid(bidData);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching bid:', error);
                    setLoading(false);
                });
        }
    }, [bidId]);

    if (loading) {
        return <div>Loading bid details...</div>;
    }

    if (!bid) {
        return <div>No bid found.</div>;
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <DataCard entry={bid} />
        </div>
    );
}
