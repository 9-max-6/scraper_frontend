import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

export default async function OppCount() {


    return (
        < Card className="w-full" >
            <CardHeader>
                <CardDescription>
                    Total opportunities
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    1000
                </h3>
            </CardContent>
        </Card>
    )
}