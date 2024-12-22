'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from "next/navigation";
import NewClientDialog from "../create/_components/new-client-dialog"

export default function SearchBar() {
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams();
        if (term) {
            params.set('title', term);
        } else {
            params.delete('title');
        }
        router.push(`${pathname}?${params.toString()}`);
    }, 100);

    return (
        <div className="w-full grid grid-rows-12 relative h-full">
            <div className="row-span-1 h-full w-full flex">
                <Input
                    placeholder="Find clients by title..."
                    defaultValue={params.get("title") || ""}
                    onChange={(event) =>
                        handleSearch(event.target.value)
                    }
                    className="max-w-2xl"
                />
                <div className="ml-auto mr-2">
                    <NewClientDialog />
                </div>
            </div>

        </div>
    )
}
