"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { onAuthStateChanged,signOut,User } from "firebase/auth";
import { useState,useEffect } from "react";
export function NavbarDemo() {
    const { t } = useLanguage();
  const navItems = [
    {
      name: t("home"),
      link: "/",
    },
    {
      name: t("Events"),
      link: "/events",
    },
    {
      name: t("ourStory"),
      link: "/ourStory",
    },
    {
      name:t("gallery"),
      link:"/gallery"
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser,setCurrentUser] = useState<User |null>(null);
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      setCurrentUser(user);
    });
    return ()=>unsubscribe();
  },[]);
  const router = useRouter();
  const handleLoginClick = () => {
    // Close the mobile menu (good for UX)
    setIsMobileMenuOpen(false); 
    
    // Navigate to the login page
    router.push('/login'); 
};
const handleLogout=async()=>{
  setIsMobileMenuOpen(false);
  try {
    await signOut(auth);
    router.push('/login');
  } catch (error) {
    console.error("Logout Error:", error);
    alert("Failed to log out. Please try again.");
  }
}
  const handleBookSangeetClick = () => {
    // Close the mobile menu (good for UX)
    setIsMobileMenuOpen(false); 
    
    if (currentUser) {
      router.push('/book-sangeet');
    } else {
      router.push('/login');
    }
};
  return (
    <div className="fixed top-0 left-0 w-full z-50  shadow-sm">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems className="font-bold text-black" items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              onClick={currentUser ? handleLogout : handleLoginClick}
              variant="secondary"
            >
              {currentUser ? t('logout') : t('login')}
            </NavbarButton>
            <NavbarButton onClick={handleBookSangeetClick} variant="primary">{t('book_a_Sangeet')}</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={currentUser ? handleLogout : handleLoginClick}
                variant="primary"
                className="w-full"
              >
                {currentUser ? t('logout') : t('login')}
              </NavbarButton>
              <NavbarButton
                onClick={handleBookSangeetClick}
                variant="primary"
                className="w-full"
              >
                {t('book_a_Sangeet')}
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
