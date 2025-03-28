
import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-marketplace-dark text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-marketplace-primary">Peshawar</span>Connect
            </h3>
            <p className="text-gray-300 mb-4">
              Connecting local service providers with clients in Peshawar. Find trusted professionals for all your service needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-marketplace-primary">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-marketplace-primary">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-marketplace-primary">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-marketplace-primary">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Providers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Become a Provider</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Service Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Event Planning</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Photography</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Home Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Professional Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Beauty & Wellness</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Food & Catering</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>University Town, Peshawar, Khyber Pakhtunkhwa, Pakistan</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a href="mailto:info@peshawarconnect.com" className="hover:text-marketplace-primary">
                  info@peshawarconnect.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a href="tel:+923001234567" className="hover:text-marketplace-primary">
                  +92 300 123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} PeshawarConnect. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
