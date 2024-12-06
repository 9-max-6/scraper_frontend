"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useState } from "react";
import { DataTabProps } from "@/types/types";
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
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import axios from "axios";
import { Textarea } from "./ui/textarea";
import { bidStore } from "@/store/bid-store";
// Validation schema
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



// Main form component
export default function DataTab(props: DataTabProps) {
    // Load the form data from localStorage if available

    const { setopen } = props
    const [loading, setloading] = useState(false)
    const { toast } = useToast()
    const incrementBid = bidStore((state) => state.incrementBid);

    const detailedView = props.detailedView;

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
                client: "",
                country: "",
                biddingEntity: "",
                technicalUnit: "",
                consortiumRole: "",
                deadline: formatDateToString(new Date()),
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
                const response = await axios.post('/api/bid/', parsedData);
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
                setopen(false);
                incrementBid();
            } catch (error) {
                console.error("Error submitting form data:", error);
                toast({
                    title: "Error!",
                    description: "There was an error submitting the bid",
                    variant: "destructive",
                    action: (
                        <Button onClick={onSubmit} variant="muted">
                            Try again
                        </Button>
                    )
                })
            }
        }
    };

    return (
        <Form {...form}>
            <Card className="shadow-none border-none">
                <CardHeader>
                    <CardTitle>Project Datasheet</CardTitle>
                    <CardDescription>General description of the project.</CardDescription>
                </CardHeader>
                <CardContent>
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
                                                handleFieldChange("title", e.target.value);
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
                                { label: "Client", fieldName: "client", placeholder: "Enter client name" },
                                { label: "Bidding Entity", fieldName: "biddingEntity", placeholder: "Enter bidding entity" },
                                { label: "Technical Unit", fieldName: "technicalUnit", placeholder: "Enter technical unit" },
                                { label: "Consortium Role", fieldName: "consortiumRole", placeholder: "Enter consortium role" },
                            ].map(({ label, fieldName, placeholder }) => (
                                <FormField
                                    key={fieldName}
                                    control={form.control}
                                    name={fieldName}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{label}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={placeholder}
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleFieldChange(fieldName as keyof z.infer<typeof FormSchema>, e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

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
                                                handleFieldChange("phase", value);
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
                                                handleFieldChange("country", value);
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
                                        <FormDescription>Select the project's deadline.</FormDescription>
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
                                                handleFieldChange("des", e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex">
                            {
                                !detailedView && (
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
                                )
                            }
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Form >
    );
}
