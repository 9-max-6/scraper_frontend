"use client"

import * as React from "react"
import Image from 'next/image'
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
  SidebarMenu,
  SidebarMenuItem,
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
    <Sidebar variant="sidebar" className="items-center border-none ml-36 bg-background" {...props}>
      <SidebarMenu >
        <SidebarMenuItem className="bg-background">
          <Image
            src="/dt.png"
            layout="responsive" // Reference the image from the public directory
            height={100}// Original height of the imag
            width={100}
            alt="DT Global Logo"
          />

        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarContent className="pl-6 bg-background">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="pl-6 bg-background h-[1/8]">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
