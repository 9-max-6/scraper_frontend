import { getBids } from "@/db/queries/bids/get"
import SearchBar from "./_components/search-bar"
import BidsTable, { BidsTableFallback } from "./_components/bids-table";
import { Suspense } from "react";
import Pagination from "./_components/paginator";
import { cookies } from "next/headers";
import Loading from "./_components/loading";


async function AsyncPage(props: {
    searchParams?: Promise<{
        title?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const title = searchParams?.title || '';
    const page = Number(searchParams?.page) || 1;

    const bids = await getBids({
        page: page,
        title: title,
    })

    cookies();

    const paginatorProps = {
        page: bids?.currentPage,
        totalPages: bids?.totalPages,
        totalItems: bids?.totalItems,

    }
    return (
        <div className="dash_container mx-12">
            <div className="w-full grid grid-rows-12 relative h-full">
                <div className="sticky row-span-1 w-full z-20 top-0 flex items-center py-4">
                    <SearchBar />
                </div>
                <div className="row-span-11 h-full grid grid-rows-12">
                    <div className="row-span-11 overflow-scroll">
                        <Suspense fallback={<BidsTableFallback />}>
                            <BidsTable bids={bids} />
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

export default function Page(props: {
    searchParams?: Promise<{
        title?: string;
        page?: string;
    }>;
}) {
    return (
        <Suspense fallback={<Loading />}>
            <AsyncPage {...props} />
        </Suspense>
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