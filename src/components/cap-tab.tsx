"use client";

import { useState, useEffect, useCallback } from "react";
import { BidProfileText } from "@/types/bid-profile-text";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DataTabProps } from "@/types/types";
// Sample categories with levels and descriptions

const categories = BidProfileText.Capabilities

export default function Capabilitiess({ props }: { props: DataTabProps }) {
    const [selectedValues, setSelectedValues] = useState({
        competence: props.entry?.metrics.capabilities.competence,
        country: props.entry?.metrics.capabilities.country,
        clients: props.entry?.metrics.capabilities.clients,
    });


    // Dynamically calculated score of the Capabilities tab
    const [capScore, setcapScore] = useState<number | null>(null)
    const updateScore = useCallback(() => {
        const competenceScore = (selectedValues.competence || 0) * categories[0].weight
        const countryScore = (selectedValues.country || 0) * categories[1].weight
        const clientScore = (selectedValues.clients || 0) * categories[2].weight
        const overallScore = competenceScore + countryScore + clientScore
        setcapScore(overallScore)
    }, [selectedValues]);

    useEffect(() => {
        updateScore()
    }, [selectedValues, updateScore])


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
                <Card key={category.name} className="mb-8 shadow-none overflow-scroll">
                    {/* Category Title */}
                    <CardHeader>
                        <CardTitle>
                            {category.name}
                        </CardTitle>
                    </CardHeader>


                    <CardContent className="grid overflow-scroll grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.levels.map((level, index) => {
                            const categoryKey = category.tag;
                            const isSelected = selectedValues[categoryKey as keyof typeof selectedValues] === level.value;
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleSelect(categoryKey, level.value)}
                                    className={`cursor-pointer p-6  rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-muted'}`}
                                >
                                    {level.label}
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
