import NewBid from "@/components/new-bid"
import Bids from "@/components/bids"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SearchBar from "@/components/search-bar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"


export default function Page() {
    return (
        <SidebarInset className="max-w-full grid grid-cols-9 w-full main_containerauto-rows-min">

            <div className="ml-6 min-w-full z-20 col-span-6 overflow-scroll relative scrollbar-hide main_container">
                <div className="sticky bg-card mb-4 top-0 z-30 w-full ">
                    <Card className="w-full shadow-none rounded-none border-l-4 border-r-4 border-l-blue-500 border-r-blue-500">
                        <CardHeader>
                            <CardTitle>
                                Seeker
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative flex gap-2 items-center">
                            <div className="w-full">
                                <SearchBar />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="z-10">
                    <Bids />
                </div>

            </div>

            <div className="px-12 col-span-3 relative">
                <div className="flex flex-col w-full">

                    <div>
                        {/* Add more here */}
                        <NewBid />
                    </div>
                </div>
            </div>
        </SidebarInset>


    )
}
