
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Menu, User, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-marketplace-secondary">
                <span className="text-marketplace-primary">Peshawar</span>Connect
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-marketplace-primary">Home</a>
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-700 hover:text-marketplace-primary">
                  Categories <ChevronDown size={16} />
                </button>
                <div className="absolute z-10 hidden group-hover:block bg-white shadow-lg rounded-md mt-2 p-2 w-48">
                  <a href="#" className="block px-4 py-2 hover:bg-marketplace-light rounded-md">Event Planning</a>
                  <a href="#" className="block px-4 py-2 hover:bg-marketplace-light rounded-md">Photography</a>
                  <a href="#" className="block px-4 py-2 hover:bg-marketplace-light rounded-md">Home Services</a>
                  <a href="#" className="block px-4 py-2 hover:bg-marketplace-light rounded-md">Professional Services</a>
                  <a href="#" className="block px-4 py-2 hover:bg-marketplace-light rounded-md">Health & Wellness</a>
                </div>
              </div>
              <a href="#" className="text-gray-700 hover:text-marketplace-primary">Become a Provider</a>
              <a href="#" className="text-gray-700 hover:text-marketplace-primary">About Us</a>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search services..." 
                className="pl-10 pr-4 py-2 w-64 rounded-full"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button variant="outline" className="rounded-full">
              <User size={18} className="mr-2" /> Login
            </Button>
            <Button className="rounded-full bg-marketplace-primary hover:bg-marketplace-secondary">
              Sign Up
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
