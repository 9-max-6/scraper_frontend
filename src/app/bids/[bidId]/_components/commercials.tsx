import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCommercialsById } from "@/db/queries/metrics/get";
import { ThumbsDown, ThumbsUp } from "lucide-react";

/**
 * text imports
 */
import { CommercialsText } from "./bid-profile-text";

/**
 * 
 * @param key 
 * @param value 
 * @returns 
 */
const getText = (key: string, value: string): {
    text: string,
    tag: string,
} => {
    try {
        const entry = CommercialsText[key as keyof typeof CommercialsText];
        entry.scores[value as keyof typeof entry.scores];
        return {
            text: entry.scores[value as keyof typeof entry.scores],
            tag: entry.tag
        }

    } catch (e: any) {
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

/**
 * 
 * @param param0 
 * @returns 
 */
export default async function Commercials({ id, score, phase }: {
    id: number | null,
    score: number,
    phase: string | null,
}) {
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
            <CardHeader className="relative">
                <CardTitle>
                    Commercials
                </CardTitle>
                <CardDescription>
                    What is the margin on this bid?
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
                    if (key === "id" || key === "bdInputId") {
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