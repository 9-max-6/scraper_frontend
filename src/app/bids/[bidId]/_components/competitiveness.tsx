import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompetitivenessById } from "@/db/queries/metrics/get";

export default async function Competitiveness({ id }: { id: number | null }) {

    if (!id) {
        return (
            <CompetitivenessError />
        )
    }

    /**
     * fetching data from the database
     */
    const dataArray = await getCompetitivenessById(id);

    if (!dataArray || !dataArray[0]) {
        return (
            <CompetitivenessError />
        )
    }
    const data = dataArray[0];
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>
                    Competitiveness
                </CardTitle>
                <CardDescription>
                    How competitive is this bid?
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
export function CompetitivenessError() {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>
                    Competitiveness
                </CardTitle>
                <CardDescription>
                    How competitive is this bid?
                </CardDescription>
            </CardHeader>
            <CardContent>
                Error fetching data
            </CardContent>
        </Card>
    )
}