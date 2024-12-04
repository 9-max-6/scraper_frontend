"use client";

import { useState, useEffect } from "react";

// Sample categories with levels and descriptions for Commercials
const categories = [
    {
        name: "Contract Value ($)",
        levels: [
            { label: "Unknown", description: "Unknown contract value." },
            { label: "< $0.5M", description: "Contract value is less than $0.5 million." },
            { label: "$0.5 - $1.5M", description: "Contract value is between $0.5 and $1.5 million." },
            { label: "$1.5M - $5M", description: "Contract value is between $1.5 million and $5 million." },
            { label: "$5 - 10M", description: "Contract value is between $5 million and $10 million." },
            { label: ">$10M", description: "Contract value is greater than $10 million." },
        ],
        weight: 6,
    },
    {
        name: "Expert LoE",
        levels: [
            { label: "Unknown", description: "Unknown Level of Effort (LoE)." },
            { label: "<350 days", description: "Expert LoE is less than 350 days." },
            { label: "350 - 1,000 days", description: "Expert LoE is between 350 and 1,000 days." },
            { label: "1,000 - 2,500 days", description: "Expert LoE is between 1,000 and 2,500 days." },
            { label: "2,500 - 5,500 days", description: "Expert LoE is between 2,500 and 5,500 days." },
            { label: ">5,500 days", description: "Expert LoE is greater than 5,500 days." },
        ],
        weight: 8,
    },
    {
        name: "Project Duration",
        levels: [
            { label: "Unknown", description: "Unknown project duration." },
            { label: "<6 months", description: "Project duration is less than 6 months." },
            { label: "6 - 12 months", description: "Project duration is between 6 and 12 months." },
            { label: "12 - 24 months", description: "Project duration is between 12 and 24 months." },
            { label: "24 - 48 months", description: "Project duration is between 24 and 48 months." },
            { label: ">48 months", description: "Project duration is greater than 48 months." },
        ],
        weight: 5,
    },
    {
        name: "BD Input ($)",
        levels: [
            { label: "Unknown", description: "Unknown business development input." },
            { label: "<35 days", description: "BD input is less than 35 days." },
            { label: "35 - 55 days", description: "BD input is between 35 and 55 days." },
            { label: "55 - 100 days", description: "BD input is between 55 and 100 days." },
            { label: "100 - 150 days", description: "BD input is between 100 and 150 days." },
            { label: ">150 days", description: "BD input is greater than 150 days." },
        ],
        weight: 4,
    },
    {
        name: "Historical Net Margin (%)",
        levels: [
            { label: "Unknown", description: "Unknown historical net margin." },
            { label: "<15%", description: "Historical net margin is less than 15%." },
            { label: "15-20%", description: "Historical net margin is between 15% and 20%." },
            { label: "21-25%", description: "Historical net margin is between 21% and 25%." },
            { label: "25-30%", description: "Historical net margin is between 25% and 30%." },
            { label: ">30%", description: "Historical net margin is greater than 30%." },
        ],
        weight: 5,
    },
    {
        name: "Future Revenue",
        levels: [
            { label: "No idea OR 0% chance of extension", description: "No forecast for future revenue." },
            { label: "Rumor of possible cost extension", description: "Rumor of a possible extension or follow-up phase." },
            { label: "100% chance of extension", description: "100% chance of cost extension or follow-up phase." },
        ],
        weight: 6,
    },
];

export default function Commercials() {
    const [selectedValues, setSelectedValues] = useState({
        contract: null,
        expert: null,
        project: null,
        bd: null,
        historical: null,
        future: null,
    });

    // Load stored data from localStorage when the component mounts
    useEffect(() => {
        const savedData = localStorage.getItem("Commercials");
        if (savedData) {
            setSelectedValues(JSON.parse(savedData));
        }
    }, []);

    const handleSelect = (category: string, level: string) => {
        const updatedValues = { ...selectedValues, [category]: level };
        setSelectedValues(updatedValues);
        localStorage.setItem("Commercials", JSON.stringify(updatedValues)); // Save to localStorage
    };

    return (
        <div>
            {categories.map((category) => (
                <div key={category.name} className="mb-8">
                    {/* Category Title */}
                    <h3 className="text-xl font-bold mb-4">{category.name}</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.levels.map((level, index) => {
                            const categoryKey = category.name.split(" ")[0].toLowerCase(); // e.g., 'contractValue', 'expertLoE', etc.
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
