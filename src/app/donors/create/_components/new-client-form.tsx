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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

/**
 * server imports
 */
import { postClient, undoClient } from "../actions";
import { ToastAction } from "@/components/ui/toast";
import { revalidateTag } from "next/cache";

/**
 * type import
 */

export const FormSchema = z.object({
    name: z.string().min(2, { message: "Title must be at least 2 characters." }),
    des: z.string().min(100, { message: "Description must be at least 100 characters." }),
});


/**
 * 
 * @param param0 
 * @returns 
 */
export default function NewClientForm() {

    const { toast } = useToast();
    const router = useRouter();
    // state
    const [pending, setpending] = useState(false);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setpending(true);
        const result = await postClient(data);
        if (!result) {
            setpending(false);
            toast({
                title: "Error",
                variant: "destructive",
                description: "Failed to create client",
                action:
                    <ToastAction altText="retry" onClick={() => { onSubmit(data) }}>
                        Retry
                    </ToastAction>
            })
        } else {
            setpending(false);
            toast({
                title: "Success",
                description: "Successfully created client",
                action: <ToastAction altText="Undo" onClick={() => {
                    // undo the action
                    /**
                     * grabs the id, deletes the bid, and redirects to the previous page
                     */
                    undoClient(result);
                }}>
                    Undo
                </ToastAction>

            }
                // after this just refresh the current page
            )
            try {
                revalidateTag("clients")
            } catch (e: any) {
                console.error(e.toString())
            }
            router.back()
        }
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            des: "",
        }
    });

    return (

        <Form {...form}>
            <Card className="shadow-none border-none">
                <CardHeader>
                    <CardTitle>Client form</CardTitle>
                    <CardDescription>Create a new client.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Title Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter client name"
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

                        <FormField
                            control={form.control}
                            name="des"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter client description"
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
                            <Button disabled={pending} type="submit" className="ml-auto">
                                {pending ? (
                                    <>
                                        <Loader2 className="text-blue-500 animate-spin ml-auto" size={48} />
                                        {" "} Submitting
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
