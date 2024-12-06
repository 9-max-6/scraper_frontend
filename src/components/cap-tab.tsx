"use client";

import { useState, useEffect } from "react";
import { BidProfileText } from "@/types/bid-profile-text";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

// Sample categories with levels and descriptions

const categories = BidProfileText.Capabilities

export default function Capabilities() {
    const [selectedValues, setSelectedValues] = useState({
        competence: 0,
        country: 0,
        clients: 0,
    });


    // Dynamically calculated score of the Capabilities tab
    const [capScore, setcapScore] = useState<number | null>(null)
    const updateScore = () => {
        const competenceScore = selectedValues.competence * categories[0].weight
        const countryScore = selectedValues.country * categories[1].weight
        const clientScore = selectedValues.clients * categories[2].weight
        const overallScore = competenceScore + countryScore + clientScore
        setcapScore(overallScore)
    }

    // Load stored data from localStorage when the component mounts
    useEffect(() => {
        const savedData = localStorage.getItem("Capabilities");
        if (savedData) {
            setSelectedValues(JSON.parse(savedData));
        }
    }, []);

    // have to call updatescore when selectedvalues change
    // setState is async
    useEffect(() => {
        updateScore()
    }, [selectedValues])

    const handleSelect = (category: string, value: number) => {
        const updatedValues = { ...selectedValues, [category]: value };
        setSelectedValues(updatedValues);
        localStorage.setItem("Capabilities", JSON.stringify(updatedValues));
    };

    return (
        <div className="overflow-scroll">
            <div className="flex">
                <Button variant="secondary" className="ml-auto">
                    Score: {capScore}
                </Button>
            </div>
            {categories.map((category) => (
                <div key={category.name} className="mb-8 overflow-scroll">
                    {/* Category Title */}
                    <h3 className="text-xl font-bold mb-4">{category.name} </h3>

                    <div className="grid overflow-scroll grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.levels.map((level, index) => {
                            const categoryKey = category.tag; // e.g., 'competence', 'country', 'clients'
                            const isSelected = selectedValues[categoryKey] === level.value;
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleSelect(categoryKey, level.value)}
                                    className={`cursor-pointer p-6 rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}
                                >
                                    {level.label}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
