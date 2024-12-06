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
import Overview from "./overview-tab"
import DataTab from "./data-tab"
import { DataTabProps } from "@/types/types"

export default function DrawerTabs({ props }: { props: DataTabProps }) {
    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid top-5 w-full grid-cols-5">
                <TabsTrigger value="overview">Datasheet</TabsTrigger>
                <TabsTrigger value="cap">Capabilities</TabsTrigger>
                <TabsTrigger value="comp">Competitiveness</TabsTrigger>
                <TabsTrigger value="comm">Commercials</TabsTrigger>
                <TabsTrigger value="risk">Risk</TabsTrigger>
            </TabsList>
            <TabsContent className="overflow-scroll " value="overview">
                <DataTab {...props} />
            </TabsContent>
            <TabsContent value="cap">
                <Capabilities />
            </TabsContent>
            <TabsContent value="comp">
                <Competitiveness />
            </TabsContent>
            <TabsContent value="comm">
                <Commercials />
            </TabsContent>
            <TabsContent value="risk">
                <Risk />
            </TabsContent>
        </Tabs>
    )
}
