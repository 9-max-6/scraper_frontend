import * as React from "react"
import { PaginatedResponseType } from "@/db/queries/bids/get";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import MiniClient from "./mini-client";
import { Card, CardDescription } from "@/components/ui/card";
import { CircleCheckBig, ShieldAlertIcon, User2 } from "lucide-react";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export const columns = [
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Client",
        dataIndex: "client",
        key: "client",
    },
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Deadline",
        dataIndex: "deadline",
        key: "deadline",
    },
    {
        title: "Phase",
        dataIndex: "phase",
        key: "phase",
    },
    {
        title: "Author",
        dataIndex: "author",
        key: "author",
    },
    {
        title: "Country",
        dataIndex: "country",
        key: "country",
    },
    {
        title: "Date created",
        dataIndex: "createdAt",
        key: "createdAt",
    },

];


export default async function BidsTable({ bids }: {
    bids: PaginatedResponseType | undefined;
}) {

    const data = bids?.items || [];
    return (
        <Table className="relative h-full overflow-scroll">
            <TableHeader className="sticky top-0">

                <TableRow>
                    <TableHead>

                    </TableHead>
                    {columns.map((column) => (
                        <TableHead key={column.key}>
                            {column.title}
                        </TableHead>
                    ))}

                </TableRow>
            </TableHeader>
            <TableBody className="w-full">
                {data.length > 0 ? (
                    <>
                        {data.map((bid) => (
                            <TableRow className="relative rounded-lg h-24" key={bid.id}>
                                {/* urgent */}
                                <TableCell className="w-24">
                                    {bid.urgent ? (
                                        <ShieldAlertIcon className="text-red-800" size={20} />
                                    ) : (
                                        <CircleCheckBig className="text-green-800" size={20} />
                                    )}
                                </TableCell>
                                {/* Status */}
                                <TableCell>
                                    <Badge variant="outline" className={
                                        clsx(
                                            {
                                                "bg-green-100 text-green-800": bid.status?.startsWith("go"),
                                                "bg-red-100 text-red-800": bid.status === "undec",
                                                "bg-yellow-100 text-yellow-800": bid.status?.startsWith("tent"),
                                            }

                                        )
                                    }>
                                        {bid.status}
                                    </Badge>
                                </TableCell>
                                {/* Client */}
                                <TableCell>
                                    <MiniClient id={bid.client} />
                                </TableCell>
                                {/* Title */}
                                <TableCell className="hover:text-blue-400">
                                    <Link href={`/bids/${bid.id}`}>
                                        {bid.title}
                                    </Link>
                                </TableCell>

                                {/* Deadline */}
                                <TableCell>
                                    {bid.deadline ? format(bid.deadline, "dd-mm-yy") : ""}
                                </TableCell>

                                {/* Phase */}
                                <TableCell >
                                    <Badge variant="outline" className={
                                        clsx(
                                            {
                                                "bg-green-100 text-green-800": bid.phase === "eoi",
                                                "bg-blue-100 text-blue-800": bid.phase === "tender",
                                                "bg-yellow-100 text-yellow-800": bid.phase === "capture",
                                            }

                                        )
                                    }>
                                        {bid.phase}
                                    </Badge>
                                </TableCell>

                                {/* Author */}
                                <TableCell className="" >
                                    <Button variant="ghost" className="hover:bg-inherit cursor-default pl-0 border-none">
                                        <User2 /> {bid.author}
                                    </Button>
                                </TableCell>
                                {/* Country */}
                                <TableCell>
                                    {bid.country}
                                </TableCell>
                                {/* Date created */}
                                <TableCell>
                                    {format(bid.createdAt, 'dd-mm-yy')}
                                </TableCell>

                            </TableRow>
                        ))}
                    </>

                ) : (
                    <Card className="shadow-none border-none">
                        <CardDescription>
                            No bids found
                        </CardDescription>
                    </Card>
                )}

            </TableBody>
        </Table>

    )
}

export function BidsTableFallback() {
    return (
        <div>
            <Table className="relative h-full overflow-scroll">
                <TableHeader className="sticky top-0">
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.key}>
                                {column.title}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="w-full">

                </TableBody>
            </Table>
            <div className="h-[500px] flex flex-col gap-2 w-full">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-5 w-full" />
            </div>
        </div>

    )
}