import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Capabilities from "./cap-tab"
import Competitiveness from "./comp-tab"
import Commercials from "./comm-tab"
import Risk from "./risk-tab"
import { DataTabProps } from "@/types/types"
import Overview from "./overview-tab"

export default function DrawerTabs({ props }: { props: DataTabProps }) {
    return (
        <Tabs defaultValue="overview" className="p-8">
            <TabsList className="grid sticky z-20 top-0 grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cap">Capabilities</TabsTrigger>
                <TabsTrigger value="comp">Competitiveness</TabsTrigger>
                <TabsTrigger value="comm">Commercials</TabsTrigger>
                <TabsTrigger value="risk">Risk</TabsTrigger>
            </TabsList>
            <TabsContent value="cap" className="z-0">
                <Capabilities props={props} />
            </TabsContent>
            <TabsContent value="overview">
                <Overview props={props} />
            </TabsContent>
            <TabsContent value="comp">
                <Competitiveness props={props} />
            </TabsContent>
            <TabsContent value="comm">
                <Commercials props={props} />
            </TabsContent>
            <TabsContent value="risk">
                <Risk props={props} />
            </TabsContent>
        </Tabs>
    )
}
