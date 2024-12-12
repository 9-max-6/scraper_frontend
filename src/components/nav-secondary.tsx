import * as React from "react"
import { Button } from "./ui/button"

export function NavSecondary({ items }: { items: { title: string; icon: React.ElementType }[] }) {
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
