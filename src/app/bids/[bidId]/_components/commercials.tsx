import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCommercialsById } from "@/db/queries/metrics/get";

/**
 * text imports
 */
import { CommercialsText } from "./bid-profile-text";


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
            <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {Object.entries(data).map(([key, value]) => {
                    // if key is id return nothing
                    if (key === "id" || key === "bdInputId") {
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
                            <CardHeader>
                                <CardTitle>
                                    {tag}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {text}
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