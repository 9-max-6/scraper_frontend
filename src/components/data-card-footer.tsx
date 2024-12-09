'use client'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react";
import { Button } from "./ui/button";
import DrawerTabs from "./drawer-tabs";
import { BidType } from "@/types/types";
import { DataTabProps } from "@/types/types";
import _ from 'lodash';
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { bidStore } from "@/store/bid-store";
import axios from "axios";
export default function DataCardFooter({ entry }: { entry: BidType }) {
    // this needs to be the stored state of the bids
    const [open, setopen] = useState(false)

    const incrementBid = bidStore((state) => state.incrementBid);

    const props: DataTabProps = {
        open,
        setopen,
        entry,
        detailedView: true
    }
    const { toast } = useToast()

    function setKeys() {
        localStorage.setItem('Capabilities', JSON.stringify(entry.metrics.capabilities))
        localStorage.setItem('Commercials', JSON.stringify(entry.metrics.commercials))
        localStorage.setItem('Competitiveness', JSON.stringify(entry.metrics.competitiveness))
        localStorage.setItem('Risk', JSON.stringify(entry.metrics.risk))
    }
    const undoChanges = async () => {
        await axios.patch(`/api/bid/${entry.bidData.id}`, entry)
        incrementBid();
    }
    // function to be called when the tab closes
    async function checkChanges(newOpen: boolean) {
        if (!newOpen) {
            const newBid: BidType = {
                bidData: {
                    ...entry.bidData
                }, metrics: {
                    capabilities: JSON.parse(localStorage.getItem('Capabilities') || '0'),
                    commercials: JSON.parse(localStorage.getItem('Commercials') || '0'),
                    competitiveness: JSON.parse(localStorage.getItem('Competitiveness') || '0'),
                    risk: JSON.parse(localStorage.getItem('Risk') || '0'),
                }
            }
            if (!_.isEqual(newBid, entry)) {
                toast({
                    title: "Submitting",
                    description: "Uploading your changes",
                    variant: "default",
                    action: (
                        <Button variant="destructive" onClick={undoChanges}>
                            Undo
                        </Button>
                    )
                })
                await axios.patch(`/api/bid/${entry.bidData.id}`, newBid)
                incrementBid();

            }
            localStorage.clear();

        }
    }

    return (
        <Dialog open={open} onOpenChange={(newOpen) => {
            checkChanges(newOpen)
            setopen(newOpen)
        }}>
            <DialogTrigger asChild>
                <Button variant="link" onClick={setKeys}>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="h-[90vh] p-0 max-w-[1024px]">
                {/* My custom tabs */}

                <div className="sticky text-center  top-0 relative">
                    <Card className="shadow-none border-none h-[72px] max-h-[100ppx]">
                        <CardHeader>
                            <CardTitle>
                                {entry.bidData.title}
                            </CardTitle>
                            <CardDescription>
                                {entry.bidData.client}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <div className="overflow-scroll scrollbar-hide">
                    <DrawerTabs props={props} />
                </div>

                {/* My custom tabs */}
            </DialogContent>
        </Dialog >
    )
}
