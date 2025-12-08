
'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown, User, AlertTriangle, LucideIcon, MapPin, ArrowRight, Stethoscope, Heart, Shield } from "lucide-react"; 
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

const clinics = [
  { name: 'Preventify Medical Center', location: 'Padinjarangadi', href: '/clinics' },
  { name: 'Preventify Health Clinic', location: 'Vattamkulam', href: '/clinics' },
  { name: 'Peekay\'s Preventify Clinic', location: 'Kanjirathani', href: '/clinics' },
  { name: 'Preventify Health Hub', location: 'Koottanad', href: '/clinics' },
];

const services: { title: string; href: string; description: string, image: string }[] = [
  {
    title: "Primary Care",
    href: "/services",
    description: "Comprehensive healthcare services for individuals and families of all ages, including routine check-ups, and management of acute and chronic illnesses.",
    image: "/service/Primary Care.webp"
  },
  {
    title: "Diabetes Management",
    href: "/services",
    description: "AI-driven specialized programs for the prevention, monitoring, and management of diabetes, including personalized diet and lifestyle plans.",
    image: "/service/Diabetes Management.webp"
  },
  {
    title: "Pediatric Care",
    href: "/services",
    description: "Specialized, compassionate healthcare services tailored for infants, children, and adolescents, including well-child visits, immunizations, and developmental screenings.",
    image: "/service/Pediatric Care.webp"
  },
  {
    title: "Women's Health",
    href: "/services",
    description: "Comprehensive care addressing the unique health needs of women, including gynecological exams, family planning, and prenatal care.",
    image: "/service/Women's Health.webp"
  },
  {
    title: "Preventive Screenings",
    href: "/services",
    description: "A range of early detection tests and health screenings to identify potential health issues before they become serious.",
    image: "/service/Preventive Screenings.webp"
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
      className="bg-white shadow-sm sticky top-0 z-50 group border-b border-white/20 font-['HELN.TTF']"
      data-navbar="main"
      style={{ '--navbar-height': `${navbarHeight}px` } as React.CSSProperties}
    >
      <div className="bg-white/5 border-b border-white/20 transition-all duration-300 overflow-hidden">
        <div className="container mx-auto py-1.5 px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-gray-700">
          <div className="flex items-center gap-4">
            {/* Links moved from here */}
          </div>
          <div className="flex items-center gap-5">
            {topNavLinks.map(link => (
              <Link key={link.name} href={link.path} className={`flex items-center gap-1 hover:text-primary transition-colors`}>
                {link.icon && <link.icon className="h-3 w-3" />}
                {link.name}
              </Link>
            ))}
            <a href="tel:+918129334858" className="group flex items-center gap-1 hover:text-primary transition-all text-xl text-black transform-origin-left group-hover:scale-110">
              <Phone className="h-4 w-3 " />
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
            <Link href="/" className="flex items-center ">
               <img src="/logo.png" alt="Preventify Logo" className="h-12" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
             <nav className="hidden lg:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-medium transition-colors text-base text-gray-700 hover:text-primary bg-transparent focus:bg-transparent data-[state=open]:bg-transparent group">
                        Our Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] gap-4 p-4 md:w-[800px] lg:w-[960px] md:grid-cols-3">
                        {services.map((service) => (
                          <li key={service.title} className="group relative block h-80 overflow-hidden rounded-xl cursor-pointer">
                            <Link href={service.href} className="w-full h-full block relative z-10">
                              {/* Default State */}
                              <div className="absolute inset-0 z-10 flex flex-col justify-end items-start h-full p-6 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                                <Image
                                  src={service.image}
                                  alt={service.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <h3 className="relative text-2xl font-bold text-white z-10">
                                  {service.title}
                                </h3>
                              </div>

                              {/* Hover State */}
                              <div className="absolute inset-0 z-20 flex flex-col justify-center items-start h-full p-6 bg-preventify-blue text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                                <p className="text-base mb-6 text-gray-200">
                                  {service.description}
                                </p>
                                <div className="flex items-center font-semibold mt-auto">
                                  Read More
                                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                    </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-medium transition-colors text-base text-gray-700 hover:text-primary bg-transparent focus:bg-transparent data-[state=open]:bg-transparent group">
                      Our Doctors
                      <ChevronDown
                        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                        aria-hidden="true"
                      />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 md:w-[400px]">
                        <ul className="space-y-2">
                          {doctors.slice(0, 3).map((doctor) => (
                            <ListItem key={doctor.name} href="/doctors" title={doctor.name}>
                              <div className="flex items-center gap-4">
                                 <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                  <Image
                                      src={doctor.image}
                                      alt={doctor.name}
                                      fill
                                      className="object-cover"
                                    />
                                 </div>
                                 <div>
                                    <p className="font-bold text-gray-800">{doctor.name}</p>
                                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                                 </div>
                              </div>
                            </ListItem>
                          ))}
                        </ul>
                        <div className="mt-4 text-center">
                          <Link href="/doctors" className="inline-flex items-center text-sm bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 rounded-md">
                              View all doctors
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-medium transition-colors text-base text-gray-700 hover:text-primary bg-transparent focus:bg-transparent data-[state=open]:bg-transparent group">
                      Our Clinics
                       <ChevronDown
                        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                        aria-hidden="true"
                      />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 md:w-[400px]">
                        <ul className="space-y-2">
                          {clinics.map((clinic) => (
                            <ListItem key={clinic.name} href={clinic.href} title={clinic.name}>
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-md">
                                  <MapPin className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-bold text-gray-800">{clinic.name}</p>
                                  <p className="text-sm text-gray-500">{clinic.location}</p>
                                </div>
                              </div>
                            </ListItem>
                          ))}
                        </ul>
                        <div className="mt-4 text-center">
                          <Link href="/clinics" className="inline-flex items-center text-sm bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 rounded-md">
                            View all locations
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>


                  <NavigationMenuItem>
                    <Link href="/programs" legacyBehavior passHref>
                      <NavigationMenuLink className={`font-medium transition-colors text-base px-4 py-2 rounded-md ${pathname === "/programs" ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                        Specialties & Treatments
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/savings" legacyBehavior passHref>
                      <NavigationMenuLink className={`font-medium transition-colors text-base px-4 py-2 rounded-md ${pathname === "/savings" ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                        Sugam Card
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link href="/emergency" legacyBehavior passHref>
                      <NavigationMenuLink className="flex items-center gap-1 text-red-600 font-medium text-base hover:text-red-800 transition-all px-4 py-2 rounded-md transform-origin-left group-hover:scale-110">
                        <AlertTriangle className="h-4 w-4" />
                        24/7 Emergency
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>
            </nav>
            <div className="hidden lg:flex items-center">
                <BookingDialog>
                <button className="relative px-8 py-3 bg-primary text-white font-medium rounded-full transition-all duration-300 overflow-hidden group text-base">
                  <span className="relative z-10">Book Appointment</span>
                  <div className="absolute inset-0 bg-black/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </BookingDialog>
            </div>
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
                  { name: "Centers of Excellence", path: "/programs" },
                  { name: "Sugam Card", path: "/savings" },
                  ...topNavLinks
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-medium transition-colors py-2 text-base ${pathname === link.path ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
                <Link href="/emergency" className="flex items-center gap-1 text-red-600 font-medium py-2 text-base hover:text-red-800 transition-colors">
                  <AlertTriangle className="h-5 w-5" />
                  24/7 Emergency
                </Link>
              <div className="flex flex-col space-y-2 pt-3">
                <BookingDialog>
                  <button className="relative px-6 py-3 bg-primary text-white font-medium rounded-full transition-all duration-300 overflow-hidden group w-full text-base">
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
