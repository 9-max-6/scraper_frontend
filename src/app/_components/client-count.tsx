import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { getClientCount } from "@/db/queries/stats/revenue";
import { HeartHandshake } from "lucide-react";

export default async function ClientCount() {

    const clientCount = await getClientCount();

    if (!clientCount) {
        return (
            <div>
                Error!
            </div>
        )
    }

    return (
        < Card className="relative bg-primary/10 w-full" >
            <div className="top-2 absolute right-2 z-10">
                <HeartHandshake className="text-red-800" />
            </div>
            <CardHeader>
                <CardDescription>
                    Total clients
                </CardDescription>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {clientCount}
                </h3>
            </CardHeader>

        </Card>
    )
}