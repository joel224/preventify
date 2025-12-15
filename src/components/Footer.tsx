
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white text-preventify-dark-gray">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-semibold mb-4 text-preventify-blue">Preventify</h3>
            <p className="text-gray-600 mb-4">
              Evidence-based modern healthcare across Kerala, focused on prevention and better health outcomes.
            </p>
            <div className="flex flex-col space-y-4">
                <a href="https://www.instagram.com/preventify.me/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center text-gray-600 hover:text-preventify-purple transition-colors group">
                    <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="insta-gradient-footer" cx="0.3" cy="1.2" r="1.2">
                                <stop offset="0%" stopColor="#F9CE34" />
                                <stop offset="25%" stopColor="#EE2A7B" />
                                <stop offset="50%" stopColor="#6228D7" />
                            </radialGradient>
                        </defs>
                        <path d="M16.5 2H7.5C4.46243 2 2 4.46243 2 7.5V16.5C2 19.5376 4.46243 22 7.5 22H16.5C19.5376 22 22 19.5376 22 16.5V7.5C22 4.46243 19.5376 2 16.5 2Z" stroke="url(#insta-gradient-footer)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15.6C13.9882 15.6 15.6 13.9882 15.6 12C15.6 10.0118 13.9882 8.4 12 8.4C10.0118 8.4 8.4 10.0118 8.4 12C8.4 13.9882 10.0118 15.6 12 15.6Z" stroke="url(#insta-gradient-footer)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.8 7.20001H16.81" stroke="url(#insta-gradient-footer)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="group-hover:underline">Instagram</span>
                </a>
                <a href="#" aria-label="Facebook" className="inline-flex items-center text-gray-600 hover:text-preventify-purple transition-colors group">
                    <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="group-hover:underline">Facebook</span>
                </a>
                 <a href="#" aria-label="YouTube" className="inline-flex items-center text-gray-600 hover:text-preventify-purple transition-colors group">
                    <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_105_2_footer)">
                            <path d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z" stroke="#FF0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.125 14.25L15 12L10.125 9.75V14.25Z" stroke="#FF0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_105_2_footer">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                     <span className="group-hover:underline">YouTube</span>
                </a>
                 <a href="#" aria-label="LinkedIn" className="inline-flex items-center text-gray-600 hover:text-preventify-purple transition-colors group">
                     <svg className="h-6 w-6 mr-3" fill="#0A66C2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" fill="#0A66C2" />
                    </svg>
                    <span className="group-hover:underline">LinkedIn</span>
                </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-preventify-purple transition-colors group inline-flex items-center">
                  <span className="opacity-0 w-0 group-hover:w-4 group-hover:mr-1 transition-all duration-200 text-preventify-purple">&gt;</span>About Us
                </Link>
              </li>
              <li>
                <Link href="/clinics" className="text-gray-600 hover:text-preventify-purple transition-colors group inline-flex items-center">
                  <span className="opacity-0 w-0 group-hover:w-4 group-hover:mr-1 transition-all duration-200 text-preventify-purple">&gt;</span>Our Clinics
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-gray-600 hover:text-preventify-purple transition-colors group inline-flex items-center">
                  <span className="opacity-0 w-0 group-hover:w-4 group-hover:mr-1 transition-all duration-200 text-preventify-purple">&gt;</span>Our Doctors
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-gray-600 hover:text-preventify-purple transition-colors group inline-flex items-center">
                  <span className="opacity-0 w-0 group-hover:w-4 group-hover:mr-1 transition-all duration-200 text-preventify-purple">&gt;</span>Health Programs
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-600 hover:text-preventify-purple transition-colors group inline-flex items-center">
                  <span className="opacity-0 w-0 group-hover:w-4 group-hover:mr-1 transition-all duration-200 text-preventify-purple">&gt;</span>Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Our Services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/services" className="text-gray-600 hover:text-preventify-purple transition-colors group inline-flex items-center">
                  <span className="opacity-0 w-0 group-hover:w-4 group-hover:mr-1 transition-all duration-200 text-preventify-purple">&gt;</span>Diabetes Care
                </Link>
              </li>
              <li>
                 <Link href="/services" className="text-gray-600 hover:text-preventify-purple transition-colors group inline-flex items-center">
                  <span className="opacity-0 w-0 group-hover:w-4 group-hover:mr-1 transition-all duration-200 text-preventify-purple">&gt;</span>Preventive Healthcare
                </Link>
              </li>
              <li>
                 <Link href="/services" className="text-gray-600 hover:text-preventify-purple transition-colors group inline-flex items-center">
                  <span className="opacity-0 w-0 group-hover:w-4 group-hover:mr-1 transition-all duration-200 text-preventify-purple">&gt;</span>Lifestyle Medicine
                </Link>
              </li>
              <li>
                 <Link href="/services" className="text-gray-600 hover:text-preventify-purple transition-colors group inline-flex items-center">
                  <span className="opacity-0 w-0 group-hover:w-4 group-hover:mr-1 transition-all duration-200 text-preventify-purple">&gt;</span>Primary Care
                </Link>
              </li>
              <li>
                 <Link href="/services" className="text-gray-600 hover:text-preventify-purple transition-colors group inline-flex items-center">
                  <span className="opacity-0 w-0 group-hover:w-4 group-hover:mr-1 transition-all duration-200 text-preventify-purple">&gt;</span>Specialist Consultation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-preventify-purple" />
                <span className="text-gray-600">Headquarters:Vattamkulam,Malappuram, Kerala, India</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-preventify-purple" />
                <span className="text-gray-600">+91 8129334858</span>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-preventify-purple" />
                <span className="text-gray-600">contact@preventify.me</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-center">
            © {currentYear} Preventify Healthcare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
