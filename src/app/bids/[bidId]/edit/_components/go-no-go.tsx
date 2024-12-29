import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GoNoGO() {
    return (
        <div className="flex flex-col gap-2">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Go?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    This bid is in the go phase
                    Click here to go to the next phase
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Flagged metrics
                    </CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
    )
}