import React from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useState } from "react";
import { Button } from "./ui/button";
import DataCardTrigger from "./data-card-trigger";
import DrawerTabs from "./drawer-tabs";
function DataCard({ entry }) {
    const [open, setopen] = useState(false)
    return (
        <Drawer open={open} onOpenChange={setopen}>
            <DrawerTrigger>
                <DataCardTrigger entry={entry} setopen={setopen} />
            </DrawerTrigger>
            <DrawerContent className="h-[90vh] overflow-scroll min-h-[90vh]">
                <div className="mx-auto w-2/3 relative">
                    <DrawerTabs entry={entry} />
                </div>
            </DrawerContent>
        </Drawer>

    );
}

export default DataCard;
