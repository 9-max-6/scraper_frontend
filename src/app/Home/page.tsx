'use client';

import { useState } from "react";
import NewBid from "@/components/new-bid";
import { Button } from "@/components/ui/button";
import { bidStore } from "@/store/bid-store"; // Assuming this is your Zustand store
import axios from "axios";
import { BidType } from "@/types/types";

export default function Home() {
    const [loading, setLoading] = useState(false); // To track loading state for spinner
    const [error, setError] = useState(null); // To track errors during report generation

    // Function to get the latest bid data from Zustand store (no localStorage needed)
    const getBidDataFromStore = () => {
        const bidData = bidStore.getState().getBids(); // Get the bids from Zustand store
        if (bidData.length > 0) {
            return bidData[bidData.length - 1]; // Get the most recent bid
        }
        return null; // Return null if no bid is available
    };

    // Function to generate the report using the bid data from Zustand store
    const generateReport = async () => {
        const bid: BidType | null = getBidDataFromStore();
        if (!bid) {
            setError("No bid data available to generate report");
            return;
        }

        setLoading(true); // Show loading state while generating the report
        setError(null); // Reset any previous errors

        try {
            const response = await axios.post('/api/report', { bid: bid }, { responseType: 'blob' });

            // Create a link element to trigger the download in the browser
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'bid-report.pdf'; // You can customize the filename here
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Optional: Open the Blob URL in a new tab
            window.open(url, '_blank');

        } catch (error) {
            setError("Error generating report");
            console.error(error);
        } finally {
            setLoading(false); // Hide loading spinner after the process is complete
        }
    };

    const data = []; // Sample array for data (Replace with your data fetching logic)

    return (
        <div className="bg-muted h-[100vh]">
            {
                data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div>No opportunities</div>
                        <NewBid /> {/* Component for creating a new bid */}
                        <Button onClick={generateReport} disabled={loading}>
                            {loading ? 'Generating Report...' : 'Generate Report'}
                        </Button>
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                    </div>
                ) : (
                    <div>
                        {data.map((value, index) => (
                            <div key={index}>
                                {value} {/* You can display the opportunity data here */}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}
