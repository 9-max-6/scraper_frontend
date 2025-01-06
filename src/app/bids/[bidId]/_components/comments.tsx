import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Comments() {

    const comments = [{

        comment: "The capabilities of this bid are not okay. Natasha is working on getting the bid to the capability expected",
        user: "Natasha",
        time: "2021-09-30T12:00:00Z"
    },
    {

        comment: "The capabilities of this bid are not okay. Natasha is working on getting the bid to the capability expected",
        user: "Natasha",
        time: "2021-09-30T12:00:00Z"
    },
    {

        comment: "The capabilities of this bid are not okay. Natasha is working on getting the bid to the capability expected",
        user: "Natasha",
        time: "2021-09-30T12:00:00Z"
    },
    {

        comment: "The capabilities of this bid are not okay. Natasha is working on getting the bid to the capability expected",
        user: "Natasha",
        time: "2021-09-30T12:00:00Z"
    },]
    return (
        <div className="dash_container flex flex-col">
            {comments.length > 0 ? (
                <>
                    {
                        comments.map((comment, index) => {
                            return (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardDescription>
                                            {comment.user}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {comment.comment}
                                    </CardContent>
                                    <CardFooter>
                                        <CardDescription>
                                            {comment.time}
                                        </CardDescription>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </>

            ) : (
                <div>
                    No comments yet
                </div>
            )}
            <Card className="bg-muted mt-auto shadow-none border-none">
                <Input placeholder="Add a comment" />
            </Card>
        </div>
    )
}