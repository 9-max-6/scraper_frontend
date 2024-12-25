"use client"
import { LucideIcon } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"

export function NavTertiary({
    items,
}: {
    items: {
        name: string
        url: string
        icon: LucideIcon
    }[]
}) {
    // const { isMobile } = useSidebar()
    const pathname = usePathname();

    return (
        <SidebarGroup >
            <SidebarGroupLabel></SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                            <Link href={item.url} className={clsx(
                                "hover:text-blue-600",
                                {
                                    "text-blue-500": pathname === item.url,
                                }
                            )}>
                                <item.icon />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}

            </SidebarMenu>
        </SidebarGroup>
    )
}
