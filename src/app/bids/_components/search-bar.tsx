'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"


export default function SearchBar() {
    const useS;
    return (
        <div className="w-full grid grid-rows-12 relative h-full">
            <div className="row-span-1 h-full w-full">
                <Input
                    placeholder="Search by title of bid"
                    defaultValue={ }
                />
            </div>

        </div>
    )
}