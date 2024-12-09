"use client";

import { BidProfileText } from "@/types/bid-profile-text";
import { DataTabProps } from "@/types/types";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from "./ui/button";

// Sample categories with levels and descriptions for Commercials
const categories = BidProfileText.Commercials
export default function Commercials({ props }: { props: DataTabProps }) {
    const [selectedValues, setSelectedValues] = useState({
        contract: props.entry?.metrics?.commercials?.contract,
        expert: props.entry?.metrics?.commercials?.expert,
        project: props.entry?.metrics?.commercials?.project,
        bd: props.entry?.metrics?.commercials?.bd,
        historicals: props.entry?.metrics?.commercials?.historicals,
        future: props.entry?.metrics?.commercials?.future,
    });

    const [score, setScore] = useState<number | null>(null);

    const calculateScore = useCallback(() => {
        const newScore = categories.reduce((total, category) => {
            const selectedLevel = category.levels.find(level => level.value === selectedValues[category.tag]);
            return total + (selectedLevel ? selectedLevel.value * category.weight : 0);
        }, 0);
        setScore(newScore);
    }, [selectedValues]);

    useEffect(() => {
        calculateScore();
    }, [selectedValues, calculateScore]);


    const handleSelect = (category: string, value: number) => {
        const updatedValues = { ...selectedValues, [category]: value };
        setSelectedValues(updatedValues);
        localStorage.setItem("Commercials", JSON.stringify(updatedValues));
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button variant="secondary" className="ml-auto">
                    Score: {score}
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
                            const isSelected = selectedValues[categoryKey] === level.value;
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
