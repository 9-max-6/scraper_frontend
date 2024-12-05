'use client'
import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardFooter,
    CardDescription
} from "./ui/card";
import Image from 'next/image'
import DataCardFooter from "./data-card-footer";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { DollarSign, Clock, Target, User } from "lucide-react";
export default function DataCardTrigger({ entry, setopen }) {
    // Do the math to determine if the deadline is passed or not.
    // const deadlinePassed = (new Date() - entry.deadline) < 0
    return (

        <Card className="box-content">
            <CardHeader>
                <div className="flex gap-2 justify-between w-full">
                    <div className="grow-0">
                        <Image
                            src="/dt_global_logo.jpeg" // Reference the image from the public directory
                            width={60} // Original width of the image
                            height={60} // Original height of the image
                            alt="DT Global Logo"
                        />
                    </div>
                    <div className="text-left grow self-start flex flex-col gap-2">
                        <CardTitle className="text-xl">
                            {entry.title}
                        </CardTitle>
                        <CardDescription>
                            {entry.client}
                        </CardDescription>

                    </div>
                    <Badge className="ml-auto self-start">
                        {entry.phase}
                    </Badge>
                </div>


            </CardHeader>
            <CardContent className="relative ml-12" onClick={() => { setopen(true) }}>
                <Separator className="mb-2" />
                <div className="grid grid-cols-4 gap-2 justify-between">
                    <div className="flex col-span-1  grow-1 flex-col gap-2">
                        <li className="list-none flex items-center gap-1">
                            <DollarSign /> {entry.contract_value ? entry.contract_value : "Missing..."}
                        </li>
                        <li className="list-none flex items-center gap-1">
                            <Clock /> {entry.duration ? entry.duration : "Missing..."}
                        </li>
                        <li className="list-none flex items-center gap-1">
                            <Target /> {entry.deadline ? entry.deadline : "Missing..."}
                        </li>

                    </div>


                    <div className="col-span-3 text-left">
                        <CardDescription className="text-semibold">

                            {entry.des}
                        </CardDescription>
                        <CardDescription className="my-2 flex gap-2 items-center text-sm">
                            <User />
                            {entry.author}
                        </CardDescription>
                    </div>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="bg-muted">

                {/* Updated at: {entry.date} */}
                {/* Add a variable to the backend that tracks when the opportunity was
                updated and when it was created. */}
            </CardFooter>
        </Card>

    )
}