import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { Button } from "./ui/button"

export function NavSecondary({ items }) {
  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <div key={item.title}>
          <Button
            variant="outline"
            size="icon"
            aria-label="Settings"
          >
            {<item.icon />}
          </Button>
        </div>
      ))}
    </div>
  )
}
