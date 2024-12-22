import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getRiskById } from "@/db/queries/metrics/get";

export default async function Risk({ id }: { id: number | null }) {

    if (!id) {
        return (
            <RiskError />
        )
    }
    /**
     * fetching data from the database
     */
    const dataArray = await getRiskById(id);

    if (!dataArray || !dataArray[0]) {
        return (
            <RiskError />
        )
    }
    const data = dataArray[0];
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>
                    Risk
                </CardTitle>
                <CardDescription>
                    What are the risks associated with this bid?
                </CardDescription>
            </CardHeader>
            <CardContent>
                {JSON.stringify(data)}
            </CardContent>
            <CardFooter className="flex">
                <Button className="ml-auto">
                    Edit
                </Button>
            </CardFooter>
        </Card>
    )
}
/**
 * 
 * @returns 
 */
export function RiskError() {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>
                    Risk
                </CardTitle>
                <CardDescription>
                    What are the risks associated with this bid?
                </CardDescription>
            </CardHeader>
            <CardContent>
                Error fetching data
            </CardContent>
        </Card>
    )
}