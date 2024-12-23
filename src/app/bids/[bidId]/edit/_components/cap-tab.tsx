"use client";

import { useState } from "react";
import { BidProfileText } from "@/types/bid-profile-text";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { SelectCapabilities } from "@/db/schema/capabilities";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
// Sample categories with levels and descriptions

const categories = BidProfileText.Capabilities

export default function EditCapabilitiess({ props }: { props: Array<SelectCapabilities> }) {
    const [selectedValues, setSelectedValues] = useState({
        competence: Number(props[0].competence),
        country: Number(props[0].countryExperience),
        clients: Number(props[0].clients),
    });

    const [initialCap, setinitialCap] = useState({
        competence: props[0].competence,
        country: props[0].countryExperience,
        clients: props[0].clients,
    })
    const [pending, setpending] = useState(false);
    const [cancelling, setcancelling] = useState(false);

    const handleSelect = (category: string, value: number) => {
        const updatedValues = { ...selectedValues, [category]: value };
        setSelectedValues(updatedValues);
    };

    const router = useRouter();

    return (
        <div>

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
            <div className="w-full flex mb-12">
                <div className="ml-auto flex gap-2">
                    <Button variant="secondary" disabled={cancelling} onClick={() => {
                        setcancelling(true);
                        router.back();
                    }}>
                        {cancelling ? (
                            <>
                                <Loader2 className="text-blue-500 animate-spin ml-auto" size={48} />
                                {" "} Cancelling
                            </>
                        ) : (
                            <>
                                Cancel
                            </>
                        )}
                    </Button>
                    <Button disabled={pending} type="submit">
                        {pending ? (
                            <>
                                <Loader2 className="text-blue-500 animate-spin ml-auto" size={48} />
                                {" "} Saving
                            </>
                        ) : (
                            <>
                                Save
                            </>
                        )}
                    </Button>
                </div>


            </div>

        </div>
    );
}
