"use client"

import * as React from "react"
import {
  AudioWaveform,
  BadgeDollarSign,
  BookOpen,
  Bot,
  ChartColumn,
  Command,
  Frame,
  GalleryVerticalEnd,
  HandHeart,
  Home,
  Lightbulb,
  LucideGitGraph,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
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
import { url } from "inspector"
import { NavTertiary } from "./nav-tertiary"

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
      icon: HandHeart,
    },
    {
      name: "Knowledge",
      url: "#",
      icon: Lightbulb,
    },
  ],
  projects: [

    {
      name: "Opportunities",
      url: "/opportunities",
      icon: Frame,
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
    <Sidebar className="bg-background py-2 pl-12" collapsible="icon" {...props}>
      <SidebarHeader className="pb-2 bg-background text-center">
        <Image
          src={`/dt-${getLogo()}.svg`}
          alt="Logo"
          width={120}
          height={40}
          className={!open ? "hidden" : ""}
        />
      </SidebarHeader>
      <SidebarContent className="bg-background">
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
