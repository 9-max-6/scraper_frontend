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


export interface DataTabProps {
    open: boolean;
    setopen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DataCardFooter() {
    // this needs to be the stored state of the bids
    const [open, setopen] = useState(false)

    const props: DataTabProps = {
        open,
        setopen,
    }


    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger asChild>
                <Button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent parent trigger
                    }}>
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[90%] overflow-scroll max-w-[1024px]">
                {/* My custom tabs */}
                <DataTab {...props} />
                {/* My custom tabs */}
            </DialogContent>
        </Dialog >
    )
}
