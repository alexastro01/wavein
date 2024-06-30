"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";

import { LogoIcon } from "./Icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/create-wavein",
    label: "Create Wavein",
  },
  {
    href: "/dashboard",
    label: "Freelancer Dashboard",
  },

];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
    <div className="max-w-screen mx-auto h-14 px-4 flex justify-between items-center mx-2">
      {/* Left side of the Navbar */}
      <div className="flex items-center">
        <a
          rel="noreferrer noopener"
          href="/"
          className="font-bold text-xl flex items-center"
        >
          <LogoIcon  /> {/* Adjust size as needed */}
          WaveIn
        </a>

        {/* Desktop navigation links */}
        <nav className="hidden md:flex gap-2 ml-6">
          {routeList.map((route: RouteProps, i) => (
            <a
              key={i}
              href={route.href}
              className={buttonVariants({ variant: "ghost" })}
            >
              {route.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Right side of the Navbar */}
      <div className="flex items-center">
        {/* Mobile menu button */}
        <span className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="px-2">
              <Menu
                className="flex md:hidden h-5 w-5"
                onClick={() => setIsOpen(true)}
              >
                <span className="sr-only">Menu Icon</span>
              </Menu>
            </SheetTrigger>

            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle className="font-bold text-xl">
                  WaveIn
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col justify-center gap-2 mt-4">
                {routeList.map(({ href, label }: RouteProps) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="text-[17px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                ))}
                {/* Additional link */}
                <a
                  rel="noreferrer noopener"
                  href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                  target="_blank"
                  className="w-[110px] border text-center py-1 px-2 rounded-md font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <GitHubLogoIcon className="w-5 h-5 mr-1" />
                  Github
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </span>

        {/* ConnectButton */}
        <div className="hidden md:flex gap-2">
          <ConnectButton /> {/* Assuming ConnectButton is correctly defined */}
        </div>
      </div>
    </div>
  </header>
  );
};