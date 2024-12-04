'use-client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CustomTabs } from "./new-bid-tabs"
import { Plus } from "lucide-react";
import DataTab from "./data-tab";



export default function NewBid() {
    // this needs to be the stored state of the bids
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Plus className="mr-2 text-blue-500 h-24 w-24 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="w-[90%] overflow-scroll max-w-[1024px] h-screen flex flex-col gap-4">
                <DialogHeader>
                    <DialogTitle>
                        New bid
                    </DialogTitle>
                    <DialogDescription>
                        Create a new bid here and click save when you are done.
                    </DialogDescription>
                </DialogHeader>

                {/* My custom tabs */}
                <DataTab />
                {/* My custom tabs */}
            </DialogContent>
        </Dialog >
    )
}
