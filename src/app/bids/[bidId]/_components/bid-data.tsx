import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BidData() {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardDescription>
                    Bid data sheet
                </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter className="flex">
                <Button className="ml-auto">
                    Edit
                </Button>
            </CardFooter>
        </Card>
    )
}
// no calls for this.