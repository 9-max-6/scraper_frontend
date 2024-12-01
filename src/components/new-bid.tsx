import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CustomTabs } from "./new-bid-tabs"


export default function NewBid() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">New profile</Button>
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
                <CustomTabs />
                {/* My custom tabs */}
            </DialogContent>
        </Dialog >
    )
}
