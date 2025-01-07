"use cache";
import { getClientsPaginated } from "@/db/queries/donors/get"
import SearchBar from "./_components/search-bar"
import DonorsTable, { DonorsTableFallback } from "./_components/donors-table";
import { Suspense } from "react";
import Pagination from "./_components/paginator";


export default async function Page(props: {
    searchParams?: Promise<{
        title?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const title = searchParams?.title || '';
    const page = Number(searchParams?.page) || 1;

    const donors = await getClientsPaginated({
        page: page,
        title: title,
    })

    const paginatorProps = {
        page: donors?.currentPage,
        totalPages: donors?.totalPages,
        totalItems: donors?.totalItems,

    }
    return (
        <div className="dash_container mx-12">
            <div className="w-full grid grid-rows-12 relative h-full">
                <div className="sticky row-span-1 w-full z-20 top-0 flex items-center py-4">
                    <SearchBar />
                </div>
                <div className="row-span-11 h-full grid grid-rows-12">
                    <div className="row-span-11 overflow-scroll">
                        <Suspense fallback={<DonorsTableFallback />}>
                            <DonorsTable donors={donors} />
                        </Suspense>
                    </div>
                    <div className="row-span-1">
                        <Pagination {...paginatorProps} />
                    </div>
                </div>
            </div>
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

/**
 * so there are some implementations not yet made
 * these include
 * the undo button
 */