import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getRiskById } from "@/db/queries/metrics/get";

/**
 * text imports
 */
import { RiskText } from "./bid-profile-text";

const getText = (key: string, value: string): {
    text: string,
    tag: string,
} => {
    const entry = RiskText[key as keyof typeof RiskText];
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