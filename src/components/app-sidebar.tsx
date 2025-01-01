"use client"

import * as React from "react"
import {
  BadgeDollarSign,
  HeartHandshake,
  Home,
  Lightbulb,
  PieChart,
  Settings2,
  SmilePlus,
} from "lucide-react"
import { useTheme } from "next-themes"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { NavTertiary } from "./nav-tertiary"
import clsx from "clsx"
import { Separator } from "./ui/separator"

// This is sample data.
const data = {
  user: {
    name: "Ahmed Juma",
    email: "ahmed.juma@dt-global.com",
    avatar: "/avatars/shadcn.jpg",
  },
  dash: [{
    name: "Home",
    url: "/",
    icon: Home
  }],
  navMain: [
    {
      name: "Bids",
      url: "/bids",
      icon: BadgeDollarSign,
    },
    {
      name: "Donors",
      url: "/donors",
      icon: HeartHandshake,
    },
    {
      name: "Knowledge",
      url: "/knowledge",
      icon: Lightbulb,
    },
  ],
  projects: [

    {
      name: "Opportunities",
      url: "/opportunities",
      icon: SmilePlus,
    },
    {
      name: "Playground",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar()
  const { theme } = useTheme()

  const getLogo = () => {
    if (theme) {
      return theme
    } else {
      return "light"
    }
  }

  return (
    <Sidebar className="bg-background py-4" collapsible="icon" {...props}>
      <SidebarHeader className={
        clsx(
          "pb-2 bg-background text-center",
          { "pl-12": open }
        )
      }>
        <Image
          src={`/dt-${getLogo()}.svg`}
          alt="Logo"
          width={120}
          height={40}
          className={!open ? "hidden" : ""}
        />
      </SidebarHeader>
      <Separator />
      <SidebarContent className={clsx(
        "bg-background",
        { "pl-12": open }
      )}>
        <NavTertiary items={data.dash} />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
