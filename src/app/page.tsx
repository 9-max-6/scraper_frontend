import { AppSidebar } from "@/components/app-sidebar"
import NewBid from "@/components/new-bid"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import Filters from "@/components/Filters"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Bids from "@/components/bids"
import ModeToggle from "@/components/toggle-mode"
import { NavSecondary } from "@/components/nav-secondary"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


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
    <SidebarProvider>
      <div className="grid grid-cols-12">
        <div className="col-span-3 relative">
          <AppSidebar />
        </div>
        <SidebarInset className="ml-6 z-20 col-span-6 overflow-scroll relative scrollbar-hide h-[100vh]">
          <header className="flex z-30 h-16 shrink-0 items-center gap-2">
          </header>
          <div className="sticky top-0 z-30 w-full my-4">
            <Card className="w-full shadow-none rounded-none border-l-4 border-r-4 border-l-blue-500 border-r-blue-500">
              <CardHeader>
                <CardTitle>
                  Search results
                </CardTitle>
                <CardDescription>
                  Check out the latest bids
                </CardDescription>
              </CardHeader>
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
              <Filters />
              {/* Add more here */}
              <NewBid />
            </div>
          </div>
        </div>
      </div>


    </SidebarProvider>
  )
}
