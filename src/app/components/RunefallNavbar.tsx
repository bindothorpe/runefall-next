"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Home } from "lucide-react";
import { lexend } from "@/app/fonts";

export default function RunefallNavbar() {
  return (
    <div className={`w-full pt-6 px-6 fixed z-100 ${lexend.className}`}>
      <header className="relative w-full max-w-screen-2xl mx-auto">
        {/* Content */}
        <div className="relative bg-card rounded-xs overflow-hidden inset-ring-2 inset-ring-border">
          <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-101 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:top-0 before:left-0 before:-rotate-180 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-101 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:top-0 after:right-0 after:-rotate-90" />
          <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-101 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:bottom-0 before:left-0 before:rotate-90 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-101 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:bottom-0 after:right-0 -after:rotate-180" />
          <div className="flex h-11 items-center justify-between">
            {/* Left side - Navigation */}
            <nav className="flex items-center gap-8">
              {/* Home Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-400 hover:text-purple-300 hover:bg-transparent"
              >
                <Home className="h-5 w-5" />
              </Button>

              {/* Nav Links */}
              <NavigationMenu>
                <NavigationMenuList className="gap-8">
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      className="text-white font-semibold text-sm tracking-wide hover:text-purple-300 hover:bg-transparent uppercase"
                    >
                      GAMES
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      className="text-white font-semibold text-sm tracking-wide hover:text-purple-300 hover:bg-transparent uppercase"
                    >
                      STORE
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      className="text-white font-semibold text-sm tracking-wide hover:text-purple-300 hover:bg-transparent uppercase"
                    >
                      SUPPORT
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Right side - Actions */}
            <div className="flex items-center gap-6 px-1.5">
              <Button
                variant="ghost"
                className="text-white font-semibold text-sm tracking-wide hover:text-purple-300 hover:bg-transparent uppercase"
              >
                ACCOUNT
              </Button>
              <Button variant={"hytale"} size={"sm"} className="h-8">
                PLAY NOW
              </Button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
