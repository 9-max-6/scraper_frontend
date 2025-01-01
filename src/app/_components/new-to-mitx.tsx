import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

export default function NewToMITX() {
    return (
        <Card className="shadow-none bg-card">
            <CardHeader>
                <CardTitle>
                    New to MITx?
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <CardDescription>
                    Check out our knowledge hub for more information on how to get started with MITx
                </CardDescription>
                <Link href="/knowledge" className="ml-auto">
                    <Button>
                        <Lightbulb className="mr-2" /> {" "} Get started
                    </Button>
                </Link>
            </CardContent>


        </Card>
    )
}