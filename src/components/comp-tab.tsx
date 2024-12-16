"use client";

import { useState, useEffect, useCallback } from "react";
import { BidProfileText } from "@/types/bid-profile-text";
import { DataTabProps } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from "./ui/button";

// Sample categories with levels and descriptions
const categories = BidProfileText.Competitiveness;

export default function Competitiveness({ props }: { props: DataTabProps }) {
    const [selectedValues, setSelectedValues] = useState({
        number: props.entry?.metrics?.competitiveness?.number,
        competitor: props.entry?.metrics?.competitiveness?.competitor,
        partner: props.entry?.metrics?.competitiveness?.partner,
        preference: props.entry?.metrics?.competitiveness?.preference,
        intelligence: props.entry?.metrics?.competitiveness?.intelligence,
        procurement: props.entry?.metrics?.competitiveness?.procurement,
        availability: props.entry?.metrics?.competitiveness?.availability,
    });

    // Dynamically calculated score of the Competitiveness tab
    const [compScore, setCompScore] = useState<number | null>(null);

    const updateScore = useCallback(() => {
        const scores = Object.keys(selectedValues).map((key, index) => {
            const category = categories[index];
            const level = category.levels.find((lvl) => lvl.value === selectedValues[key as keyof typeof selectedValues]);
            return level ? level.value * category.weight : 0;
        });
        const overallScore = scores.reduce((acc, score) => acc + score, 0);
        setCompScore(overallScore);
    }, [selectedValues]);

    // Update score whenever selectedValues changes
    useEffect(() => {
        updateScore();
    }, [selectedValues, updateScore],);

    const handleSelect = (category: string, value: number) => {
        const updatedValues = { ...selectedValues, [category]: value };
        setSelectedValues(updatedValues);
        localStorage.setItem("Competitiveness", JSON.stringify(updatedValues));
    };

    return (
        <div className="overflow-scroll">
            <div className="flex">
                <Button variant="secondary" className="ml-auto">
                    Score: {compScore}
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
