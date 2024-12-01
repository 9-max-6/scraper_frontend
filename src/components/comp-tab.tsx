"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Sample categories with levels and descriptions for Commercials
const categories = [
    {
        name: "Number of Bidders",
        levels: [
            { label: "Very high number of competitive bidders (> 8 bids)", description: "Highest level of competition with more than 8 bids." },
            { label: "High number of competitive bidders (6-8 short-listed bidders)", description: "Competitive but not as intense, 6 to 8 bidders." },
            { label: "Medium number of competitive bidders (4-5 short-listed bidders)", description: "Moderate competition with 4-5 bidders." },
            { label: "Low number of competitive bidders (2-3 short-listed bidders)", description: "Low competition, only 2-3 bidders." },
            { label: "Sole sourced (DT Global is the only bidder)", description: "No competition, DT Global is the only bidder." },
        ],
        weight: 5,
    },
    {
        name: "Competitor Profile",
        levels: [
            { label: "Strong technical and financial competition, high price dumping risk", description: "Competitor has strong competition and high risk of price dumping." },
            { label: "Strong competition, but low price dumping risk", description: "Strong competition with low likelihood of price dumping." },
            { label: "Low competition or low price dumping risk", description: "Low competition or low likelihood of price dumping." },
        ],
        weight: 7,
    },
    {
        name: "Partner Capacity",
        levels: [
            { label: "Partner(s) not yet secured", description: "Partner(s) are not secured but are necessary to meet the requirements." },
            { label: "Lack of clarity about required partner(s)", description: "Unclear if partner(s) are needed." },
            { label: "Partner(s) secured, meets expectations", description: "Partners are secured with the required qualifications." },
            { label: "Partner(s) secured with exceptional qualifications", description: "Partners have exceptional qualifications and experience." },
            { label: "DT Global does not require partners", description: "DT Global has no need for partners or has first-choice partners secured." },
        ],
        weight: 4,
    },
    {
        name: "Preference",
        levels: [
            { label: "Client prefers competitor", description: "Client favors a competitor or has a negative view of DT Global." },
            { label: "Unknown client preference", description: "Unclear if the client has a preference." },
            { label: "Client has no supplier preference", description: "Client has no preference or bias towards any supplier." },
            { label: "Client favors DT Global", description: "Client favors DT Global over others." },
        ],
        weight: 5,
    },
    {
        name: "Intelligence",
        levels: [
            { label: "DT Global lacks intelligence, competitor has clear advantage", description: "DT Global has no intelligence and is late in the bid process." },
            { label: "DT Global lacks intelligence, both are late", description: "Both competitors and DT Global are behind in the bid process." },
            { label: "DT Global lacks intelligence but has time", description: "DT Global has time to gather intelligence and position itself." },
            { label: "DT Global has some intelligence and is early", description: "DT Global has some intelligence and is early in the bid process." },
            { label: "DT Global has strong intelligence and is early", description: "DT Global has strong intelligence and is early in the bid process." },
        ],
        weight: 3,
    },
    {
        name: "Procurement",
        levels: [
            { label: "Low transparency and fairness", description: "Procurement process is not transparent or fair." },
            { label: "Lack of understanding about procurement process", description: "Not much clarity on how procurement will be executed." },
            { label: "Medium transparency and fairness", description: "Procurement process is somewhat transparent and fair." },
            { label: "High transparency and fairness", description: "Procurement process is transparent and fair." },
        ],
        weight: 4,
    },
    {
        name: "Availability of Resources",
        levels: [
            { label: "Lack in-house technical resources", description: "No in-house resources with relevant experience for this bid." },
            { label: "In-house resources available, but not enough", description: "In-house resources are available but not enough." },
            { label: "In-house resources available and complemented with strong external resources", description: "Strong in-house resources and access to strong external resources." },
        ],
        weight: 8,
    },
];

export default function Competitiveness() {
    const [selectedValues, setSelectedValues] = useState({
        number: null,
        competitor: null,
        partner: null,
        preference: null,
        intelligence: null,
        procurement: null,
        availability: null,
    });

    // Load stored data from localStorage when the component mounts
    useEffect(() => {
        const savedData = localStorage.getItem("Competitiveness");
        if (savedData) {
            setSelectedValues(JSON.parse(savedData));
        }
    }, []);

    const handleSelect = (category: string, level: string) => {
        const updatedValues = { ...selectedValues, [category]: level };
        setSelectedValues(updatedValues);
        localStorage.setItem("Competitiveness", JSON.stringify(updatedValues)); // Save to localStorage
    };

    return (
        <div>
            {categories.map((category) => (
                <div key={category.name} className="mb-8">
                    {/* Category Title */}
                    <h3 className="text-xl font-bold mb-4">{category.name}</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.levels.map((level, index) => {
                            const categoryKey = category.name.split(" ")[0].toLowerCase(); // e.g., 'bidders', 'competitorProfile', 'partnerCapacity', etc.
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
