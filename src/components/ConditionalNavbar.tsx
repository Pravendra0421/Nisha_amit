'use client';

import { usePathname } from "next/navigation";
import { NavbarDemo } from "@/components/widget/Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();

  const shouldHideNavbar = pathname.startsWith("/admin");

  if (shouldHideNavbar) return null;

  return <NavbarDemo />;
}
