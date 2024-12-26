"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Button } from "../../../../../components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "../../../../../components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BidProfileText } from "@/types/bid-profile-text";
import _ from 'lodash';
import { SelectBdInput, SelectCommercials } from "@/db/schema/commercials";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { patchComms } from "../comm/[commId]/actions";


const categoriesBuff = BidProfileText.Commercials
const categories = categoriesBuff.filter((category, index) => !(index === 0 || index === 2 || index === 3))

export default function EditCommercials(
    { comm, bdInput, budget, duration, bidId }: {
        comm: SelectCommercials,
        bdInput: SelectBdInput,
        budget: number,
        duration: number,
        bidId: number,
    }
) {
    // submit states
    const [pending, setpending] = useState(false);
    const [cancelling, setcancelling] = useState(false);
    const [response, setresponse] = useState(null);


    const [commData, setCommData] = useState({
        budget: budget,
        duration: duration,
        bidDirectorCapture: bdInput.bidDirectorCapture,
        bidDirectorEoi: bdInput.bidDirectorEoi,
        bidDirectorTender: bdInput.bidDirectorTender,
        bidManagerCapture: bdInput.bidManagerCapture,
        bidManagerEoi: bdInput.bidManagerEoi,
        bidManagerTender: bdInput.bidManagerTender,
        technicalLeadCapture: bdInput.technicalLeadCapture,
        technicalLeadEoi: bdInput.technicalLeadEoi,
        technicalLeadTender: bdInput.technicalLeadTender,
        recLeadCapture: bdInput.recLeadCapture,
        recLeadEoi: bdInput.recLeadEoi,
        recLeadTender: bdInput.recLeadTender,
        proposalWriteCapture: bdInput.proposalWriteCapture,
        proposalWriteEoi: bdInput.proposalWriteEoi,
        proposalWriteTender: bdInput.proposalWriteTender,
        analystCapture: bdInput.analystCapture,
        analystEoi: bdInput.analystEoi,
        analystTender: bdInput.analystTender,
        reviewerCapture: bdInput.reviewerCapture,
        reviewerEoi: bdInput.reviewerEoi,
        reviewerTender: bdInput.reviewerTender,
        copyWriterCapture: bdInput.copyWriterCapture,
        copyWriterEoi: bdInput.copyWriterEoi,
        copyWriterTender: bdInput.copyWriterTender,
        recruiterAdminCapture: bdInput.recruiterAdminCapture,
        recruiterAdminEoi: bdInput.recruiterAdminEoi,
        recruiterAdminTender: bdInput.recruiterAdminTender,
        commLeadCapture: bdInput.commLeadCapture,
        commLeadEoi: bdInput.commLeadEoi,
        commLeadTender: bdInput.commLeadTender,
        pmCapture: bdInput.pmCapture,
        pmEoi: bdInput.pmEoi,
        pmTender: bdInput.pmTender,
        graphicDesCapture: bdInput.graphicDesCapture,
        graphicDesEoi: bdInput.graphicDesEoi,
        graphicDesTender: bdInput.graphicDesTender,
        translatorCapture: bdInput.translatorCapture,
        translatorEoi: bdInput.translatorEoi,
        translatorTender: bdInput.translatorTender,
    })

    const [selectedValues, setSelectedValues] = useState({
        expertLoe: Number(comm.expertLoe),
        historicalNetMargin: Number(comm.historicalNetMargin),
        futureRevenue: Number(comm.futureRevenue),
    })

    const handleSelect = (category: string, value: number) => {
        const updatedValues = { ...selectedValues, [category]: value };
        setSelectedValues(updatedValues);
    };

    const initialCommData = {
        budget: budget,
        duration: duration,
        bidDirectorCapture: bdInput.bidDirectorCapture,
        bidDirectorEoi: bdInput.bidDirectorEoi,
        bidDirectorTender: bdInput.bidDirectorTender,
        bidManagerCapture: bdInput.bidManagerCapture,
        bidManagerEoi: bdInput.bidManagerEoi,
        bidManagerTender: bdInput.bidManagerTender,
        technicalLeadCapture: bdInput.technicalLeadCapture,
        technicalLeadEoi: bdInput.technicalLeadEoi,
        technicalLeadTender: bdInput.technicalLeadTender,
        recLeadCapture: bdInput.recLeadCapture,
        recLeadEoi: bdInput.recLeadEoi,
        recLeadTender: bdInput.recLeadTender,
        proposalWriteCapture: bdInput.proposalWriteCapture,
        proposalWriteEoi: bdInput.proposalWriteEoi,
        proposalWriteTender: bdInput.proposalWriteTender,
        analystCapture: bdInput.analystCapture,
        analystEoi: bdInput.analystEoi,
        analystTender: bdInput.analystTender,
        reviewerCapture: bdInput.reviewerCapture,
        reviewerEoi: bdInput.reviewerEoi,
        reviewerTender: bdInput.reviewerTender,
        copyWriterCapture: bdInput.copyWriterCapture,
        copyWriterEoi: bdInput.copyWriterEoi,
        copyWriterTender: bdInput.copyWriterTender,
        recruiterAdminCapture: bdInput.recruiterAdminCapture,
        recruiterAdminEoi: bdInput.recruiterAdminEoi,
        recruiterAdminTender: bdInput.recruiterAdminTender,
        commLeadCapture: bdInput.commLeadCapture,
        commLeadEoi: bdInput.commLeadEoi,
        commLeadTender: bdInput.commLeadTender,
        pmCapture: bdInput.pmCapture,
        pmEoi: bdInput.pmEoi,
        pmTender: bdInput.pmTender,
        graphicDesCapture: bdInput.graphicDesCapture,
        graphicDesEoi: bdInput.graphicDesEoi,
        graphicDesTender: bdInput.graphicDesTender,
        translatorCapture: bdInput.translatorCapture,
        translatorEoi: bdInput.translatorEoi,
        translatorTender: bdInput.translatorTender,
    }

    const initialSelectedValues = {
        expertLoe: Number(comm.expertLoe),
        historicalNetMargin: Number(comm.historicalNetMargin),
        futureRevenue: Number(comm.futureRevenue),
    }
    const [bd_input, setbd_input] = useState(0);

    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = useCallback(async () => {
        /**
         * this function will be called when the user clicks the save button
         * now the data is divided into two parts, so first we have to verify that 
         * the data was in fact changed. 
         * 
         * I have the option of calling a function that will auto generate the
         * comm data and then comparing the two, or I can just check the values that am
         * actually interested in.
         */
        console.log(commData, initialCommData)
        console.log(selectedValues, initialSelectedValues)
        if (_.isEqual(commData, initialCommData) && _.isEqual(selectedValues, initialSelectedValues)) {
            // do nothing, the user made no change
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
        } else {
            // changes detected
            /**
             * we need a function that make the change using the data we give it.
             * 
             */
            await patchComms(
                commData,
                selectedValues,
                bd_input,
                comm.id,
                bdInput.id,
                bidId,
            ).then(() => {
                setresponse(true)
            }).catch((error) => {
                toast({
                    title: "Failed",
                    description: "The system encountered an error",
                    action: <ToastAction altText="Undo" onClick={() => {
                        handleSubmit()
                    }}>
                        Retry
                        {/* For now this does nothing */}
                    </ToastAction>
                })
            })
        }


    }, [selectedValues, commData, bd_input, toast, router])

    const getTotal = (filter: string): number => {
        try {
            return Object.entries(commData).reduce((acc, [key, value]) => {
                if (key.endsWith(filter)) {
                    return acc + value;
                }
                return acc;
            }, 0);
        } catch (error) {
            console.error('Error calculating total:', error);
            return 0;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = parseFloat(e.target.value) || 0;
        setCommData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Delete') {
            e.preventDefault();
        }
    };

    useEffect(() => {
        setbd_input(Object.entries(commData).reduce((acc, [key, value]) => {
            if (key === 'duration' || key === 'id' || key === 'budget') {
                return acc
            }
            return acc + value
        },
            0
        ))


    }, [commData])

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

    return (
        <div className="flex flex-col gap-2">
            <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="bdInput">BD Input</TabsTrigger>
                    <TabsTrigger value="other">Other metrics</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Budget</TableCell>
                                <TableCell>
                                    <Input
                                        placeholder={`${commData.budget}`}
                                        type='number'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        onChange={(e) => handleInputChange(e, 'budget')}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold">Less COGS(70% of budget)</TableCell>
                                <TableCell>
                                    {(commData.budget) * 0.7}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold">Gross margin</TableCell>
                                <TableCell>
                                    {(commData.budget) * 0.3}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold">Less PM cost(10% of fees)</TableCell>
                                <TableCell>
                                    {(commData.budget) * 0.07}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Less BD cost</TableCell>
                                <TableCell>
                                    {bd_input * 250}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Net margin</TableCell>
                                <TableCell>
                                    {((commData.budget) * 0.3) - (bd_input * 250)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Project duration in months</TableCell>
                                <TableCell>

                                    <Input
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}

                                        placeholder={`${commData.duration}`

                                        }
                                        onChange={(e) => handleInputChange(e, 'duration')}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Net margin per month</TableCell>
                                <TableCell>
                                    {(((commData.budget) * 0.3) - (bd_input * 250)) / (commData.duration || 1)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
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

                </TabsContent>
                <TabsContent value="bdInput">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Role</TableHead>
                                <TableHead>Capture</TableHead>
                                <TableHead>EOI</TableHead>
                                <TableHead>Tender</TableHead>
                                <TableHead>Total days</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Core Team (Minimum Requirement)</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Bid Director</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'bidDirectorCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.bidDirectorCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'bidDirectorEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.bidDirectorEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'bidDirectorTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.bidDirectorTender}`} />
                                </TableCell>
                                <TableCell>
                                    {commData.bidDirectorCapture + commData.bidDirectorEoi + commData.bidDirectorTender}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Bid Manager</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'bidManagerCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.bidManagerCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'bidManagerCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.bidManagerEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'bidManagerTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.bidManagerTender}`} />
                                </TableCell>
                                <TableCell>
                                    <TableCell>
                                        {commData.bidManagerCapture + commData.bidManagerEoi + commData.bidManagerTender}
                                    </TableCell>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Technical Lead (in-house)</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'technicalLeadCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.technicalLeadCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'technicalLeadEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.technicalLeadEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'technicalLeadTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.technicalLeadTender}`} />
                                </TableCell>

                                <TableCell>
                                    {commData.technicalLeadCapture + commData.technicalLeadEoi + commData.technicalLeadTender}

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Recruitment Lead</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'recLeadCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.recLeadCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'recLeadEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.recLeadEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'recLeadTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.recLeadTender}`} />
                                </TableCell>
                                <TableCell>
                                    {commData.recLeadCapture + commData.recLeadEoi + commData.recLeadTender}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Expanded Team (Discretionary)</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Proposal Writer</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'proposalWriteCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.proposalWriteCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'proposalWriteEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.proposalWriteEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'proposalWriteTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.proposalWriteTender}`} />
                                </TableCell>

                                <TableCell>
                                    {commData.proposalWriteCapture + commData.proposalWriteEoi + commData.proposalWriteTender}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Analyst / Research Support</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'analystCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.analystCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'analystEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.analystEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'analystTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.analystTender}`} />
                                </TableCell>

                                <TableCell>
                                    {commData.analystCapture + commData.analystEoi + commData.analystTender}

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Technical Contributor / Reviewer</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'reviewerCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.reviewerCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'reviewerEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.reviewerEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'reviewerTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.reviewerTender}`} />
                                </TableCell>

                                <TableCell>
                                    {commData.reviewerCapture + commData.reviewerEoi + commData.reviewerTender}

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Proposal Copy-Writer</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'copyWriterCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.copyWriterCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'copyWriterEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.copyWriterEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'copyWriterTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.copyWriterTender}`} />
                                </TableCell>

                                <TableCell>
                                    {commData.copyWriterCapture + commData.copyWriterEoi + commData.copyWriterTender}

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Recruiter / Admin Support</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'recruiterAdminCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.recruiterAdminCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'recruiterAdminEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.recruiterAdminEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'recruiterAdminTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.recruiterAdminTender}`} />
                                </TableCell>

                                <TableCell>
                                    {commData.recruiterAdminCapture + commData.recruiterAdminEoi + commData.recruiterAdminTender}

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Commercial Lead</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'commLeadCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.commLeadCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'commLeadEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.commLeadEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'commLeadTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.commLeadTender}`} />
                                </TableCell>

                                <TableCell>
                                    {commData.commLeadCapture + commData.commLeadEoi + commData.commLeadTender}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Project Manager (Intended)</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'pmCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.pmCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'pmEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.pmEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'pmTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.pmTender}`} />
                                </TableCell>

                                <TableCell>
                                    {commData.pmCapture + commData.pmEoi + commData.pmTender}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Other: Graphic Design</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'graphicDesCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.graphicDesCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'graphicDesEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.graphicDesEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'graphicDesTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.graphicDesTender}`} />
                                </TableCell>

                                <TableCell>
                                    {commData.graphicDesCapture + commData.graphicDesEoi + commData.graphicDesTender}

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Other: Translator</TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'translatorCapture')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.translatorCapture}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'translatorEoi')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.translatorEoi}`} />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        onChange={(e) => handleInputChange(e, 'translatorTender')}
                                        inputMode='numeric'
                                        onKeyDown={(e) => {
                                            handleKeyPress(e)
                                        }}
                                        type='number'
                                        placeholder={`${commData.translatorTender}`} />
                                </TableCell>

                                <TableCell>
                                    {commData.translatorCapture + commData.translatorEoi + commData.translatorTender}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Total</TableCell>
                                <TableCell>
                                    {getTotal('capture')}
                                </TableCell>
                                <TableCell>
                                    {getTotal('eoi')}
                                </TableCell>
                                <TableCell>
                                    {getTotal('tender')}

                                </TableCell>
                                <TableCell>
                                    {bd_input}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="other">
                    <Card className="border-none shadow-none">
                        {categories.map((category) => (
                            <Card key={category.name} className="mb-8 flex flex-col shadow-none border-none overflow-scroll">
                                {/* Category Title */}
                                <CardHeader>
                                    <CardTitle>
                                        {category.name}
                                    </CardTitle>
                                </CardHeader>


                                <CardContent className="grid grid-cols-3 gap-2">
                                    {category.levels.map((level, index) => {
                                        const categoryKey = category.tag;
                                        const isSelected = selectedValues[categoryKey as keyof typeof selectedValues] === level.value;
                                        return (
                                            <Card
                                                key={index}
                                                onClick={() => handleSelect(categoryKey, level.value)}
                                                className={`cursor-pointer p-6 shadow-none border-none  rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-muted'}`}
                                            >
                                                {level.label}
                                            </Card>
                                        );
                                    })}
                                </CardContent>
                            </Card>
                        ))}
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}