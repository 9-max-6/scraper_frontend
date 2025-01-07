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
import { usePathname } from "next/navigation"
import clsx from "clsx"

export function NavMain({
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
    <SidebarGroup>
      <SidebarGroupLabel>Profiler</SidebarGroupLabel>
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
        <SidebarMenuItem>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
