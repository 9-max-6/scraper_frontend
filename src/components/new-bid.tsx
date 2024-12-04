'use client'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import DataTab from "./data-tab";


export interface DataTabProps {
    open: boolean;
    setopen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewBid() {
    // this needs to be the stored state of the bids
    const [open, setopen] = useState(false)

    const props: DataTabProps = {
        open,
        setopen,
    }


    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger asChild>
                <div onClick={() => setopen(true)}>
                    <Plus className="mr-2 text-blue-500 h-24 w-24 cursor-pointer" />
                </div>
            </DialogTrigger>

            <DialogContent className="w-[90%] overflow-scroll max-w-[1024px]">
                {/* My custom tabs */}
                <DataTab {...props} />
                {/* My custom tabs */}
            </DialogContent>
        </Dialog >
    )
}
