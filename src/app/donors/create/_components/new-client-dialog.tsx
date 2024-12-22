import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import NewClientForm from "./new-client-form";
import { Button } from "@/components/ui/button";
import { CircleFadingPlus } from "lucide-react";

export default function NewClientDialog() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="w-24 h-8 bg-red-800 hover:bg-red-700">
                    Create <CircleFadingPlus />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle className="hidden">
                    Create new client
                </DialogTitle>
                <NewClientForm />
            </DialogContent>
        </Dialog>
    )
}