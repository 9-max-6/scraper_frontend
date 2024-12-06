"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <Sun
                className={`h-[1.2rem] w-[1.2rem] transition-transform ${theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
                    }`}
            />
            <Moon
                className={`absolute h-[1.2rem] w-[1.2rem] transition-transform ${theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                    }`}
            />
        </Button>
    );
}
