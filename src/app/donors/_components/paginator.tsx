'use client'

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"


export default function Pagination({ page, totalItems, totalPages }: {
    page: number | undefined,
    totalPages: number | undefined,
    totalItems: number | undefined,
}) {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();

    return (
        <div className="flex justify-between">
            <Button disabled={page === 1 ? true : false} onClick={() => {
                const newparams = new URLSearchParams(params);
                if (!page) return;
                if (page === 1) return;
                newparams.set('page', String(page - 1));
                router.push(`${pathname}?${newparams.toString()}`);


            }}
                className="w-24 h-8 bg-red-800 hover:bg-red-700">
                prev <ChevronLeft size={72} />
            </Button>
            <span className="text-gray-400 text-sm">{page} of {totalPages}</span>
            <Button disabled={page === totalPages} onClick={() => {
                const newparams = new URLSearchParams(params);
                if (!page) return;
                if (page === totalPages) return;
                newparams.set('page', String(page + 1));
                router.push(`${pathname}?${newparams.toString()}`);

            }}
                className="w-24 h-8 bg-red-800 hover:bg-red-700">
                next <ChevronRight size={72} />
            </Button>

        </div>
    )
}