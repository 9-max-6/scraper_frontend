'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CircleFadingPlus } from "lucide-react"
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    /**
     * choosing not to use the hook below
     * but then leaving it there incase 
     * I need to scale.
     */
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams();
        if (term) {
            params.set('title', term);
        } else {
            params.delete('title');
        }
        router.push(`${pathname}?${params.toString()}`);
    });

    return (
        <div className="w-full grid grid-rows-12 relative h-full">
            <div className="row-span-1 h-full w-full flex">
                <Input
                    placeholder="Find bids by title..."
                    defaultValue={params.get("title") || ""}
                    onChange={(event) =>
                        handleSearch(event.target.value)
                    }
                    className="max-w-2xl"
                />
                <div className="ml-auto mr-2">
                    <Link href="/bids/create">
                        <Button className="w-24 h-8">
                            Create <CircleFadingPlus />
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    )
}
