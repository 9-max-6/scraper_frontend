import { Skeleton } from "@/components/ui/skeleton"
import { getClientsById } from "@/db/queries/get"
import Link from "next/link"

/**
 * 
 * @param param0 
 * @returns 
 */
export default async function MiniClient({ id }: { id: number }) {
    const client = await getClientsById(id)
    if (!client) {
        return (
            <Skeleton />
        )
    }

    return (
        <Link href={`/donors/${id}`} className="hover:text-blue-400">
            {client[0].name}
        </Link>

    )
}
