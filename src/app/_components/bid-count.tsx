import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"

export default async function BidCount() {

    return (
        < Card className="shadow-none w-full" >
            <CardHeader>
                <CardDescription>
                    Total Revenue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    $500k
                </h1>
            </CardContent>
        </Card>
    )
}