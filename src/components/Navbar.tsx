
'use client'
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Phone, ChevronDown, User, AlertTriangle } from "lucide-react";
import { usePathname } from "next/navigation";
import BookingDialog from "@/components/BookingDialog";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const mainNavLinks = [
    { name: "Services", path: "/services" },
    { name: "Our Network", path: "/clinics" },
    { name: "Aarogyam", path: "/programs" },
    { name: "One Health", path: "/savings" },
  ];
  
  const topNavLinks = [
      { name: "About Us", path: "/about" },
      { name: "Blogs", path: "/blog" },
      { name: "Search Website", path: "/search", icon: Search },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-top-bar border-b border-border/50">
          <div className="container mx-auto py-1.5 px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-slate-600">
                <div className="flex items-center gap-4">
                    {topNavLinks.map(link => (
                        <Link key={link.name} href={link.path} className="flex items-center gap-1 hover:text-primary transition-colors">
                           {link.icon && <link.icon className="h-3 w-3" />}
                           {link.name}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <a href="tel:18003090309" className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Phone className="h-3 w-3" />
                        1800-309-0309
                    </a>
                     <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <ChevronDown className="h-3 w-3" />
                        Bangalore
                    </button>
                    <Link href="/login" className="flex items-center gap-1 hover:text-primary transition-colors">
                        <User className="h-3 w-3" />
                        Login
                    </Link>
                </div>
          </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
               <img src="/edit1.png" alt="Preventify Logo" className="h-10" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 items-center">
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-medium transition-colors text-sm ${pathname === link.path ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
              >
                {link.name}
              </Link>
            ))}
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
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
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
    </header>
  );
};

export default Navbar;
