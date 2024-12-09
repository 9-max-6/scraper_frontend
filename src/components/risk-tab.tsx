'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { BidProfileText } from '@/types/bid-profile-text';
import { DataTabProps } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// Sample categories with levels and descriptions for Risk and other metrics
const categories = BidProfileText.Risk

export default function Risk({ props }: { props: DataTabProps }) {
    const [selectedValues, setSelectedValues] = useState({
        scope: props.entry?.metrics.risk.scope,
        ease: props.entry?.metrics.risk.ease,
        security: props.entry?.metrics.risk.security,
        reputational: props.entry?.metrics.risk.reputational,
    });
    const [score, setScore] = useState<number | null>(null);

    const calculateScore = useCallback(() => {
        const totalScore = categories.reduce((sum, category) => {
            const selectedLevel = category.levels.find((level) => level.value === selectedValues[category.tag]);
            return sum + (selectedLevel ? selectedLevel.value * category.weight : 0);
        }, 0);
        setScore(totalScore);
    }, [selectedValues]);

    useEffect(() => {
        calculateScore();
    }, [selectedValues, calculateScore]);


    const handleSelect = (category: string, value: number) => {
        const updatedValues = { ...selectedValues, [category]: value };
        setSelectedValues(updatedValues);
        localStorage.setItem("Risk", JSON.stringify(updatedValues));
    };


    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button variant="secondary">Score: {score}</Button>
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
