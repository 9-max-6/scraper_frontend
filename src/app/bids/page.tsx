import NewBid from "@/components/new-bid"
import Bids from "@/components/bids"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import StatsFour from "@/components/stats-fours"
import { getBids } from "@/db/queries/get"
import SearchBar from "./_components/search-bar"
import Link from "next/link"


export default async function Page({ searchParams }: {
    searchParams: {
        page: string | undefined
    }
}) {
    const bids = await getBids()
    return (
        <div className="dash_container mx-12">
            {/* <SearchBar /> */}
            <Link href="/bids/create/">
                New bid
            </Link>
        </div>


    )
}

/**
 * to create a tanstack table, we need a means to 
 * populate the table with data using search Params.
 * we need to be able to control the current route
 * revalidatePath when the user stops typing from within 
 * the searchbar component.
 * 
 * so it should be something like, for the current query string,
 * return the number of pages and the size of the data that is available. 
 * 
 * is it better to render the table as a client component to allow
 * for filtering but then have a higher layer that has the pagination, filters
 * and one layer between this layer and the table to perform the actual
 * data fetching?
 */