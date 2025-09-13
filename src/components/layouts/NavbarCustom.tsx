"use client";

import type { NavbarProps } from "@heroui/react";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Divider,
} from "@heroui/react";
import { cn } from "@heroui/react";

const menuItems = [
  {
    name: "Projects",
    href: "/project",
  },
  {
    name: "About me",
    href: "/",
  },
];

export default function NavbarCustom(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      {...props}
      classNames={{
        base: cn(
          "w-full relative z-10 bg-mateo-unique/80 backdrop-blur-md border-b border-mateo-primary/50 shadow-lg",
          {
            "bg-gradient-to-tr from-mateo-secondary/30 via-transparent to-mateo-primary/20 opacity-50":
              isMenuOpen,
          }
        ),
        wrapper: "w-full justify-center",
        item: "hidden md:flex",
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left Content */}
      <NavbarBrand>
        <Link href={`/`}>
          <span className="text-mateo-primary ml-2 font-bold tracking-widest">Mateo Mrozek</span>
        </Link>
      </NavbarBrand>

      {/* Center Content */}
      <NavbarContent justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              href={item.href}
              className={cn(
                "relative text-text-primary hover:text-mateo-primary transition-colors group"
              )}
              size="sm"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-mateo-primary transition-all group-hover:w-full"></span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Content */}
      <NavbarMenuToggle className="text-mateo-primary md:hidden" />

      <NavbarMenu className="bg-mateo-unique/90 shadow-lg top-[calc(var(--navbar-height)-1px)] max-h-fit pt-6 pb-6 backdrop-blur-md backdrop-saturate-150">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="text-text-primary mb-2 w-full hover:text-mateo-primary transition-colors"
              href={item.href}
              size="md"
            >
              {item.name}
            </Link>
            {index < menuItems.length - 1 && <Divider className="opacity-50" />}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
