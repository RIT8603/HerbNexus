"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Leaf, Menu, UserCircle, Hexagon, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function Navbar() {
  const { user, isAuthenticated, logout, isAtLeast } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/species", label: "Species Explorer" },
    { href: "/map", label: "Intelligence Map" },
    { href: "/about", label: "About Platform" },
  ];

  const getRoleLinks = () => {
    const links = [];
    if (isAtLeast("OBSERVER")) {
      links.push({ href: "/observations/new", label: "New Observation" });
      links.push({ href: "/observations", label: "My Data" });
    }
    if (isAtLeast("EXPERT")) links.push({ href: "/expert", label: "Expert Hub" });
    if (isAtLeast("RESEARCHER")) links.push({ href: "/research", label: "Research Tools" });
    if (isAtLeast("CONSERVATION_AUTHORITY")) links.push({ href: "/conservation", label: "Conservation" });
    if (isAtLeast("ADMIN")) links.push({ href: "/admin", label: "Admin" });
    return links;
  };

  const allLinks = [...publicLinks, ...getRoleLinks()];

  const renderNavLinks = (mobile = false) => (
    <>
      {allLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${
            mobile ? "block py-3 px-4 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-lg" : "text-sm font-medium relative group px-1 py-2"
          } transition-all duration-200 ${
            pathname === link.href ? "text-emerald-700 dark:text-emerald-400 font-semibold" : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
          }`}
        >
          {link.label}
          {!mobile && (
            <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-emerald-500 rounded-full transition-all duration-300 ${pathname === link.href ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}`} />
          )}
        </Link>
      ))}
    </>
  );

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-sm border-b border-slate-200/50 dark:border-slate-800/50 py-2" 
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <Sprout className="h-5 w-5" />
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              Herb<span className="text-emerald-600 dark:text-emerald-400">Nexus</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {renderNavLinks(false)}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <span className="relative h-9 w-9 rounded-full inline-flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer ring-1 ring-slate-200 dark:ring-slate-700">
                  <UserCircle className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2" align="end">
                <DropdownMenuLabel className="font-normal p-3">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-semibold leading-none">{user?.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    <div className="inline-flex mt-2 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-[10px] font-medium w-fit uppercase tracking-wider">
                      {user?.role}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer p-0">
                  <Link href="/profile" className="w-full h-full px-2 py-1.5 flex items-center">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950/50">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-2 py-2">
                Log in
              </Link>
              <Link href="/auth/register" className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-all shadow-sm h-9 px-5 bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-md hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger>
              <button className="md:hidden inline-flex items-center justify-center rounded-md h-10 w-10 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] border-l-slate-200 dark:border-l-slate-800">
              <div className="flex flex-col h-full">
                <Link href="/" className="flex items-center space-x-2.5 mb-8 mt-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <span className="font-outfit font-bold text-xl tracking-tight">HerbNexus</span>
                </Link>
                <nav className="flex flex-col space-y-1 flex-1">
                  {renderNavLinks(true)}
                </nav>
                {!isAuthenticated && (
                  <div className="flex flex-col gap-3 mt-auto pb-8">
                    <Link href="/auth/login" className="inline-flex items-center justify-center rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 h-11 px-4 w-full transition-colors">
                      Log in
                    </Link>
                    <Link href="/auth/register" className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-11 px-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white transition-colors">
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

