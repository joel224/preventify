
'use client'
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown, User, AlertTriangle } from "lucide-react";
import { usePathname } from "next/navigation";
import BookingDialog from "@/components/BookingDialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import ListItem from "@/components/ListItem"

const programs: { title: string; href: string; description: string }[] = [
  {
    title: "Diabetes Prevention",
    href: "/programs",
    description:
      "A structured program to prevent or delay type 2 diabetes.",
  },
  {
    title: "Weight Management",
    href: "/programs",
    description:
      "Achieve and maintain a healthy weight through sustainable lifestyle changes.",
  },
  {
    title: "Heart Health Program",
    href: "/programs",
    description:
      "Reduce cardiovascular risk factors and promote heart health.",
  },
  {
    title: "Corporate Wellness",
    href: "/programs",
    description:
      "Customized wellness programs to improve employee health and productivity.",
  },
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const mainNavLinks = [
    { name: "Sugam Card", path: "/savings" },
  ];
  
  const topNavLinks = [
      { name: "About Us", path: "/about" },
      { name: "Blogs", path: "/blog" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 group">
      {/* Combined Header with hover effect */}
      <div className="transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
        {/* Top Bar */}
        <div className="container mx-auto py-1.5 px-4 sm:px-6 lg:px-8 flex justify-end items-center text-xs text-slate-600">
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
        
        {/* Main Navigation */}
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                 <img src="/logo.png" alt="Preventify Logo" className="h-10" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/services" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Our Services
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/doctors" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Our Doctors
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/clinics" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Our Clinics
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {programs.map((program) => (
                          <ListItem
                            key={program.title}
                            title={program.title}
                            href={program.href}
                          >
                            {program.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {mainNavLinks.map((link) => (
                    <NavigationMenuItem key={link.name}>
                      <Link href={link.path} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {link.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

               <Link href="/emergency" className="flex items-center gap-1 text-red-600 font-medium text-sm hover:text-red-800 transition-colors">
                  <AlertTriangle className="h-4 w-4" />
                  24/7 Emergency
              </Link>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
               <BookingDialog>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Book Appointment
                </Button>
              </BookingDialog>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                className="text-gray-700 hover:text-primary"
                onClick={toggleMenu}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 animate-fade-in bg-white rounded-lg shadow-lg">
              <div className="flex flex-col space-y-3 p-4">
                {[...mainNavLinks, ...topNavLinks].map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`font-medium transition-colors py-2 ${pathname === link.path ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                 <Link href="/emergency" className="flex items-center gap-1 text-red-600 font-medium py-2 hover:text-red-800 transition-colors">
                    <AlertTriangle className="h-4 w-4" />
                    24/7 Emergency
                </Link>
                <div className="flex flex-col space-y-2 pt-3">
                  <BookingDialog>
                    <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                      Book Appointment
                    </Button>
                  </BookingDialog>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
