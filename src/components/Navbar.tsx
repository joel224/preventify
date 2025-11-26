'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown, User, AlertTriangle, LucideIcon } from "lucide-react"; 
import { usePathname } from "next/navigation";
import BookingDialog from "@/components/BookingDialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import ListItem from "@/components/ListItem";
import Image from "next/image";

interface NavLinkType {
  name: string;
  path: string;
  icon?: LucideIcon; 
}

const doctors = [
    {
      id: 1,
      name: "Dr. Rakesh K R",
      specialty: "Chief Medical Officer",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748262006/Dr_Rakesh_xngrlx.jpg",
    },
    {
      id: 2,
      name: "Dr. Mohammed Faisal",
      specialty: "General Practitioner",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748257298/Dr_Faisal_stbx3w.jpg",
    },
    {
      id: 3,
      name: "Dr. Hafsa Hussain",
      specialty: "Pediatrics",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255660/Dr_Hafsa_t3qk7r.jpg",
    },
];

const otherLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Our Services",
    href: "/services",
    description: "View our comprehensive range of healthcare services.",
  },
  {
    title: "Our Clinics",
    href: "/clinics",
    description: "Find a Preventify clinic near you.",
  },
  {
    title: "Programs",
    href: "/programs",
    description: "Explore our specialized health and wellness programs.",
  },
  {
    title: "Sugam Card",
    href: "/savings",
    description: "Learn about our exclusive savings and membership card.",
  },
];


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [navbarHeight, setNavbarHeight] = useState(80);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const topNavLinks: NavLinkType[] = [
    { name: "About Us", path: "/about" },
    { name: "Blogs", path: "/blog" },
  ];

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('header[data-navbar="main"]');
      if (navbar) {
        const height = navbar.getBoundingClientRect().height;
        setNavbarHeight(height);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    
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
      <div className="bg-white/5 border-b border-white/20 transition-all duration-300 overflow-hidden">
        <div className="container mx-auto py-1.5 px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-slate-600">
          <div className="flex items-center gap-4">
            {topNavLinks.map(link => (
              <Link key={link.name} href={link.path} className={`flex items-center gap-1 hover:text-primary transition-colors`}>
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
      
      <div className="container mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
               <img src="/logo.png" alt="Preventify Logo" className="h-12" />
            </Link>
          </div>

          <nav className="hidden lg:flex space-x-2 items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/services" legacyBehavior passHref>
                    <NavigationMenuLink className={`font-medium transition-colors text-lg px-4 py-2 rounded-md ${pathname === "/services" ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                      Our Services
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium transition-colors text-lg text-gray-700 hover:text-primary bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                    Our Doctors
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-6 md:w-[600px] lg:w-[700px]">
                      <div className="grid grid-cols-3 gap-6">
                        {doctors.map((doctor) => (
                          <Link href="/doctors" key={doctor.name} className="group block">
                            <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden relative">
                              <Image src={doctor.image} alt={doctor.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                            <h3 className="mt-2 font-semibold text-gray-800 group-hover:text-primary">{doctor.name}</h3>
                            <p className="text-sm text-gray-500">{doctor.specialty}</p>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <Link href="/doctors" className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded-md bg-primary hover:bg-primary/90 focus:shadow-outline focus:outline-none">
                            View All Doctors
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                 <NavigationMenuItem>
                  <Link href="/clinics" legacyBehavior passHref>
                    <NavigationMenuLink className={`font-medium transition-colors text-lg px-4 py-2 rounded-md ${pathname === "/clinics" ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                      Our Clinics
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/programs" legacyBehavior passHref>
                    <NavigationMenuLink className={`font-medium transition-colors text-lg px-4 py-2 rounded-md ${pathname === "/programs" ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                      Programs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/savings" legacyBehavior passHref>
                    <NavigationMenuLink className={`font-medium transition-colors text-lg px-4 py-2 rounded-md ${pathname === "/savings" ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                      Sugam Card
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/emergency" legacyBehavior passHref>
                    <NavigationMenuLink className="flex items-center gap-1 text-red-600 font-medium text-lg hover:text-red-800 transition-colors px-4 py-2 rounded-md">
                      <AlertTriangle className="h-4 w-4" />
                      24/7 Emergency
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
              <BookingDialog>
              <button className="relative px-8 py-3 bg-primary text-white font-medium rounded-full transition-all duration-300 overflow-hidden group text-lg">
                <span className="relative z-10">Book Appointment</span>
                <div className="absolute inset-0 bg-black/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </BookingDialog>
          </div>

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

        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {[
                  { name: "Our Services", path: "/services" },
                  { name: "Our Doctors", path: "/doctors" },
                  { name: "Our Clinics", path: "/clinics" },
                  { name: "Programs", path: "/programs" },
                  { name: "Sugam Card", path: "/savings" },
                  ...topNavLinks
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-medium transition-colors py-2 text-lg ${pathname === link.path ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
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
