import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getCapabilitiesById } from "@/db/queries/metrics/get";

/**
 * 
 * @param param0 
 * @returns 
 */
export default async function Capabilities({ id }: { id: number | null }) {

    if (!id) {
        return (
            <CapabilitiesError />
        )
    }

    /**
     * fetching data from the database
     */
    const dataArray = await getCapabilitiesById(id);

    if (!dataArray || !dataArray[0]) {
        return (
            <CapabilitiesError />
        )
    }
    const data = dataArray[0];
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>
                    Capabilities
                </CardTitle>
                <CardDescription>
                    What is the capability of the team?
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
export function CapabilitiesError() {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>
                    Capabilities
                </CardTitle>
                <CardDescription>
                    What is the capability of the team?
                </CardDescription>
            </CardHeader>
            <CardContent>
                Error fetching data
            </CardContent>
        </Card>
    )
}