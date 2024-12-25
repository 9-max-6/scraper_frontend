import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

export default async function OppCount() {


    return (
        < Card className="w-full shadow-none" >
            <CardHeader>
                <CardDescription>
                    Total Revenue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    $500k
                </h1>
            </CardContent>
        </Card>
    )
}