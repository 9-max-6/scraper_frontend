import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { SmilePlusIcon } from "lucide-react"

export default async function OppCount() {


    return (
        <Card className="w-full relative bg-primary/10" >
            <div className="top-2 absolute right-2 z-10">
                <SmilePlusIcon className="text-primary" />
            </div>
            <CardHeader>
                <CardDescription>
                    Total opportunities
                </CardDescription>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    1000
                </h3>
            </CardHeader>

        </Card>
    )
}