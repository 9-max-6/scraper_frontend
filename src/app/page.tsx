import { AppSidebar } from "@/components/app-sidebar"
import NewBid from "@/components/new-bid"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative">
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="flex flex-col gap-2">
              <div>
                Filters
              </div>

            </div>
          </div>
        </div>

        <div className="absolute bottom-2 right-2">
          {/* The plus icon */}
          <NewBid />
        </div>
      </SidebarInset>

    </SidebarProvider>
  )
}
