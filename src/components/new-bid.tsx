'use client'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { useState } from "react";
import DataTab from "./data-tab";
import { DataTabProps } from "@/types/types";



export default function NewBid() {
    // this needs to be the stored state of the bids
    const [open, setopen] = useState(false)

    const props: DataTabProps = {
        open,
        setopen,
        entry: null,
        detailedView: false
    }


    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger asChild>
                <Button onClick={() => setopen(true)}>
                    New opportunity
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[90%] p-[26px] overflow-scroll max-w-[1024px]">
                {/* My custom tabs */}
                <DataTab {...props} />
                {/* My custom tabs */}
            </DialogContent>
        </Dialog >
    )
}
