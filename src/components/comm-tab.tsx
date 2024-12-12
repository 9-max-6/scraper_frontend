"use client";
// find out why the file automatically submits even when there is no change that was made.
import { useRouter } from "next/navigation";
import { BidType } from "@/types/types";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "./ui/input";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import Loading from "@/app/bids/[bidId]/loading";
import { useToast } from "@/hooks/use-toast";

// Sample categories with levels and descriptions for Commercials

export default function Commercials({ props }: { props: BidType }) {
    const [commData, setCommData] = useState({
        budget: 0,
        duration: 0,
        bid_director_capture: 0,
        bid_director_eoi: 0,
        bid_director_tender: 0,
        bid_manager_capture: 0,
        bid_manager_eoi: 0,
        bid_manager_tender: 0,
        technical_lead_capture: 0,
        technical_lead_eoi: 0,
        technical_lead_tender: 0,
        rec_lead_capture: 0,
        rec_lead_eoi: 0,
        rec_lead_tender: 0,
        proposal_write_capture: 0,
        proposal_write_eoi: 0,
        proposal_write_tender: 0,
        analyst_capture: 0,
        analyst_eoi: 0,
        analyst_tender: 0,
        reviewer_capture: 0,
        reviewer_eoi: 0,
        reviewer_tender: 0,
        copy_writer_capture: 0,
        copy_writer_eoi: 0,
        copy_writer_tender: 0,
        recruiter_admin_capture: 0,
        recruiter_admin_eoi: 0,
        recruiter_admin_tender: 0,
        comm_lead_capture: 0,
        comm_lead_eoi: 0,
        comm_lead_tender: 0,
        pm_capture: 0,
        pm_eoi: 0,
        pm_tender: 0,
        graphic_des_capture: 0,
        graphic_des_eoi: 0,
        graphic_des_tender: 0,
        translator_capture: 0,
        translator_eoi: 0,
        translator_tender: 0,
    });

    const [initialCommData, setInitialCommData] = useState(commData);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [bd_input, setbd_input] = useState(0);

    const { toast } = useToast();
    const router = useRouter();

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

    const postUpdates = async () => {
        const currentDurationScore = props.metrics.commercials.project
        const currentBudgetScore = props.metrics.commercials.contract

        let updatedDurationScore = 0;
        let updatedBudgetScore = 0;

        if (commData.duration < 6 && commData.duration > 0) {
            updatedDurationScore = 1
        } else if (commData.duration < 12) {
            updatedDurationScore = 2
        } else if (commData.duration < 24) {
            updatedDurationScore = 3
        } else if (commData.duration < 48) {
            updatedDurationScore = 4
        } else if (commData.duration >= 48) {
            updatedDurationScore = 5
        } else {
            updatedDurationScore = 0
        }

        if (commData.budget < 500000 && commData.budget > 0) {
            updatedBudgetScore = 1

        } else if (commData.budget < 1500000) {
            updatedBudgetScore = 2
        } else if (commData.budget < 5000000) {
            updatedBudgetScore = 3
        } else if (commData.budget < 10000000) {
            updatedBudgetScore = 4
        } else if (commData.budget >= 10000000) {
            updatedBudgetScore = 5
        }

        if (updatedDurationScore !== currentDurationScore || updatedBudgetScore !== currentBudgetScore) {
            const response = fetch(`/api/bid/${props.bidData.id}`,
                {
                    body: JSON.stringify({
                        bidData: props.bidData,
                        metrics: {
                            ...props.metrics,
                            commercials:
                            {
                                ...props.metrics.commercials,
                                project: updatedDurationScore,
                                contract: updatedBudgetScore,
                            }
                        }
                    }),
                    method: 'PATCH'
                })

            return response

        }
    }



    const onExit = async (isOpen: boolean): Promise<void> => {
        if (!isOpen) {
            setIsOpen(false);
            if (JSON.stringify(commData) !== JSON.stringify(initialCommData)) {
                try {
                    await fetch(`/api/comm/${props.bidData.id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(commData),
                    }
                    )
                    await postUpdates()
                    toast({
                        title: "Commercials updated",
                        description: "Commercials have been successfully updated.",
                        variant: "default",
                        action: (
                            <Button>
                                Undo
                            </Button>
                        )

                    })
                } catch (error) {
                    console.error("Error patching commercials:", error);
                    toast({
                        title: `Failed to update commercials`,
                        description: "Please try again.",
                        variant: "destructive",
                        action: (
                            <Button variant='link'>
                                Retry
                            </Button>
                        )
                    })
                }
            }
            router.refresh()
        }
    };




    useEffect(() => {
        const fetchCommData = async () => {
            try {
                const data = await fetch(`/api/comm/${props.bidData.id}`, {
                    method: 'GET'
                }).then(response => response.json())
                    .catch(error => {
                        throw new Error(error);
                    });
                setCommData(data);
                setInitialCommData(data);
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        };

        fetchCommData();
    }, []);

    useEffect(() => {
        setbd_input(Object.entries(commData).reduce((acc, [key, value]) => {
            if (key === 'duration' || key === 'budget') {
                return acc
            }
            return acc + value
        }
            ,
            0))
    }, [commData])

    return (
        <Drawer open={isOpen} onOpenChange={(isOpen) => onExit(isOpen)}>
            <DrawerTrigger asChild>
                <Button onClick={() => setIsOpen(true)}>
                    Commercials
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[90vh]">
                {loading ? (
                    <Loading />
                ) : (
                    <Card className="shadow-none mx-auto w-[2/3] border-none">
                        <CardHeader>
                            <CardTitle className="flex items-baseline">
                                Commercials
                                <div className="flex ml-auto gap-2">
                                    <Button onClick={() => onExit(false)}>
                                        Save changes
                                    </Button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-scroll scrollbar-hide max-h-[75vh]">
                            <Card className="mb-8 shadow-none overflow-scroll">
                                <CardContent>
                                    <Table>
                                        <TableCaption>Project commercials breakdown.</TableCaption>
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

                                </CardContent>

                            </Card>
                            <Card>
                                <CardContent>
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
                                                        onChange={(e) => handleInputChange(e, 'bid_director_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.bid_director_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'bid_director_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.bid_director_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'bid_director_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.bid_director_tender}`} />
                                                </TableCell>
                                                <TableCell>
                                                    {commData.bid_director_capture + commData.bid_director_eoi + commData.bid_director_tender}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Bid Manager</TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'bid_manager_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.bid_manager_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'bid_manager_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.bid_manager_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'bid_manager_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.bid_manager_tender}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <TableCell>
                                                        {commData.bid_manager_capture + commData.bid_manager_eoi + commData.bid_manager_tender}
                                                    </TableCell>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Technical Lead (in-house)</TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'technical_lead_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.technical_lead_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'technical_lead_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.technical_lead_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'technical_lead_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.technical_lead_tender}`} />
                                                </TableCell>

                                                <TableCell>
                                                    {commData.technical_lead_capture + commData.technical_lead_eoi + commData.technical_lead_tender}

                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Recruitment Lead</TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'rec_lead_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.rec_lead_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'rec_lead_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.rec_lead_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'rec_lead_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.rec_lead_tender}`} />
                                                </TableCell>
                                                <TableCell>
                                                    {commData.rec_lead_capture + commData.rec_lead_eoi + commData.rec_lead_tender}
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
                                                        onChange={(e) => handleInputChange(e, 'proposal_write_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.proposal_write_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'proposal_write_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.proposal_write_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'proposal_write_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.proposal_write_tender}`} />
                                                </TableCell>

                                                <TableCell>
                                                    {commData.proposal_write_capture + commData.proposal_write_eoi + commData.proposal_write_tender}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Analyst / Research Support</TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'analyst_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.analyst_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'analyst_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.analyst_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'analyst_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.analyst_tender}`} />
                                                </TableCell>

                                                <TableCell>
                                                    {commData.analyst_capture + commData.analyst_eoi + commData.analyst_tender}

                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Technical Contributor / Reviewer</TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'reviewer_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.reviewer_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'reviewer_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.reviewer_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'reviewer_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.reviewer_tender}`} />
                                                </TableCell>

                                                <TableCell>
                                                    {commData.reviewer_capture + commData.reviewer_eoi + commData.reviewer_tender}

                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Proposal Copy-Writer</TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'copy_writer_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.copy_writer_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'copy_writer_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.copy_writer_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'copy_writer_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.copy_writer_tender}`} />
                                                </TableCell>

                                                <TableCell>
                                                    {commData.copy_writer_capture + commData.copy_writer_eoi + commData.copy_writer_tender}

                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Recruiter / Admin Support</TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'recruiter_admin_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.recruiter_admin_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'recruiter_admin_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.recruiter_admin_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'recruiter_admin_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.recruiter_admin_tender}`} />
                                                </TableCell>

                                                <TableCell>
                                                    {commData.recruiter_admin_capture + commData.recruiter_admin_eoi + commData.recruiter_admin_tender}

                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Commercial Lead</TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'comm_lead_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.comm_lead_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'comm_lead_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.comm_lead_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'comm_lead_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.comm_lead_tender}`} />
                                                </TableCell>

                                                <TableCell>
                                                    {commData.comm_lead_capture + commData.comm_lead_eoi + commData.comm_lead_tender}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Project Manager (Intended)</TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'pm_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.pm_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'pm_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.pm_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'pm_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.pm_tender}`} />
                                                </TableCell>

                                                <TableCell>
                                                    {commData.pm_capture + commData.pm_eoi + commData.pm_tender}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Other: Graphic Design</TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'graphic_des_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.graphic_des_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'graphic_des_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.graphic_des_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'graphic_des_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.graphic_des_tender}`} />
                                                </TableCell>

                                                <TableCell>
                                                    {commData.graphic_des_capture + commData.graphic_des_eoi + commData.graphic_des_tender}

                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Other: Translator</TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'translator_capture')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.translator_capture}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'translator_eoi')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.translator_eoi}`} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        onChange={(e) => handleInputChange(e, 'translator_tender')}
                                                        inputMode='numeric'
                                                        onKeyDown={(e) => {
                                                            handleKeyPress(e)
                                                        }}
                                                        type='number'
                                                        placeholder={`${commData.translator_tender}`} />
                                                </TableCell>

                                                <TableCell>
                                                    {commData.translator_capture + commData.translator_eoi + commData.translator_tender}
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
                                </CardContent>

                            </Card>
                        </CardContent>
                    </Card>
                )}
            </DrawerContent>
        </Drawer>
    );
}