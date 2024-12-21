"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useState } from "react";
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
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

/**
 * server imports
 */
import { SelectClient } from "@/db/schema/donors";
import { postBid } from "../actions";

const FormSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
    des: z.string().min(100, { message: "Description must be at least 20 characters." }),
    phase: z.string().min(1, { message: "Phase is required." }),
    date: z.string().min(1, { message: "Date is required." }),
    author: z.string().min(2, { message: "Author name must be at least 2 characters." }),
    client: z.string().min(2, { message: "Client name must be at least 2 characters." }),
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
export default function NewBidForm({ props }: { props: { clients: Array<SelectClient> } }) {

    const [loading, setloading] = useState(false)
    const { toast } = useToast()

    const [clientId, setclientId] = useState(1);


    // Utility function to format a Date object to a string
    function formatDateToString(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const loadFormData = () => {
        const value = localStorage.getItem("formData");
        if (value === null) {
            const savedData = localStorage.getItem("formData");
            return savedData ? JSON.parse(savedData) : {
                title: "",
                des: "",
                phase: "",
                date: formatDateToString(new Date()),
                author: "",
                Name: "",
                country: "",
                biddingEntity: "",
                technicalUnit: "",
                consortiumRole: "",
                deadline: formatDateToString(new Date()),
                go_capture: false,
                go_eoi: false,
                go_tender: false,
                tent_capture: false,
                tent_eoi: false,
                tent_tender: false,
                urgent: false,
            };
        };
    }
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: loadFormData(), // Load initial state from localStorage
    });

    // Save form data to localStorage whenever the form values change
    const handleFieldChange = () => {
        // Save form data to localStorage
        localStorage.setItem("formData", JSON.stringify(form.getValues()));
    };

    // Submit the form and handle the data
    const onSubmit = async () => {
        const formData = localStorage.getItem("formData");
        if (formData) {
            const parsedData = JSON.parse(formData);

            try {
                setloading(true)
                await axios.post('/api/bids/', parsedData);
                toast({
                    title: "Success!",
                    description: "Bid added successfully",
                    className: "h-24 text-lg",
                    action: (
                        <Button variant="destructive" onClick={() => { console.log("Undo") }}>
                            Undo
                        </Button>
                    )
                })
            } catch (error) {
                console.error("Error submitting form data:", error);
                toast({
                    title: "Error!",
                    description: "There was an error submitting the bid",
                    variant: "destructive",
                    action: (
                        <Button onClick={onSubmit} variant="link">
                            Try again
                        </Button>
                    )
                })
            }
        }
    };

    return (

        <Form {...form} action={postBid}>
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
                                            placeholder="Enter project title"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleFieldChange();
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
                                { label: "Author", fieldName: "author", placeholder: "Enter author name" },
                                { label: "Bidding Entity", fieldName: "biddingEntity", placeholder: "Enter bidding entity" },
                                { label: "Technical Unit", fieldName: "technicalUnit", placeholder: "Enter technical unit" },
                                { label: "Consortium Role", fieldName: "consortiumRole", placeholder: "Enter consortium role" },
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
                                                        handleFieldChange();
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
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                handleFieldChange();
                                            }}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a client" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    props.clients.map((client) => (
                                                        <SelectItem key={client.id} value={(() => {
                                                            setclientId(client.id)
                                                            console.log(clientId)
                                                            console.log(client.id)
                                                            return client.name
                                                        })()
                                                        }>
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
                                                handleFieldChange();
                                            }}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a stage" />
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
                                                handleFieldChange();
                                            }}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a country" />
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
                                            placeholder="Enter project description"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleFieldChange();
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex">
                            <Button type="submit" className="ml-auto">
                                {loading ? (
                                    <>
                                        <Loader2 className="text-blue-500 animate-spin ml-auto" size={48} />
                                        {" "} Loading
                                    </>
                                ) : (
                                    <>
                                        Submit
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Form >
    );
}
