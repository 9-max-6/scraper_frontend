import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCommercialsById } from "@/db/queries/metrics/get";

/**
 * 
 * @param param0 
 * @returns 
 */
export default async function Commercials({ id }: { id: number | null }) {
    if (!id) {
        return (
            <CommmercialsError />
        )
    }

    /**
     * fetching data from the database
     */
    const dataArray = await getCommercialsById(id);

    if (!dataArray || !dataArray[0]) {
        return (
            <CommmercialsError />
        )
    }
    const data = dataArray[0];
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>
                    Commercials
                </CardTitle>
                <CardDescription>
                    What is the margin on this bid?
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
export function CommmercialsError() {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>
                    Commercials
                </CardTitle>
                <CardDescription>
                    What is the margin on this bid?
                </CardDescription>
            </CardHeader>
            <CardContent>
                Error fetching data
            </CardContent>
        </Card>
    )
}