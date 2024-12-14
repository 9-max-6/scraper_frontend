"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Bids",
      url: "/",
      icon: BookOpen,
      isActive: true,
    },
    {
      title: "History",
      url: "#",
      icon: Bot,
    },
    {
      title: "Donors",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
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
      icon: SquareTerminal,
    },
    {
      name: "FAQ",
      url: "#",
      icon: SquareTerminal,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" className="absolute border-r-2 border-r-gray-100 justify-center border-none main-container z-30 bg-background" {...props}>
      <SidebarContent className="bg-background">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
