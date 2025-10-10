"use client"

import React, { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
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
  cn,
} from "@heroui/react"
import type { NavbarProps } from "@heroui/react"
import { Icon } from "@iconify/react"
import { useAuthStore } from "@/store/auth.store"
import { signOutFunc } from "@/actions/sign-out"
import LoginnModal from "../modals/login.modal"
import RegistrationModal from "../modals/registration.modal"
import { siteConfig } from "@/config/site.config"

const Header = (props: NavbarProps) => {
  const router = useRouter()
  const menu = siteConfig.menu
  const { isAuth, session, status, setAuthState } = useAuthStore()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

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

  const NavBarMenuItems = () => {
    return menu.map((item, index) => (
      <NavbarMenuItem key={item.href}>
        <Link 
          className="text-default-500 mb-2 w-full" 
          href={item.href}
          onClick={() => setIsMenuOpen(false)}
        >
          {item.label}
        </Link>
        {index < menu.length - 1 && <Divider className="opacity-50" />}
      </NavbarMenuItem>
    ))
  }

  return (
    <Navbar
      {...props}
      classNames={{
        base: cn("border-default-100 h-[65px] md:h-[100px]", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
        }),
        wrapper: "w-full justify-between",
        item: "hidden md:flex"
      }}
      style={{position: "fixed"}}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left Content */}
      <Link 
        href="/"
        onClick={() => setIsMenuOpen(false)}
      >
        <NavbarBrand>
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
            <Button 
              isLoading 
              radius="full" 
              variant="light"
            >
              Загрузка...
            </Button> 
            : 
            !isAuth ? (
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
                  className="font-medium"
                  color="primary"
                  radius="full"
                  endContent={<Icon icon="solar:alt-arrow-right-linear" />}
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
                  onPress={() => router.push("/account")}
                >
                  {session?.user?.name}
                </Button>
                <Button
                  className="font-medium"
                  color="primary"
                  radius="full"
                  endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                  onPress={handleSignOut}
                >
                  Выйти
                </Button>
              </>
            )
          }
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Version */}
      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu className="bg-default-200/50 shadow-medium dark:bg-default-100/50 top-[calc(var(--navbar-height)-1px)] max-h-fit pt-6 pb-6 backdrop-blur-md backdrop-saturate-150">
        {status === "loading" ?
          <CircularProgress 
            aria-label="Загрузка..." 
            label="Загрузка..." 
            color="warning" 
            size="sm" 
          /> 
          : !isAuth ? (
            <>
              <NavbarMenuItem>
                <Button 
                  fullWidth 
                  variant="faded"
                  onPress={() => {
                    setIsMenuOpen(false)
                    setIsLoginOpen(true)
                  }}
                >
                  Войти
                </Button>
              </NavbarMenuItem>
              <NavbarMenuItem className="mb-4">
                <Button 
                  fullWidth 
                  color="primary"
                  onPress={() => {
                    setIsMenuOpen(false)
                    setIsRegistrationOpen(true)
                  }}
                >
                  Зарегистрироваться
                </Button>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem>
                <Link 
                  href="/account"
                  onClick={() => setIsMenuOpen(false)}
                >
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
                  color="primary"
                  onPress={handleSignOut}
                >
                  Выйти
                </Button>
              </NavbarMenuItem>
            </>
          )
        }
        {NavBarMenuItems()}
      </NavbarMenu>

      <LoginnModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setIsRegistrationOpen={() => setIsRegistrationOpen(true)}
      />
      
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        setIsLoginOpen={() => setIsLoginOpen(true)}
      />
    </Navbar>
  )
}

export default Header