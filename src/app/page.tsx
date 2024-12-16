import NewBid from "@/components/new-bid"
import Bids from "@/components/bids"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SearchBar from "@/components/search-bar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Stats } from "node:fs"
import StatsThree from "@/components/stats-three"
import StatsTwo from "@/components/stats-two"
import StatsFour from "@/components/stats-fours"
import StatsOne from "@/components/stats-one"


export default function Page() {
  return (
    <div className="grid dash_container grid-cols-12 mx-4 gap-4 pt-0">
      <Card className="col-span-8 flex flex-col gap-4 shadow-none border-none  min-h-full h-full">

        <div className="grid grid-cols-4 gap-4">

          <StatsTwo />
          <StatsTwo />
          <StatsTwo />
          <StatsTwo />
        </div>
        <div className="aspect-video">
          <Card className=" shadow-none mx-2 mb-2 border-none">
            <CardDescription>
              Overview
            </CardDescription>
          </Card>
          <StatsThree />

        </div>
      </Card>
      <Card className=" border-none shadow-none  flex flex-col gap-2 col-span-4 min-h-full h-full overflow-scroll scrollbar-hide">
        <div>
          <StatsThree />
        </div>
        <div>
          <StatsThree />
        </div>

      </Card>
    </div>
  )
}
