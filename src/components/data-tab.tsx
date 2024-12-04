"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Validation schema
const FormSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
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

// Utility function to format Date to string in a consistent way
const formatDateToString = (date: Date): string => {
    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0); // Ensure it&apos;s at midnight in UTC
    return newDate.toISOString().split("T")[0]; // Return only the date part (YYYY-MM-DD)
};

// Main form component
export default function DataTab() {
    // Load the form data from localStorage if available
    const loadFormData = () => {
        const savedData = localStorage.getItem("formData");
        return savedData ? JSON.parse(savedData) : {
            title: "",
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
    const onSubmit = () => {
        // Perform form submission actions (e.g., send the form data to an API)
        console.log(form.getValues());
    };

    return (
        <Form {...form}>
            <Card className="">
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
                                                <SelectItem value="Expression of Interest">Expression of Interest</SelectItem>
                                                <SelectItem value="Capture">Capture</SelectItem>
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

                            {/* Date Picker */}
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Input
                                                        value={field.value}
                                                        readOnly
                                                        placeholder="Select a date"
                                                    />
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={new Date(field.value)}
                                                    onSelect={(date) => {
                                                        const formattedDate = formatDateToString(date);
                                                        field.onChange(formattedDate);
                                                        handleFieldChange("date", formattedDate);
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>Select the project&apos;s start date.</FormDescription>
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
                                                        value={field.value}
                                                        readOnly
                                                        placeholder="Select a deadline"
                                                    />
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={new Date(field.value)}
                                                    onSelect={(date) => {
                                                        const formattedDate = formatDateToString(date);
                                                        field.onChange(formattedDate);
                                                        handleFieldChange("deadline", formattedDate);
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
                        <div className="w-full flex">
                            <Button type="submit" className="ml-auto">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}
