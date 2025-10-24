
'use client'
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import BookingDialog from "./BookingDialog";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Clinics", path: "/clinics" },
    { name: "Doctors", path: "/doctors" },
    { name: "Programs", path: "/programs" },
    { name: "Savings", path: "/savings" },
    { name: "Blog", path: "/blog" },
    { name: "Partner with Us", path: "/partners" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-display font-bold text-preventify-dark-blue">
                Preventify
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-medium transition-colors text-sm ${pathname === link.path ? 'text-preventify-blue' : 'text-gray-700 hover:text-preventify-blue'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/doctors">
              <Button 
                variant="outline" 
                className="border-preventify-blue text-preventify-blue hover:bg-preventify-blue/10 relative overflow-hidden group"
              >
                <span className="relative">Find a Doctor</span>
              </Button>
            </Link>
             <BookingDialog>
              <Button className="bg-preventify-blue hover:bg-preventify-dark-blue text-white">
                Book Appointment
              </Button>
            </BookingDialog>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              className="text-gray-700 hover:text-preventify-blue"
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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-medium transition-colors py-2 ${pathname === link.path ? 'text-preventify-blue' : 'text-gray-700 hover:text-preventify-blue'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-3">
                 <Link href="/doctors">
                  <Button 
                    variant="outline" 
                    className="border-preventify-blue text-preventify-blue hover:bg-preventify-blue/10 w-full relative overflow-hidden group"
                  >
                    <span className="relative">Find a Doctor</span>
                  </Button>
                </Link>
                <BookingDialog>
                  <Button className="bg-preventify-blue hover:bg-preventify-dark-blue text-white w-full">
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
