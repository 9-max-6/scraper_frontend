import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompetitivenessById } from "@/db/queries/metrics/get";
import { ThumbsDown, ThumbsUp } from "lucide-react";

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
/**
 * 
 * @param score 
 * @param phase 
 * @returns 
 */
const getStatus = (score: number, phase: string | null) => {
    return true;
}

export default async function Competitiveness({ id, score, phase }: {
    id: number | null,
    score: number,
    phase: string | null,

}) {

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
            <CardHeader className="relative">
                <CardTitle>
                    Competitiveness
                </CardTitle>
                <CardDescription>
                    How competitive is this bid?
                </CardDescription>
                {/* status indicator */}
                <div className="absolute top-4 right-8">
                    {
                        getStatus(score, phase) ? (
                            // above threshold
                            <ThumbsUp color="#26a269" />
                        ) : (
                            <ThumbsDown color="#a51d2d" />
                        )
                    }
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {Object.entries(data).map(([key, value]) => {
                    // if key is id return nothing
                    if (key == "id") {
                        return;
                    }
                    if (key === "createdAt" || key === "updatedAt") {
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
                    const { text, tag } = getText(key, value.toString())
                    return (
                        <Card className="shadow-none bg-muted border-none" key={key}>
                            <CardHeader className="pb-2">
                                <CardTitle>
                                    {tag}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {text}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    )
                }

                )}
            </CardContent>
            <CardFooter className="flex">
                <CardDescription>
                    Current score: {score}
                </CardDescription>
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