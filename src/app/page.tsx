import NewBid from "@/components/new-bid"
import Bids from "@/components/bids"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SearchBar from "@/components/search-bar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Stats } from "node:fs"
import StatsThree from "@/components/stats-three"
import StatsTwo from "@/components/stats-two"
import StatsFour from "@/components/stats-fours"
import StatsOne from "@/components/stats-one"


export default function Page() {
  return (
    <div className="flex dash-container mx-4 flex-1 flex-col gap-4 pt-0">
      <div className="grid auto-rows-min gap-4 w-full grid-cols-12">
        <div className="col-span-10 flex flex-wrap gap-4">
          <div className=" rounded-xl bg-muted/50">
            <StatsTwo />
          </div>
          <div className=" rounded-xl bg-muted/50">
            <StatsTwo />
          </div>
          <div className=" rounded-xl bg-muted/50">
            <StatsTwo />
          </div>
          <div className=" rounded-xl bg-muted/50">
            <StatsTwo />
          </div>
        </div>

        <div className=" col-span-2 h-full rounded-xl bg-muted/50">
          <StatsThree />
        </div>
      </div>
      {/* <div className="flex gap-4 col-span-3">
        <div className="flex-1 rounded-xl bg-muted/50">
          <StatsFour />
        </div>
        <div className="flex-1 rounded-xl bg-muted/50">
          <StatsFour />
        </div>
      </div> */}

    </div>
  )
}
