import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCapabilitiesById } from "@/db/queries/metrics/get";

/**
 * text imports
 */
import { CapabilitiesText } from "./bid-profile-text";

const getText = (key: string, value: string): {
    text: string,
    tag: string,
} => {
    const entry = CapabilitiesText[key as keyof typeof CapabilitiesText];
    entry.scores[value as keyof typeof entry.scores];

    return {
        text: entry.scores[value as keyof typeof entry.scores],
        tag: entry.tag
    }
}

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
            <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {Object.entries(data).map(([key, value]) => {
                    // if key is id return nothing
                    if (key == "id") {
                        return;
                    }

                    // not gonna happen but for typescript
                    if (!value) {
                        return (
                            <div>
                                Missing text
                            </div>
                        )
                    }
                    return (
                        <Card className="shadow-none bg-muted border-none" key={key}>
                            <CardHeader>
                                <CardTitle>
                                    {getText(key, value.toString()).tag}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {getText(key, value.toString()).text}
                            </CardContent>
                        </Card>
                    )
                }

                )}
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