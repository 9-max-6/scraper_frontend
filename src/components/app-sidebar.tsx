"use client"

import * as React from "react"
import {
  AudioWaveform,
  BadgeDollarSign,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  HandHeart,
  Lightbulb,
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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      name: "Bids",
      url: "#",
      icon: BadgeDollarSign,
    },
    {
      name: "Donors",
      url: "#",
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
      url: "#",
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
  return (
    <Sidebar className="bg-background py-2" collapsible="icon" {...props}>
      <SidebarHeader className="pb-2 bg-background text-center">
        <Image
          src={`/dt-${theme}.svg`}
          alt="Logo"
          width={120}
          height={40}
          className={!open ? "hidden" : ""}
        />
      </SidebarHeader>
      <SidebarContent className="bg-background">
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
