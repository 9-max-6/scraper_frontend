'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { bidStore } from '@/store/bid-store'; // Assuming this is your Zustand store
import { BidProfileText } from '@/types/bid-profile-text';
import { DataTabProps } from '@/types/types';
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

    const calculateScore = () => {
        const totalScore = categories.reduce((sum, category) => {
            const selectedLevel = category.levels.find((level) => level.value === selectedValues[category.tag]);
            return sum + (selectedLevel ? selectedLevel.value * category.weight : 0);
        }, 0);
        setScore(totalScore);
    };

    useEffect(() => {
        calculateScore();
    }, [selectedValues]);

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
                <div key={category.name} className="mb-8 overflow-scroll">
                    {/* Category Title */}
                    <h3 className="text-xl font-bold mb-4">{category.name} </h3>

                    <div className="grid overflow-scroll grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.levels.map((level, index) => {
                            const categoryKey = category.tag;
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
