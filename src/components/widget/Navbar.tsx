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
import { useRouter,usePathname } from "next/navigation";
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
  const publicPages = [
    '/', 
    '/events', 
    '/events/phere', 
    '/events/sangeet', 
    '/events/vidai', 
    '/events/lagun', 
    '/events/mehandi', 
    '/events/haldi', 
    '/ourStory', 
    '/gallery', 
    '/login', 
    '/signup', 
    '/forgot-password',
    '/Photographer'
  ];
  const authPages = ['/login', '/signup', '/forgot-password'];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      setCurrentUser(user);
    });
    return ()=>unsubscribe();
  },[]);
  useEffect(()=>{
    if(currentUser === undefined){
      return
    }
    if(currentUser == null){
      const isPublicPage = publicPages.includes(pathname);
      const isDynamicPublicPage = pathname.startsWith('/gallery/');
      if (!isPublicPage && !isDynamicPublicPage) {
        router.push('/login');
      }
    }else{
      if(authPages.includes(pathname)){
        router.push('/book-sangeet');
      }
    }
  },[currentUser,pathname,router,publicPages,authPages]);
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
if (currentUser === undefined) {
    return <div>Loading...</div>
  }
  return (
    <div className="fixed top-0 left-0 w-full z-50  shadow-sm">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems className="font-bold text-black mr-3" items={navItems} />
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
