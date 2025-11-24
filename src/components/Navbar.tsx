'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// Import LucideIcon type for correct typing
import { Menu, X, Search, Phone, ChevronDown, User, AlertTriangle, LucideIcon } from "lucide-react"; 
import { usePathname } from "next/navigation";
import BookingDialog from "@/components/BookingDialog";

// Define the type for navigation links
interface NavLinkType {
  name: string;
  path: string;
  // icon is optional and must be a Lucide component type
  icon?: LucideIcon; 
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [navbarHeight, setNavbarHeight] = useState(80); // Default height

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Apply the NavLinkType to mainNavLinks
  // REMOVED "24/7 Emergency" from here - it's handled separately below
  const mainNavLinks: NavLinkType[] = [
    { name: "Our Services", path: "/services" },
    { name: "Our Doctors", path: "/doctors" },
    { name: "Our Clinics", path: "/clinics" },
    { name: "Programs", path: "/programs" },
    { name: "Sugam Card", path: "/savings" },
  ];
  
  // Apply the NavLinkType to topNavLinks
  const topNavLinks: NavLinkType[] = [
    // You could add an icon here if needed, e.g., { name: "About Us", path: "/about", icon: User },
    { name: "About Us", path: "/about" },
    { name: "Blogs", path: "/blog" },
  ];

  // Calculate navbar height dynamically
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('header[data-navbar="main"]');
      if (navbar) {
        const height = navbar.getBoundingClientRect().height;
        setNavbarHeight(height);
      }
    };

    // Update on mount and resize
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    
    // Update when mobile menu opens/closes
    const observer = new MutationObserver(updateNavbarHeight);
    const navbar = document.querySelector('header[data-navbar="main"]');
    if (navbar) {
      observer.observe(navbar, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    }

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <header 
      className="bg-white/5 backdrop-blur-xl shadow-sm sticky top-0 z-50 group border-b border-white/20"
      data-navbar="main"
      style={{ '--navbar-height': `${navbarHeight}px` } as React.CSSProperties}
    >
      {/* Top Bar */}
      <div className="bg-white/5 border-b border-white/20 transition-all duration-300 overflow-hidden">
        <div className="container mx-auto py-1.5 px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-slate-600">
          <div className="flex items-center gap-4">
            {topNavLinks.map(link => (
              <Link key={link.name} href={link.path} className={`flex items-center gap-1 hover:text-primary transition-colors`}>
                {/* This line is now fixed because 'link' has a type definition that includes 'icon' */}
                {link.icon && <link.icon className="h-3 w-3" />}
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+918129334858" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Phone className="h-3 w-3" />
              +91 8129334858
            </a>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <ChevronDown className="h-3 w-3" />
              Kerala
            </button>
            <BookingDialog>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <User className="h-3 w-3" />
                Login
              </button>
            </BookingDialog>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
               <img src="/logo.png" alt="Preventify Logo" className="h-12" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center">
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-medium transition-colors text-lg ${pathname === link.path ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
              >
                {link.name}
              </Link>
            ))}
              {/* This is the separate, correctly styled Emergency link */}
              <Link href="/emergency" className="flex items-center gap-1 text-red-600 font-medium text-lg hover:text-red-800 transition-colors">
                <AlertTriangle className="h-4 w-4" />
                24/7 Emergency
              </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
              <BookingDialog>
              <button className="relative px-8 py-3 bg-primary text-white font-medium rounded-full transition-all duration-300 overflow-hidden group text-lg">
                <span className="relative z-10">Book Appointment</span>
                <div className="absolute inset-0 bg-black/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </BookingDialog>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              className="text-gray-700 hover:text-primary"
              onClick={toggleMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {[...mainNavLinks, ...topNavLinks].map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-medium transition-colors py-2 text-lg ${pathname === link.path ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
                {/* This is the separate, correctly styled Emergency link for mobile */}
                <Link href="/emergency" className="flex items-center gap-1 text-red-600 font-medium py-2 text-lg hover:text-red-800 transition-colors">
                  <AlertTriangle className="h-5 w-5" />
                  24/7 Emergency
                </Link>
              <div className="flex flex-col space-y-2 pt-3">
                <BookingDialog>
                  <button className="relative px-6 py-3 bg-primary text-white font-medium rounded-full transition-all duration-300 overflow-hidden group w-full text-lg">
                    <span className="relative z-10">Book Appointment</span>
                    <div className="absolute inset-0 bg-black/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </BookingDialog>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
