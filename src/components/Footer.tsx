
import Link from "next/link";
import { Phone, Mail, MapPin, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-preventify-dark-gray text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Preventify</h3>
            <p className="text-gray-300 mb-4">
              Evidence-based modern healthcare across Kerala, focused on prevention and better health outcomes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-preventify-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-preventify-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-preventify-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-preventify-purple transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-preventify-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/clinics" className="text-gray-300 hover:text-preventify-purple transition-colors">
                  Our Clinics
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-gray-300 hover:text-preventify-purple transition-colors">
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-gray-300 hover:text-preventify-purple transition-colors">
                  Health Programs
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-300 hover:text-preventify-purple transition-colors">
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-preventify-purple transition-colors">
                <a href="#">Diabetes Care</a>
              </li>
              <li className="text-gray-300 hover:text-preventify-purple transition-colors">
                <a href="#">Preventive Healthcare</a>
              </li>
              <li className="text-gray-300 hover:text-preventify-purple transition-colors">
                <a href="#">Lifestyle Medicine</a>
              </li>
              <li className="text-gray-300 hover:text-preventify-purple transition-colors">
                <a href="#">Primary Care</a>
              </li>
              <li className="text-gray-300 hover:text-preventify-purple transition-colors">
                <a href="#">Specialist Consultation</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-preventify-purple" />
                <span className="text-gray-300">Headquarters:Vattamkulam,Malappuram, Kerala, India</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-preventify-purple" />
                <span className="text-gray-300">+91 8129334858</span>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-preventify-purple" />
                <span className="text-gray-300">contact@preventify.me</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700">
          <p className="text-gray-300 text-center">
            © {currentYear} Preventify Healthcare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
