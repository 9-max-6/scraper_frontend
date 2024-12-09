import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { LifeBuoy, Send } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ModeToggle from "@/components/toggle-mode";
import { NavSecondary } from "@/components/nav-secondary";
import { getBidById } from "@/lib/bid-service";
import Overview from "@/components/overview";

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
];

export async function getDetailedBid(bidId: number) {
    try {
        const response = await getBidById(bidId)
        return response
    } catch (e) {
        console.error("Error when fetching detailed biid", e.toString());
        return null;
    }
}

export default async function Page({ params }: { params: Promise<{ bidId: string }> }) {
    const bidId = (await params).bidId
    const bid = await getDetailedBid(parseInt(bidId))

    if (!bid) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Error fetching bid details. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-9 w-full auto-rows-min">

            <SidebarInset className="ml-6 min-w-full z-20 col-span-6 overflow-scroll relative scrollbar-hide h-[100vh]">
                {/* Render bid details here */}
                {bid && (
                    <Overview props={bid} />
                )
                }
            </SidebarInset>
            <div className="pl-12 col-span-3 relative min-h-[100vh] max-h-[100vh]">
                <div className="pt-8 flex flex-col w-full">
                    <div className="flex gap-2 ml-auto mr-12">
                        <ModeToggle />
                        <NavSecondary items={navSecondary} />
                    </div>
                    <Separator className="my-2" />
                </div>
            </div>
        </div>
    );
}
