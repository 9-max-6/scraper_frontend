'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { bidStore } from '@/store/bid-store'; // Assuming this is your Zustand store

// Sample categories with levels and descriptions for Risk and other metrics
const categories = [
    {
        name: 'Scope of Work',
        levels: [
            { label: 'Unclear scope', description: 'Project scope is unclear and expectations on deliverables are unclear.' },
            { label: 'Clear scope but unrealistic expectations', description: 'Project scope is clear but expectations on deliverables are not realistic.' },
            { label: 'Clear scope with realistic expectations', description: 'Project scope is clear and expectations on deliverables are realistic.' },
        ],
        weight: 8,
    },
    {
        name: 'Ease of Doing Business',
        levels: [
            { label: 'Difficult to work with', description: 'We don\'t know if the client is difficult to work with or the client is extremely difficult to work with.' },
            { label: 'Difficult, but manageable', description: 'Whilst the client is difficult to work with, we can still work with them.' },
            { label: 'Easy to work with but challenges', description: 'Client is easy to work with based on previous experience, but has challenges with report approval and/or payment processes.' },
            { label: 'Easy to work with', description: 'Client is easy to work with based on previous experience, and has reasonable report approval and/or payment processes.' },
        ],
        weight: 5,
    },
    {
        name: 'Security',
        levels: [
            { label: 'Critical risk', description: 'Country classified as Risk Level - "Critical".' },
            { label: 'High risk', description: 'Country classified as Risk Level - "High".' },
            { label: 'Moderate risk', description: 'Country classified as Risk Level - "Moderate".' },
            { label: 'Low risk', description: 'Country classified as Risk Level - "Low".' },
        ],
        weight: 5,
    },
    {
        name: 'Reputational Risk',
        levels: [
            { label: 'High risk', description: 'Project\'s reputational risks are considered high.' },
            { label: 'Medium risk', description: 'Project\'s reputational risks are considered medium.' },
            { label: 'Low risk', description: 'Project\'s reputational risks are considered low.' },
        ],
        weight: 4,
    },
];

export default function Risk() {
    const [selectedValues, setSelectedValues] = useState({
        scope: null,
        ease: null,
        security: null,
        reputational: null,
    });

    // Load stored data from localStorage when the component mounts
    useEffect(() => {
        const savedRiskData = localStorage.getItem('Risk');

        // If saved data exists, load it into the state
        if (savedRiskData) {
            setSelectedValues(JSON.parse(savedRiskData));
        }
    }, []);

    const handleSelect = (category: string, level: string) => {
        const updatedValues = { ...selectedValues, [category]: level };

        // Update the Risk data in localStorage
        localStorage.setItem('Risk', JSON.stringify(updatedValues));

        // Update the state with the newly selected value
        setSelectedValues(updatedValues);
    };

    const handleSubmit = () => {
        // Reconstruct the final bid object using the stored data in localStorage
        const formData = JSON.parse(localStorage.getItem('formData') || '{}');
        const riskData = JSON.parse(localStorage.getItem('Risk') || '{}');
        const commData = JSON.parse(localStorage.getItem('Commercials') || '{}');
        const competitivenessData = JSON.parse(localStorage.getItem('Competitiveness') || '{}');
        const capabilitiesData = JSON.parse(localStorage.getItem('Capabilities') || '{}');

        const bidObject = {
            bidData: {
                title: formData.title,
                phase: formData.phase,
                date: formData.date,
                author: formData.author,
                client: formData.client,
                country: formData.country,
                biddingEntity: formData.biddingEntity,
                technicalUnit: formData.technicalUnit,
                consortiumRole: formData.consortiumRole,
                deadline: formData.deadline,
            },
            metrics: {
                capabilities: capabilitiesData, // Add capabilities data here
                competitiveness: competitivenessData, // Add competitiveness data here
                commercials: commData, // Add commercials data here
                risk: riskData, // Add risk data here
            },
        };

        // Add the reconstructed bid object to the bid store
        bidStore.getState().setBid(bidObject);

        // Log the bid object or handle the submission (e.g., close the modal)
        console.log('Bid submitted:', bidObject); // Debugging, or you can close the modal here
    };

    return (
        <div>
            {categories.map((category) => (
                <div key={category.name} className="mb-8">
                    {/* Category Title */}
                    <h3 className="text-xl font-bold mb-4">{category.name}</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.levels.map((level, index) => {
                            const categoryKey = category.name.split(' ')[0].toLowerCase(); // e.g., 'scope', 'ease', 'security', etc.
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

            {/* Submit Button */}
            <div className="mt-4">
                <Button onClick={handleSubmit}>Submit Changes</Button>
            </div>
        </div>
    );
}
