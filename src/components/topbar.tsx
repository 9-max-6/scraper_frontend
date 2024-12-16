import Image from "next/image";
import { Card } from "./ui/card";
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
        <Card className="relative shadow-none px-12 h-[70px] z-20 rounded-none">
            <div className="my-2 py-2 flex items-baseline">
                <Image
                    src="/dt.png"
                    height={100}
                    width={100}
                    alt="DT Global Logo"
                    className="absolute"
                />
                <div className="flex gap-2 ml-auto">
                    <ModeToggle />
                    <NavSecondary items={navSecondary} />
                </div>
            </div>
        </Card>
    )
}