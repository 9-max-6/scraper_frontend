import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default function ClientDetailsDialog({ client }: {
    client: {
        name: string,
        id: number,
        des: string,
    }
}) {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="ghost" className="hover:text-red-800">
                    {client.name}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Card className="shadow-none border-none">
                    <CardHeader>
                        <CardTitle>
                            {client.name}
                        </CardTitle>
                        <CardDescription>
                            Client details page
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Separator className="mb-2" />
                        {client.des}

                        {/* Can include all sorts of information in this popup such as 
                    the sum of all the money this client can give us
                    and the number of bids that we have in the backend belonging to 
                    this client
                     */}
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}