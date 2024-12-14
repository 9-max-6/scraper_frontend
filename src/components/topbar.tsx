import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavSecondary } from "@/components/nav-secondary"
import ModeToggle from "@/components/toggle-mode"
import {
    LifeBuoy,
    Send,
} from "lucide-react"


const navSecondary = [
    {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
    },
    {
        title: "Feedback",
        url: "#",
        icon: Send,
    },
]
export default function Topbar() {
    return (
        <div className="my-2 py-2 flex items-baseline">
            <div className="flex gap-2 ml-auto">
                <ModeToggle />
                <NavSecondary items={navSecondary} />
            </div>
        </div>
    )
}