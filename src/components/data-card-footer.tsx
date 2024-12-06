'use client'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import DataTab from "./data-tab";
import { Button } from "./ui/button";
import DrawerTabs from "./drawer-tabs";
import { BidType } from "@/types/types";
import { DataTabProps } from "@/types/types";



export default function DataCardFooter({ entry }: { entry: BidType }) {
    // this needs to be the stored state of the bids
    const [open, setopen] = useState(false)

    const props: DataTabProps = {
        open,
        setopen,
        entry,
        detailedView: true
    }


    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger asChild>
                <Button>
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[1024px] h-[90vh] mx-auto overflow-scroll scrollbar-hide">
                {/* My custom tabs */}
                <DrawerTabs props={props} />
                {/* My custom tabs */}
            </DialogContent>
        </Dialog >
    )
}
