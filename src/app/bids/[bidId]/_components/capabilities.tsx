import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCapabilitiesById } from "@/db/queries/metrics/get";
import { ThumbsDown, ThumbsUp } from "lucide-react";
/**
 * text imports
 */
import { CapabilitiesText, Thresholds } from "./bid-profile-text";
import { getTime } from "./utils";
import Link from "next/link";

const getText = (key: string, value: string): {
    text: string,
    tag: string,
} => {
    try {
        const entry = CapabilitiesText[key as keyof typeof CapabilitiesText];
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
    const entry = Thresholds[phase as keyof typeof Thresholds]
    return score >= entry["capabilities" as keyof typeof entry]
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default async function Capabilities({ id, score, phase, bidId }: {
    id: number | null,
    score: number,
    phase: string | null,
    bidId: number,
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
                            <Button variant="ghost" className="hover:cursor-default hover:bg-inherit">
                                {score}{" "}<ThumbsUp color="#26a269" />
                            </Button>
                        ) : (
                            <Button variant="ghost" className="hover:cursor-default hover:bg-inherit">
                                {score} {" "}<ThumbsDown color="#a51d2d" />
                            </Button>
                        )
                    }
                </div>

            </CardHeader>
            <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {Object.entries(data).map(([key, value]) => {
                    // if key is id return nothing
                    if (key === "id" || key === "createdAt" || key === "updatedAt") {
                        return;
                    }

                    // not gonna happen but for typescript
                    if (!value) {
                        return (
                            <div key={key}>
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
                <CardDescription className="text-sm">
                    {getTime(data.updatedAt, data.createdAt)}
                </CardDescription>
                <Link className="ml-auto" href={`/bids/${bidId}/edit/cap/${data.id}`}>
                    <Button>
                        Edit
                    </Button>
                </Link>
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