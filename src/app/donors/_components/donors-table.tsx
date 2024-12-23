import * as React from "react"
import { PaginatedDonorResponseType } from "@/db/queries/donors/get";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardDescription, } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react";
import { format } from "date-fns";

export const columns = [
    {
        title: "",
        dataIndex: "icon",
        key: "icon",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Description",
        dataIndex: "des",
        key: "des",
    },
    {
        title: "Date created",
        dataIndex: "createdAt",
        key: "createdAt",
    },
];


export default async function DonorsTable({ donors }: {
    donors: PaginatedDonorResponseType | undefined
}) {

    const getClientInitials = (name: string) => {
        return name.split(" ").map((n) => n[0]).join("")
    }

    const data = donors?.items || [];
    return (
        <Table className="relative h-full overflow-scroll">
            <TableHeader className="sticky top-0">

                <TableRow className="w-full">
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
                        {data.map((client) => (
                            <TableRow className="relative rounded-lg h-24" key={client.id}>
                                {/* icon */}
                                <TableCell className="w-24">
                                    <Button variant="ghost" className="hover:cursor-default hover:bg-inherit">
                                        <HeartHandshake color="#a51d2d" /> {getClientInitials(client.name)}
                                    </Button>
                                </TableCell>

                                {/* Title */}
                                <TableCell>
                                    <Link href={`/donors/${client.id}`} className="hover:text-blue-400">
                                        {client.name}
                                    </Link>

                                </TableCell>

                                {/* des */}
                                <TableCell className="text-wra break-all p max-w-[300px]">
                                    {client.des}
                                </TableCell>

                                {/* Deadline */}
                                <TableCell>
                                    {format(client.createdAt, 'dd-mm-yy')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </>

                ) : (
                    <Card className="shadow-none border-none">
                        <CardDescription>
                            No donors found
                        </CardDescription>
                    </Card>
                )}

            </TableBody>
        </Table>

    )
}

export function DonorsTableFallback() {
    const fakeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
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
                <TableRow className="text-gray-400">
                    Loading...
                </TableRow>
            </TableBody>
        </Table>
    )
}