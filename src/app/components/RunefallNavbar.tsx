"use client";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { Menu, X } from "lucide-react";
import Image from "next/image";
import CustomSeparator from "./CustomSeparator";
import { useSession } from "next-auth/react";
import { isFeatureEnabled } from "@/lib/featureFlags";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { Page, pages } from "@/models/pages";

export default function RunefallNavbar() {
  const { data: session } = useSession();
  var pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { setScrollTarget } = useScrollToSection();

  React.useEffect(() => {
    if (pathname === "/") {
      pathname = "";
    }
  }, [pathname]);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`w-full pt-6 px-6 fixed z-100 ${lexend.className}`}>
      <header
        className="relative w-full max-w-screen-2xl mx-auto"
        ref={menuRef}
      >
        {/* Content */}
        <div className="relative bg-card rounded-xs inset-ring-2 inset-ring-border shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-101 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:top-0 before:left-0 before:-rotate-180 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-101 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:top-0 after:right-0 after:-rotate-90" />
          <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-101 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:bottom-0 before:left-0 before:rotate-90 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-101 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:bottom-0 after:right-0 -after:rotate-180" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex h-11 items-center justify-between">
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
                  {pages.map((page: Page) => {
                    if (
                      page.featureFlag &&
                      !isFeatureEnabled(page.featureFlag)
                    ) {
                      return null;
                    }
                    return (
                      <React.Fragment key={page.label}>
                        <NavbarSeparator height="h-8!" />
                        <NavigationMenuItem>
                          <Link href={page.navigationUrl}>
                            <Button
                              variant="hytale-link"
                              data-current={
                                pathname === page.navigationUrl
                                  ? "true"
                                  : undefined
                              }
                            >
                              {page.label}
                            </Button>
                          </Link>
                        </NavigationMenuItem>
                      </React.Fragment>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Right side - Actions */}
            <div className="flex items-center gap-6 px-1.5">
              <Link href={session ? "/account" : "/signin"}>
                <Button
                  variant="hytale-link"
                  data-current={pathname === "/account" ? "true" : undefined}
                >
                  {session ? "ACCOUNT" : "SIGN IN"}
                </Button>
              </Link>
              <Button
                variant={"hytale"}
                size={"sm"}
                className="h-8"
                onClick={() => {
                  setScrollTarget("server-ip", "/");
                }}
              >
                PLAY NOW
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            {/* Mobile Header */}
            <div className="flex h-11 items-center justify-between pl-4 pr-1.5 relative">
              <Button
                variant="hytale-link"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>

              <Image
                src="/images/branding/icon.png"
                width={640}
                height={640}
                alt="Runefall logo small"
                className="absolute left-1/2 -translate-x-1/2 -top-3 z-101 h-18 w-auto"
              />

              <Button
                variant={"hytale"}
                size={"sm"}
                className="h-8"
                onClick={() => {
                  setScrollTarget("server-ip", "/");
                }}
              >
                PLAY NOW
              </Button>
            </div>

            {/* Mobile Menu - Expandable */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <nav className="flex flex-col py-4 px-6 gap-2">
                <CustomSeparator className="mt-4" />
                <Link href={"/"} onClick={handleNavClick}>
                  <Button
                    variant="hytale-link"
                    className="w-full justify-center"
                  >
                    HOME
                  </Button>
                </Link>

                {pages.map((page: Page) => {
                  if (page.featureFlag && !isFeatureEnabled(page.featureFlag)) {
                    return null;
                  }
                  return (
                    <Link
                      key={page.label}
                      href={page.navigationUrl}
                      onClick={handleNavClick}
                    >
                      <Button
                        variant="hytale-link"
                        className="w-full justify-center"
                      >
                        {page.label}
                      </Button>
                    </Link>
                  );
                })}

                <CustomSeparator />
                <Link
                  href={session ? "/account" : "/signin"}
                  onClick={handleNavClick}
                >
                  <Button
                    variant="hytale-link"
                    className="w-full justify-center"
                  >
                    {session ? "ACCOUNT" : "SIGN IN"}
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
