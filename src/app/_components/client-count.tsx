import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { getClientCount } from "@/db/queries/stats/revenue";

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
        < Card className="w-full" >
            <CardHeader>
                <CardDescription>
                    Total clients
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {clientCount}
                </h3>
            </CardContent>
        </Card>
    )
}