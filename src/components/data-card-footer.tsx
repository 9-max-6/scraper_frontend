'use client'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "./ui/button";
import DrawerTabs from "./drawer-tabs";
import { BidType } from "@/types/types";
import { DataTabProps } from "@/types/types";
import _ from 'lodash';
import { CardContent, Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
export default function DataCardFooter({ entry }: { entry: BidType }) {
    // this needs to be the stored state of the bids
    const [open, setopen] = useState(false)

    const props: DataTabProps = {
        open,
        setopen,
        entry,
        detailedView: true
    }

    // function to be called when the tab closes
    function checkChanges(newOpen: boolean) {
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
                console.log('Changes were made');
                console.log(newBid);
                console.log(entry);
            }
            localStorage.clear()
        }
    }

    return (
        <Dialog open={open} onOpenChange={(newOpen) => {
            checkChanges(newOpen)
            setopen(newOpen)
        }}>
            <DialogTrigger asChild>
                <Button>
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
