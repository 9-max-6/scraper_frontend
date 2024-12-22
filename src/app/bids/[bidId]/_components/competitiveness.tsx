import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompetitivenessById } from "@/db/queries/metrics/get";

/**
 * text imports
 */
import { CompetitivenessText } from "./bid-profile-text";

const getText = (key: string, value: string): {
    text: string,
    tag: string,
} => {
    try {
        const entry = CompetitivenessText[key as keyof typeof CompetitivenessText];
        entry.scores[value as keyof typeof entry.scores];
        return {
            text: entry.scores[value as keyof typeof entry.scores],
            tag: entry.tag
        }
    }

    catch (e: any) {
        console.log(e.toString())
        return {
            text: "Error!!",
            tag: "Wrong bid tag",
        }
    }
}
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