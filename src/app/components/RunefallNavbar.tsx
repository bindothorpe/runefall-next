"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { lexend } from "@/app/fonts";
import NavbarSeparator from "./NavbarSeparator";
import { Home } from "./icons/Home";
import Link from "next/link";

export default function RunefallNavbar() {
  var pathname = usePathname();

  console.log(`Pathname: ${pathname}`);

  React.useEffect(() => {
    if (pathname === "/") {
      pathname = "";
    }
  }, [pathname]);

  return (
    <div className={`w-full pt-6 px-6 fixed z-100 ${lexend.className}`}>
      <header className="relative w-full max-w-screen-2xl mx-auto">
        {/* Content */}
        <div className="relative bg-card rounded-xs overflow-hidden inset-ring-2 inset-ring-border shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-101 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:top-0 before:left-0 before:-rotate-180 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-101 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:top-0 after:right-0 after:-rotate-90" />
          <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-101 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:bottom-0 before:left-0 before:rotate-90 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-101 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:bottom-0 after:right-0 -after:rotate-180" />
          <div className="flex h-11 items-center justify-between">
            {/* Left side - Navigation */}
            <nav className="flex items-center gap-8">
              {/* Nav Links */}
              <NavigationMenu className="pl-6">
                <NavigationMenuList className="gap-4">
                  <NavigationMenuItem>
                    {/* Home Icon */}
                    <Link href={"/"}>
                      <Button
                        variant="hytale-link"
                        size="icon"
                        data-current={pathname === "/" ? "true" : undefined}
                      >
                        <Home className="h-5 w-5" />
                      </Button>
                    </Link>
                  </NavigationMenuItem>
                  {/* Seperator */}
                  <NavbarSeparator hight="h-10" />
                  <NavigationMenuItem>
                    <Button
                      variant="hytale-link"
                      data-current={pathname === "/games" ? "true" : undefined}
                    >
                      GAMES
                    </Button>
                  </NavigationMenuItem>
                  {/* Seperator */}
                  <NavbarSeparator hight="h-10" />
                  <NavigationMenuItem>
                    <Link href={"/products"}>
                      <Button
                        variant="hytale-link"
                        data-current={
                          pathname === "/products" ? "true" : undefined
                        }
                      >
                        STORE
                      </Button>
                    </Link>
                  </NavigationMenuItem>
                  {/* Seperator */}
                  <NavbarSeparator hight="h-10" />
                  <NavigationMenuItem>
                    <Link href={"/"}>
                      <Button
                        variant="hytale-link"
                        data-current={
                          pathname === "/support" ? "true" : undefined
                        }
                      >
                        SUPPORT
                      </Button>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Right side - Actions */}
            <div className="flex items-center gap-6 px-1.5">
              <Link href={"/dashboard"}>
                <Button
                  variant="hytale-link"
                  data-current={pathname === "/dashboard" ? "true" : undefined}
                >
                  ACCOUNT
                </Button>
              </Link>
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
