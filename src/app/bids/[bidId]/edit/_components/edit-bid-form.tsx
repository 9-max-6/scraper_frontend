"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

/**
 * server imports
 */
import { SelectClient } from "@/db/schema/donors";
import { ToastAction } from "@/components/ui/toast";
import { patchBidById } from "../actions";
import { SelectBid } from "@/db/schema/bids";

/**
 * type import
 */

export const FormSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
    des: z.string().min(100, { message: "Description must be at least 100 characters." }),
    phase: z.string().min(1, { message: "Phase is required." }),
    author: z.string().min(2, { message: "Author name must be at least 2 characters." }),
    client: z.string({ message: "Client is required." }),
    country: z.string().min(2, { message: "Country must be at least 2 characters." }),
    biddingEntity: z.string().min(2, { message: "Bidding entity is required." }),
    technicalUnit: z.string().min(2, { message: "Technical unit is required." }),
    consortiumRole: z.string().min(2, { message: "Consortium role is required." }),
    deadline: z.string().min(1, { message: "Deadline is required." }),
});

const countryNames = ["Kenya", "Uganda", "Tanzania"];

/**
 * 
 * @param param0 
 * @returns 
 */
export default function EditBidForm({ props }: {
    props: {
        clients: Array<SelectClient>,
        bidData: Array<SelectBid>,
        client: Array<SelectClient>,
    },
}
) {

    const { toast } = useToast();
    const router = useRouter();
    // state
    const [pending, setpending] = useState(false);
    const [cancelling, setcancelling] = useState(false)
    const [redirecting, setredirecting] = useState(false);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setpending(true);
        // const result = await patchBidById(1, data)
        console.log(data)
        const result = 81;
        if (!result) {
            setpending(false);
            toast({
                title: "Error",
                variant: "destructive",
                description: "Failed to created bid",
                action:
                    <ToastAction altText="retry" onClick={() => { onSubmit(data) }}>
                        Retry
                    </ToastAction>
            })
        } else {
            setpending(false);
            const toastId = toast({
                title: "Success",
                description: "Successfully uploaded changes",

            }
            )
            // redirect to the bid page
            setredirecting(true);
            router.push(`/bids/${result}`);
        }
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: props.bidData[0].title,
            des: props.bidData[0].des,
            phase: props.bidData[0].phase ? props.bidData[0].phase : "",
            author: props.bidData[0].author,
            client: `${props.bidData[0].client}`,
            deadline: props.bidData[0].deadline ? format(props.bidData[0].deadline, "yyyy-mm-dd") : format(new Date(), "yyyy-mm-dd"),
            biddingEntity: props.bidData[0].biddingEntity,
            technicalUnit: props.bidData[0].technicalUnit,
            consortiumRole: props.bidData[0].consortiumRole,
        }
    });

    return (
        <>
            {redirecting ? (
                <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
                    Redirecting...
                    <Loader2 className="text-blue-500 animate-spin" size={32} />
                </div>
            ) : (
                <Form {...form}>
                    <Card className="shadow-none border-none">
                        <CardHeader>
                            <CardTitle>Project Datasheet</CardTitle>
                            <CardDescription>General description of the project.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Separator className="mb-8" />
                            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                                {/* Title Field */}
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={props.bidData[0].title}
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                {/* Multi-field Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        { label: "Author", fieldName: "author", placeholder: `${props.bidData[0].author}` },
                                        { label: "Bidding Entity", fieldName: "biddingEntity", placeholder: `${props.bidData[0].biddingEntity}` },
                                        { label: "Technical Unit", fieldName: "technicalUnit", placeholder: `${props.bidData[0].technicalUnit}` },
                                        { label: "Consortium Role", fieldName: "consortiumRole", placeholder: `${props.bidData[0].consortiumRole}` },
                                    ].map(({ label, fieldName, placeholder }) => (
                                        <FormField
                                            key={fieldName}
                                            control={form.control}
                                            name={fieldName as keyof z.infer<typeof FormSchema>}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{label}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={placeholder}
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}

                                    {/* Dropdown for client */}
                                    <FormField
                                        control={form.control}
                                        name="client"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Client</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}

                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={props.client[0].name}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            props.clients.map((client) => (
                                                                <SelectItem key={client.id} value={`${client.id}`}
                                                                >
                                                                    {client.name}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Dropdown for Stage */}
                                    <FormField
                                        control={form.control}
                                        name="phase"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Stage</FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                    }}
                                                    value={field.value}

                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={props.bidData[0].phase ? props.bidData[0].phase : "Select phase"}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Capture">Capture</SelectItem>
                                                        <SelectItem value="Expression of Interest">Expression of Interest</SelectItem>
                                                        <SelectItem value="Tender stage">Tender stage</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Country Picker */}
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                    }}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={props.bidData[0].country} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {countryNames.map((country) => (
                                                            <SelectItem key={country} value={country}>
                                                                {country}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    {/* Deadline Picker */}
                                    <FormField
                                        control={form.control}
                                        name="deadline"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Deadline</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Input
                                                                value={field.value ? format(new Date(field.value), "yyyy-MM-dd") : ""}
                                                                readOnly
                                                                placeholder="Select a deadline"
                                                                className="text-left"
                                                            />
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : undefined}
                                                            onSelect={(date) => {
                                                                if (date) {
                                                                    const formattedDate = format(date, "yyyy-MM-dd");
                                                                    field.onChange(formattedDate); // Update the form value
                                                                }
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormDescription>Select the project&apos;s deadline.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <FormField
                                    control={form.control}
                                    name="des"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={props.bidData[0].des}
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                    }}
                                                />


                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                                <div className="w-full flex">
                                    <div className="ml-auto flex gap-2">
                                        <Button variant="secondary" disabled={cancelling} onClick={() => {
                                            setcancelling(true);
                                            router.back();
                                        }}>
                                            {cancelling ? (
                                                <>
                                                    <Loader2 className="text-blue-500 animate-spin ml-auto" size={48} />
                                                    {" "} Cancelling
                                                </>
                                            ) : (
                                                <>
                                                    Cancel
                                                </>
                                            )}
                                        </Button>
                                        <Button disabled={pending} type="submit">
                                            {pending ? (
                                                <>
                                                    <Loader2 className="text-blue-500 animate-spin ml-auto" size={48} />
                                                    {" "} Saving
                                                </>
                                            ) : (
                                                <>
                                                    Save
                                                </>
                                            )}
                                        </Button>
                                    </div>


                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </Form >
            )}
        </>
    );
}
