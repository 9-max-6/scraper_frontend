"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { BidProfileText } from "@/types/bid-profile-text";
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import _ from "lodash"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { SelectRisk } from "@/db/schema/risk";
import patchRisk from "../risk/[riskId]/actions";

const categories = BidProfileText.Risk

export default function EditRisk({ props, bid }: { props: Array<SelectRisk>, bid: number }) {

    const { toast } = useToast();
    const router = useRouter();


    const [selectedValues, setSelectedValues] = useState({
        scopeOfWork: Number(props[0].scopeOfWork),
        easeOfDoingBusiness: Number(props[0].easeOfDoingBusiness),
        security: Number(props[0].security),
        reputationalRisk: Number(props[0].reputationalRisk),
    });

    const [initialRisk, setinitialRisk] = useState({
        scopeOfWork: Number(props[0].scopeOfWork),
        easeOfDoingBusiness: Number(props[0].easeOfDoingBusiness),
        security: Number(props[0].security),
        reputationalRisk: Number(props[0].reputationalRisk),
    })
    const [pending, setpending] = useState(false);
    const [cancelling, setcancelling] = useState(false);
    const [response, setresponse] = useState(null)


    // Dynamically calculated score of the Competitiveness tab
    const [riskScore, setRiskScore] = useState<number | null>(null);

    const updateScore = useCallback(() => {
        const scores = Object.keys(selectedValues).map((key, index) => {
            const category = categories[index];
            const level = category.levels.find((lvl) => lvl.value === selectedValues[key as keyof typeof selectedValues]);
            return level ? level.value * category.weight : 0;
        });
        const overallScore = scores.reduce((acc, score) => acc + score, 0);
        setRiskScore(overallScore);
    }, [selectedValues]);


    const handleSelect = (category: string, value: number) => {
        const updatedValues = { ...selectedValues, [category]: value };
        setSelectedValues(updatedValues);
    };

    // destructure props for more targeted dependencies
    const id = props[0].id;
    const handleSubmit = useCallback(() => {
        // checking if there weere any changes made.
        if (!_.isEqual(selectedValues, initialRisk)) {
            /**
             * there was a change made,
             * have to toast to show a change is made to the 
             * backend and then let the user that if they want to
             * undo the action they can also do that
             */
            setpending(true);

            patchRisk(id, selectedValues, bid, riskScore).then(() => {
                setresponse(true);

            }).catch((error: any) => {
                toast({
                    title: "Error",
                    description: `${error}`,
                    variant: "destructive",
                    action: <ToastAction onClick={() => {
                        router.forward();
                    }} altText="Cancel">
                        Keep editing
                    </ToastAction>
                })
            })

        } else {
            /**
            * there was no change made, have to redirect the user to the page back.
            */
            toast({
                title: "No change",
                description: "Redirecting to the bid page.",
                action: <ToastAction onClick={() => {
                    router.forward();
                }} altText="Cancel">
                    Keep editing
                </ToastAction>
            })
            router.back()
        }
    }, [selectedValues, riskScore, id, bid, initialRisk, toast, router]);


    // effect for submissions
    useEffect(() => {
        if (response) {
            toast({
                title: "Success",
                description: "Changed uploaded successfully",
                action: <ToastAction altText="Undo">
                    Undo
                    {/* For now this does nothing */}
                </ToastAction>
            })

            // refetching bid page.
            router.refresh();
            router.back()
        }
    }, [response, handleSubmit, router, toast])

    // effect for score
    // Update score whenever selectedValues changes
    useEffect(() => {
        updateScore();
    }, [selectedValues, updateScore]);

    return (
        <div className="dash_container overflow-scroll scrollbar-hide">
            <div className="flex mb-2">
                <Badge className="ml-auto">
                    {riskScore}
                </Badge>
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
                    <Button disabled={pending}
                        onClick={() => {
                            handleSubmit()
                        }}>
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