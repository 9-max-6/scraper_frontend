import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export default async function DeleteBid({ bidId }
    : {
        bidId: string
    }) {
    console.log(bidId)

    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    This action is permanent and cannot be undone
                </CardDescription>
            </CardHeader>
            <CardContent className="flex">
                <Dialog>
                    <DialogTrigger className="ml-auto">
                        <Button variant="destructive">
                            Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Are you sure you want to delete the bid?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex">
                                <Button variant="destructive" className="ml-auto">
                                    Confirm
                                </Button>
                            </CardContent>
                        </Card>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card >
    )
}