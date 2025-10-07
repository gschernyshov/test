"use client"

import React from "react"
import type { SVGProps } from "react"
import { redirect, usePathname } from "next/navigation"
import Link from 'next/link'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Divider,
  CircularProgress,
} from "@heroui/react"
import { cn } from "@heroui/react"
import type { NavbarProps } from "@heroui/react"
import { Icon } from "@iconify/react"

import { useAuthStore } from "@/store/auth.store"
import { signOutFunc } from "@/actions/sign-out"

import LoginnModal from "../modals/login.modal"
import RegistrationModal from "../modals/registration.modal"
import { siteConfig } from "@/config/site.config"

type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

const AcmeIcon: React.FC<IconSvgProps> = ({size = 32, width, height, ...props}) => (
  <svg fill="none" height={size || height} viewBox="0 0 32 32" width={size || width} {...props}>
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

const Header = (props: NavbarProps) => {
  const menu = siteConfig.menu
  const { isAuth, session, status, setAuthState } = useAuthStore()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isLoginOpen, setIsLoginOpen] = React.useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = React.useState(false)

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      // console.error("При выходе из системы возникла ошибка: ", error)
    }
    setAuthState("unauthenticated", null)
  }

  const NavBarItems = () => {
    return (
      menu.map((item) => {
        const isActive = pathname === item.href
        return (
          <NavbarItem key={item.href}>
            <Link 
              className={`${isActive ? "text-neutral-950" : "text-default-500"}`} 
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        )
      })
    )
  }   

  return (
    <Navbar
      {...props}
      classNames={{
        base: cn("border-default-100", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
        }),
        wrapper: "w-full justify-center",
        item: "hidden md:flex"
      }}
      style={{position: "fixed"}}
      height="100px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left Content */}
      <Link href="/">
        <NavbarBrand>
          {/*<div className="bg-foreground text-background rounded-full">
            <AcmeIcon size={34} />
          </div>*/}
          <span className="text-medium ml-2 font-medium font-nunito">WhiskersTails</span>
        </NavbarBrand>
      </Link>

      {/* Center Content */}
      <NavbarContent justify="center">
        {NavBarItems()}
      </NavbarContent>

      {/* Right Content */}
      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem className="ml-2 flex! gap-2">
          {status === "loading" ? 
          <Button isLoading radius="full" variant="light">Загрузка...</Button> 
          : !isAuth ? 
          (
            <>
              <Button 
                className="text-default-500" 
                radius="full" 
                variant="light" 
                onPress={() => setIsLoginOpen(true)}
              >
                Войти
              </Button>
              <Button
                className="bg-foreground text-background font-medium"
                color="secondary"
                endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                radius="full"
                variant="flat"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Зарегистрироваться
              </Button>
            </>
          ) : (
            <>
                <Button 
                  className="text-default-500" 
                  radius="full" 
                  variant="light" 
                  onPress={() => redirect("/account")}
                >
                  {session?.user?.name}
                </Button>
              <Button
                className="bg-foreground text-background font-medium"
                color="secondary"
                endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                radius="full"
                variant="flat"
                onPress={handleSignOut}
              >
                Выйти
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Version */}
      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu className="bg-default-200/50 shadow-medium dark:bg-default-100/50 top-[calc(var(--navbar-height)-1px)] max-h-fit pt-6 pb-6 backdrop-blur-md backdrop-saturate-150">
        {status === "loading" ? 
        ( <CircularProgress aria-label="Загрузка..." label="Загрузка..." color="warning" size="sm" /> ) 
        : !isAuth ? 
        (
          <>
            <NavbarMenuItem>
              <Button 
                fullWidth 
                variant="faded"
                onPress={() => setIsLoginOpen(true)}
              >
                Войти
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem className="mb-4">
              <Button 
                fullWidth 
                className="bg-foreground text-background" 
                onPress={() => setIsRegistrationOpen(true)}
              >
                Зарегистрироваться
              </Button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Link href="/account">
                <Button 
                  fullWidth 
                  variant="faded"
                >
                {session?.user?.name}
                </Button>
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem className="mb-4">
              <Button 
                fullWidth 
                className="bg-foreground text-background" 
                onPress={handleSignOut}
              >
                Выйти
              </Button>
            </NavbarMenuItem>
          </>
        )}
        {menu.map((item, index) => (
          <NavbarMenuItem key={item.href}>
            <Link className="text-default-500 mb-2 w-full" href={item.href}>
              {item.label}
            </Link>
            {index < menu.length - 1 && <Divider className="opacity-50" />}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <LoginnModal
       isOpen={isLoginOpen}
       onClose={() => setIsLoginOpen(false)}
      />
      
      <RegistrationModal
       isOpen={isRegistrationOpen}
       onClose={() => setIsRegistrationOpen(false)}
      />
    </Navbar>
  )
}

export default Header