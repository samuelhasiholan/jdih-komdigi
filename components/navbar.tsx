"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
  Home,
  Dokumen,
  Informasi,
  Translation,
  Statistik,
} from "@/components/icons";

export const Navbar = () => {
  const pathname = usePathname();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar
      maxWidth="full"
      position="sticky"
      className="top-auto bottom-0 fixed bg-menu p-2"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <ul className="flex gap-4 justify-around items-center w-full">
          <NavbarItem
            key="/"
            className={clsx(
              linkStyles({ color: "primary" }),
              "data-[active=true]:navbar-active",
            )}
            isActive={pathname === "/"}
          >
            <NextLink
              className="flex flex-col items-center navbar-btn"
              color="primary"
              href="/"
            >
              <Home color={pathname === "/" ? "#515978" : "#0257D9"} />
              Beranda
            </NextLink>
          </NavbarItem>
          <NavbarItem
            key="/dokumen"
            className={clsx(
              linkStyles({ color: "primary" }),
              "data-[active=true]:navbar-active",
            )}
            isActive={pathname === "/dokumen"}
          >
            <NextLink
              className="flex flex-col items-center navbar-btn"
              color="primary"
              href="/dokumen"
            >
              <Dokumen
                color={pathname === "/dokumen" ? "#515978" : "#0257D9"}
              />
              Dokumen
            </NextLink>
          </NavbarItem>
          <NavbarItem
            key="/informasi"
            className={clsx(
              linkStyles({ color: "primary" }),
              "data-[active=true]:navbar-active",
            )}
            isActive={pathname === "/informasi"}
          >
            <NextLink
              className="flex flex-col items-center navbar-btn"
              color="primary"
              href="/informasi"
            >
              <Informasi
                color={pathname === "/informasi" ? "#515978" : "#0257D9"}
              />
              Informasi
            </NextLink>
          </NavbarItem>
          <NavbarItem
            key="/translation"
            className={clsx(
              linkStyles({ color: "primary" }),
              "data-[active=true]:navbar-active",
            )}
            isActive={pathname === "/translation"}
          >
            <NextLink
              className="flex flex-col items-center navbar-btn"
              color="primary"
              href="/translation"
            >
              <Translation
                color={pathname === "/translation" ? "#515978" : "#0257D9"}
              />
              Translation
            </NextLink>
          </NavbarItem>
          <NavbarItem
            key="/statistik"
            className={clsx(
              linkStyles({ color: "primary" }),
              "data-[active=true]:navbar-active",
            )}
            isActive={pathname === "/statistik"}
          >
            <NextLink
              className="flex flex-col items-center navbar-btn"
              color="primary"
              href="/statistik"
            >
              <Statistik
                color={pathname === "/statistik" ? "#515978" : "#0257D9"}
              />
              Statistik
            </NextLink>
          </NavbarItem>
        </ul>
      </NavbarContent>

      {/*<NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>*/}
    </NextUINavbar>
  );
};
