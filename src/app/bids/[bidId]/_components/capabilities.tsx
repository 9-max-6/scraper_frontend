import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCapabilitiesById } from "@/db/queries/metrics/get";
import { ThumbsDown, ThumbsUp } from "lucide-react";

/**
 * text imports
 */
import { CapabilitiesText } from "./bid-profile-text";

const getText = (key: string, value: string): {
    text: string,
    tag: string,
} => {
    try {
        const entry = CapabilitiesText[key as keyof typeof CapabilitiesText];
        entry.scores[value as keyof typeof entry.scores];

        return {
            text: entry.scores[value as keyof typeof entry.scores],
            tag: entry.tag
        }
    } catch (error: any) {
        console.log(error.toString())
        return {
            text: "Invalid key",
            tag: "Error!!"
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
export default async function Capabilities({ id, score, phase }: {
    id: number | null,
    score: number,
    phase: string | null,
}) {

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
            <CardHeader className="relative">
                <CardTitle>
                    Capabilities
                </CardTitle>
                <CardDescription>
                    What is the capability of the team?
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