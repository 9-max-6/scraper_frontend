import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { Suspense } from "react"
import CardWrapper from "./_components/card-wrapper"
import { CardWrapperFallback, OverviewFallback } from "./_components/fallbacks"
import OverviewGraph from "@/app/_components/overview-graph"
import BidDistribution, { BidDistributionFallback } from "./_components/bid-distribution"
import { getBidCountCapture, getBidCountEOI, getBidCountTender } from "@/db/queries/stats/revenue"
import BidPerformance from "./_components/bid-performance"
import NewToMITX from "./_components/new-to-mitx"
import Link from "next/link"
import { Button } from "@/components/ui/button"
/**
 * web vitals - before changing the structure of the page to
 * use suspense and lazy loading
 * FID - 
 * LCP - 2027
 */
/**
 * 
 * @returns 
 */
export default async function Page() {
  const eoiCount = await getBidCountEOI();
  const tenderCount = await getBidCountTender();
  const captureCount = await getBidCountCapture();

  if (!eoiCount || !tenderCount || !captureCount) {
    return (
      <div>
        Error!
      </div>
    )
  }

  const props = {
    eoiCount: Number(eoiCount[0].count),
    tenderCount: Number(tenderCount[0].count),
    captureCount: Number(captureCount[0].count),
  }
  return (
    <div className="grid dash_container overflow-scroll scrollbar-hide flex flex-col xl:grid-cols-12 gap-4 px-4 ">
      <div className="col-span-8 h-full">
        <div className="h-full min-h-full max-h-full  flex flex-col">
          <div className="">
            <div className="w-full h-full border-box min-h-full">
              <Suspense fallback={<CardWrapperFallback />}>
                <CardWrapper />
              </Suspense>
            </div>
          </div>

          <div>
            <Card className="shadow-none border-none">
              <CardHeader className="relative">
                <CardDescription>
                  Overview
                </CardDescription>
                <div className="absolute top-2 right-0">
                  <Link href="/bids">
                    <Button variant="link">
                      View all
                    </Button>
                  </Link>
                </div>
              </CardHeader>

            </Card>
          </div>
          <div className="flex-grow">
            <div className="h-full min-h-full w-full">

              <Suspense fallback={<OverviewFallback />}>
                <OverviewGraph />
              </Suspense>
            </div>
          </div>
        </div>
      </div >
      <div className="flex flex-basis flex-col gap-2 w-full xl:col-span-4 min-h-full h-full ">
        <div>
          <NewToMITX />
        </div>
        <div className="w-full">
          <Suspense fallback={<BidDistributionFallback />}>
            <BidDistribution props={props} />
          </Suspense>
        </div>
        <div className="">
          <BidPerformance />
        </div>


      </div>
    </div >
  )
}
