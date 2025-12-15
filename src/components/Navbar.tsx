
'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown, User, AlertTriangle, LucideIcon, ArrowRight, Stethoscope, Heart, Shield, Droplets, Activity, PlusCircle, CheckCircle, Star, MapPin } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

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
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748262006/Dr_Rakesh_xngrlx.jpg  ",
    },
    {
      id: 2,
      name: "Dr. Mohammed Faisal",
      specialty: "General Practitioner",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748257298/Dr_Faisal_stbx3w.jpg  ",
    },
    {
      id: 3,
      name: "Dr. Hafsa Hussain",
      specialty: "Pediatrics",
      image: "https://res.cloudinary.com/dyf8umlda/image/upload/v1748255660/Dr_Hafsa_t3qk7r.jpg  ",
    },
];

const clinics = [
  { name: 'Preventify Medical Center', location: 'Padinjarangadi', href: '/clinics' },
  { name: 'Preventify Health Clinic', location: 'Vattamkulam', href: '/clinics' },
  { name: 'Peekay\'s Preventify Clinic', location: 'Kanjirathani', href: '/clinics' },
  { name: 'Preventify Health Hub', location: 'Koottanad', href: '/clinics' },
];

const services: { title: string; href: string; description: string; longDescription: string; icon: LucideIcon, image: string }[] = [
  {
    title: "Primary Care",
    href: "/services",
    description: "Your family's everyday health.",
    longDescription: "Comprehensive healthcare services for individuals and families, focusing on long-term health and wellness.",
    icon: Stethoscope,
    image: "/service/Primary Care.webp",
  },
  {
    title: "Diabetes Care",
    href: "/services",
    description: "Smart help for sugar control.",
    longDescription: "AI-driven specialized programs for the prevention, monitoring, and management of diabetes.",
    icon: Droplets,
    image: "/service/Diabetes Management.webp",
  },
  {
    title: "Children's Care",
    href: "/services",
    description: "Happy care for little ones.",
    longDescription: "Specialized, compassionate healthcare services tailored for infants, children, and adolescents.",
    icon: Heart,
    image: "/service/Pediatric Care.webp",
  },
];

const moreServices: { title: string; href: string; description: string; longDescription: string; icon: LucideIcon, image: string }[] = [
    {
    title: "Women's Care",
    href: "/services",
    description: "Health made for you.",
    longDescription: "Comprehensive care addressing women's unique health needs at every stage of life.",
    icon: Activity,
    image: "/service/Women's Health.webp",
  },
  {
    title: "Health Checks",
    href: "/services",
    description: "Find small problems early.",
    longDescription: "Advanced early detection tests to identify potential health issues before they become serious.",
    icon: Shield,
    image: "/service/Preventive Screenings.webp",
  },
  {
    title: "All Services",
    href: "/services",
    description: "Explore our all medical services.",
    longDescription: "Explore our full range of medical services, from primary care to specialized treatments.",
    icon: PlusCircle,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop",
  },
];




const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [activeService, setActiveService] = useState<(typeof services[0]) | null>(null);

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
              <NavigationMenuList className="gap-2">
                  
                  {/* SERVICES MENU - REFACTORED FOR INTERACTIVITY */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-[15px] font-medium text-slate-600 hover:text-primary hover:bg-slate-50/80 data-[state=open]:bg-slate-50">
                        Our Services
                        <ChevronDown
                        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                        aria-hidden="true"
                      />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-12 gap-8 p-6 w-[980px] bg-white">
                        
                        {/* Column 1 & 2 */}
                        <div className="col-span-8 flex flex-col gap-2">
                            <p 
                              className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2"
                              onMouseEnter={() => setActiveService(null)}
                            >
                              
                              SERVICES
                            </p>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                                {[...services, ...moreServices].map((service) => (
                                    <div onMouseEnter={() => setActiveService(service)} key={service.title}>
                                        <ListItem href={service.href} title={service.title} className="p-4 rounded-xl hover:bg-slate-50 transition-all duration-200 group">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                    <service.icon className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 text-[15px] mb-0.5 group-hover:text-primary transition-colors">{service.title}</p>
                                                    <p className="text-sm text-slate-500 leading-relaxed font-normal group-hover:text-preventify-green transition-colors">{service.description}</p>
                                                </div>
                                            </div>
                                        </ListItem>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DYNAMIC FEATURED/SERVICE Column */}
                        <div className="col-span-4">
                           <div className="h-full bg-gray-50 rounded-2xl p-6 flex flex-col justify-between hover:border-primary/20 transition-colors border relative overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {activeService ? (
                                        <motion.div
                                            key={activeService.title}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="h-full flex flex-col"
                                        >
                                            <div className="absolute inset-0 z-0">
                                                 <img 
                                                    src={activeService.image} 
                                                    alt={activeService.title}
                                                    className="w-full h-full object-cover grayscale opacity-10"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent"></div>
                                            </div>
                                            <div className="relative z-10 flex-grow flex flex-col justify-end">
                                                <h3 className="font-bold text-slate-900 text-lg mb-2">{activeService.title}</h3>
                                                <p className="text-[15px] text-slate-600 mb-6 leading-relaxed flex-grow">{activeService.longDescription}</p>
                                                <Link href={activeService.href} passHref>
                                                    <Button variant="link" className="p-0 h-auto text-primary">
                                                        Read More <ArrowRight className="ml-1 h-4 w-4"/>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="sugam-card"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="h-full flex flex-col"
                                        >
                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">FEATURED PLAN</p>
                                                </div>
                                                <h3 className="font-bold text-slate-900 text-lg mb-2">Sugam Card</h3>
                                                <p className="text-[15px] text-slate-600 mb-6 leading-relaxed">One fee. One year. All your doctor visits are covered completely.</p>
                                                <ul className="space-y-3 text-sm font-medium text-slate-700">
                                                    <li className="flex items-center gap-2.5"><CheckCircle className="h-4 w-4 text-emerald-500"/> Unlimited Consultations</li>
                                                    <li className="flex items-center gap-2.5"><CheckCircle className="h-4 w-4 text-emerald-500"/> Family Plans Available</li>
                                                    <li className="flex items-center gap-2.5"><CheckCircle className="h-4 w-4 text-emerald-500"/> Priority Booking</li>
                                                </ul>
                                            </div>
                                            <Link href="/savings" passHref className="mt-auto">
                                                <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl py-5">
                                                    View Plan Details
                                                </Button>
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                      </div>
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
