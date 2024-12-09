import { AppSidebar } from "@/components/app-sidebar"
import NewBid from "@/components/new-bid"
import { Separator } from "@/components/ui/separator"
import {
  LifeBuoy,
  Send,
} from "lucide-react"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Bids from "@/components/bids"
import ModeToggle from "@/components/toggle-mode"
import { NavSecondary } from "@/components/nav-secondary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SearchBar from "@/components/search-bar"


const navSecondary = [
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
  },
]
export default function Page() {
  return (
    <div className="grid grid-cols-9 w-full auto-rows-min">
      <SidebarInset className="ml-6 min-w-full z-20 col-span-6 overflow-scroll relative scrollbar-hide h-[100vh]">
        <div className="sticky bg-card mb-4 top-0 z-30 w-full pt-[75px]">
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

      </SidebarInset>

      <div className="pl-12 col-span-3 relative min-h-[100vh] max-h-[100vh]">

        <div className="pt-8 flex flex-col w-full">
          <div className="flex gap-2 ml-auto mr-12">

            <ModeToggle />
            <NavSecondary items={navSecondary} />
          </div>
          <Separator className="my-2" />
          <div>
            {/* Add more here */}
            <NewBid />
          </div>
        </div>
      </div>
    </div>


  )
}
