import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getClientsById } from "@/db/queries/donors/get"
import { Separator } from "@radix-ui/react-select"

export default async function Page({ params }: {
    params: Promise<{
        clientId: string
    }>
}) {
    const clientId = (await params).clientId
    const id = Number(clientId)
    if (!id) {
        return (
            <div className="dash_container mx-4">
                Invalid id
            </div>
        )
    }
    const client = await getClientsById(id)
    if (!client || !client[0]) {
        return (
            <div className="dash_container mx-4">
                Donor not found
            </div>
        )
    }

    return (
        <div className="dash_container mx-4">
            <Card className="shadow-none max-w-[1080px] border-none">
                <CardHeader>
                    <CardTitle>
                        {client[0].name}
                    </CardTitle>
                    <CardDescription>
                        Client details page
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Separator className="mb-2" />
                    {client[0].des}

                    {/* Can include all sorts of information in this popup such as 
                    the sum of all the money this client can give us
                    and the number of bids that we have in the backend belonging to 
                    this client
                     */}
                </CardContent>
            </Card>
        </div>
    )

}