import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button"
import DataTab from "./data-tab"
import Capabilities from "./cap-tab"
import Competitiveness from "./comp-tab"
import Commercials from "./comm-tab"
import Risk from "./risk-tab"
export function CustomTabs() {
    return (
        <Tabs defaultValue="data" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="data">Data sheet</TabsTrigger>
                <TabsTrigger value="cap">Capabilities</TabsTrigger>
                <TabsTrigger value="comp">Competitiveness</TabsTrigger>
                <TabsTrigger value="comm">Commercials</TabsTrigger>
                <TabsTrigger value="risk">Risk</TabsTrigger>
            </TabsList>
            <TabsContent value="data">
                <DataTab />
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
