import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Capabilities from "./cap-tab"
import Competitiveness from "./comp-tab"
import Risk from "./risk-tab"
import { DataTabProps } from "@/types/types"

export default function DrawerTabs({ props }: { props: DataTabProps }) {
    return (
        <Tabs defaultValue="cap" className="p-8">
            <TabsList className="grid sticky z-20 top-0 grid-cols-3">
                {/* <TabsTrigger value="overview">Overview</TabsTrigger> */}
                <TabsTrigger value="cap">Capabilities</TabsTrigger>
                <TabsTrigger value="comp">Competitiveness</TabsTrigger>
                <TabsTrigger value="risk">Risk</TabsTrigger>
            </TabsList>
            <TabsContent value="cap" className="z-0">
                <Capabilities props={props} />
            </TabsContent>
            <TabsContent value="comp">
                <Competitiveness props={props} />
            </TabsContent>

            <TabsContent value="risk">
                <Risk props={props} />
            </TabsContent>
        </Tabs>
    )
}
