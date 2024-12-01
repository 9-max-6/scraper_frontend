"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Sample categories with levels and descriptions
const categories = [
    {
        name: "Competence (Lead Sector)",
        levels: [
            { label: "Limited track record", description: "Track record with limited availability of experienced resources." },
            { label: "Somewhat relevant references", description: "Somewhat relevant references and limited availability." },
            { label: "Relevant references available", description: "Relevant references and some availability." },
            { label: "Strong references with unconfirmed availability", description: "Strong references and unconfirmed availability." },
            { label: "Very strong references with confirmed availability", description: "Very strong references and confirmed availability." },
        ],
        weight: 9,
    },
    {
        name: "Country / Regional Experience",
        levels: [
            { label: "No track record", description: "No country/regional track record in the past 5 years." },
            { label: "Limited track record", description: "Limited track record with 2-3 references." },
            { label: "Medium track record", description: "Medium track record with 2-3 references." },
            { label: "High track record", description: "High track record with existing registration and >5 references." },
            { label: "Very high track record", description: "Very high track record with existing office and >5 references." },
        ],
        weight: 8,
    },
    {
        name: "Clients",
        levels: [
            { label: "Risky", description: "Unreliable, negative experience with the client." },
            { label: "Unknown", description: "Possibly reliable, but unknown to the company." },
            { label: "Frontier", description: "Reliable, known to a limited extent." },
            { label: "Emerging", description: "Reliable, known to an extent, hot pursuit." },
            { label: "Developed", description: "Reliable, well known to us, hot pursuit." },
        ],
        weight: 8,
    },
];

export default function Capabilities() {
    const [selectedValues, setSelectedValues] = useState({
        competence: null,
        country: null,
        clients: null,
    });

    // Load stored data from localStorage when the component mounts
    useEffect(() => {
        const savedData = localStorage.getItem("Capabilities");
        if (savedData) {
            setSelectedValues(JSON.parse(savedData));
        }
    }, []);

    const handleSelect = (category: string, level: string) => {
        const updatedValues = { ...selectedValues, [category]: level };
        setSelectedValues(updatedValues);
        localStorage.setItem("Capabilities", JSON.stringify(updatedValues)); // Save to localStorage
    };

    return (
        <div>
            {categories.map((category) => (
                <div key={category.name} className="mb-8">
                    {/* Category Title */}
                    <h3 className="text-xl font-bold mb-4">{category.name}</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.levels.map((level, index) => {
                            const categoryKey = category.name.split(" ")[0].toLowerCase(); // e.g., 'competence', 'country', 'clients'
                            const isSelected = selectedValues[categoryKey] === level.label;
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleSelect(categoryKey, level.label)}
                                    className={`cursor-pointer p-6 rounded-lg ${isSelected ? 'bg-green-400 text-white' : 'bg-gray-100 text-black'}`}
                                >
                                    <div className="font-semibold">{level.label}</div>
                                    <div className="text-sm text-gray-500">{level.description}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
