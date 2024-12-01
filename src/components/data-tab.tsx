"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const FormSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
    phase: z.string().min(1, { message: "Phase is required." }),
    date: z.date({ required_error: "Date is required." }),
    author: z.string().min(2, { message: "Author name must be at least 2 characters." }),
    client: z.string().min(2, { message: "Client name must be at least 2 characters." }),
    country: z.string().min(2, { message: "Country must be at least 2 characters." }),
    biddingEntity: z.string().min(2, { message: "Bidding entity is required." }),
    technicalUnit: z.string().min(2, { message: "Technical unit is required." }),
    consortiumRole: z.string().min(2, { message: "Consortium role is required." }),
    deadline: z.date({ required_error: "Deadline is required." }),
})

const countryNames = ["Kenya"]

export default function
    DataTab() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            phase: "",
            date: new Date(),
            author: "",
            client: "",
            country: "",
            biddingEntity: "",
            technicalUnit: "",
            consortiumRole: "",
            deadline: new Date(),
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (

        <Form {...form}>
            <Card className="shadow-none">
                <CardHeader>
                    <CardTitle>Project Datasheet</CardTitle>
                    <CardDescription>General description of the project.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Title Field (Full Width) */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sustainable Business for Uganda (SB4U) Platform" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Two Columns Layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { label: "Author", fieldName: "author", placeholder: "Yovan Muhsin" },
                                { label: "Client", fieldName: "client", placeholder: "EU" },
                                { label: "Bidding Entity", fieldName: "biddingEntity", placeholder: "Uganda" },
                                { label: "Technical Unit", fieldName: "technicalUnit", placeholder: "Private Sector Development" },
                                { label: "Consortium Role", fieldName: "consortiumRole", placeholder: "Lead" },
                            ].map(({ label, fieldName, placeholder }) => (
                                <FormField
                                    key={fieldName}
                                    control={form.control}
                                    name={fieldName}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{label}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={placeholder} {...field} />
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
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a stage" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Expression of Interest">
                                                    Expression of Interest
                                                </SelectItem>
                                                <SelectItem value="Capture">
                                                    Capture
                                                </SelectItem>
                                                <SelectItem value="Tender stage">
                                                    Tender stage
                                                </SelectItem>
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
                                            onValueChange={field.onChange}
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

                            {/* Date Picker for "date" */}
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
                                                        value={field.value?.toLocaleDateString() || ""}
                                                        readOnly
                                                        placeholder="Select a date"
                                                    />
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => field.onChange(date)}
                                                    disabled={(date) => date < new Date()}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>Select the date of generation for the report.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Date Picker for "deadline" */}
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
                                                        value={field.value?.toLocaleDateString() || ""}
                                                        readOnly
                                                        placeholder="Select a deadline"
                                                    />
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => field.onChange(date)}
                                                    disabled={(date) => date < new Date()} // Disable past dates
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>Select the project deadline.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </Form>

    )
}
