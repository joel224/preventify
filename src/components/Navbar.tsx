
'use client'
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import AppointmentDialog from "./AppointmentDialog";

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
              <span className="text-2xl font-display font-bold text-[#1E2665]">
                Preventify
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-medium transition-colors ${pathname === link.path ? 'text-preventify-purple' : 'text-gray-700 hover:text-preventify-purple'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <AppointmentDialog>
              <Button 
                variant="outline" 
                className="border-preventify-purple text-preventify-purple hover:bg-preventify-soft-purple relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-preventify-light-gray to-transparent animate-shimmer group-hover:animate-shimmer" />
                <span className="relative">Find a Doctor</span>
              </Button>
            </AppointmentDialog>
            <AppointmentDialog>
              <Button className="bg-preventify-purple hover:bg-preventify-dark-purple text-white">
                Book Appointment
              </Button>
            </AppointmentDialog>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-preventify-purple"
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
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-medium transition-colors py-2 ${pathname === link.path ? 'text-preventify-purple' : 'text-gray-700 hover:text-preventify-purple'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-3">
                <AppointmentDialog>
                  <Button 
                    variant="outline" 
                    className="border-preventify-purple text-preventify-purple hover:bg-preventify-soft-purple w-full relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-preventify-light-gray to-transparent animate-shimmer group-hover:animate-shimmer" />
                    <span className="relative">Find a Doctor</span>
                  </Button>
                </AppointmentDialog>
                <AppointmentDialog>
                  <Button className="bg-preventify-purple hover:bg-preventify-dark-purple text-white w-full">
                    Book Appointment
                  </Button>
                </AppointmentDialog>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
