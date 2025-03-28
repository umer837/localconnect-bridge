
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <div className="hero-gradient text-white">
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Find Local Service Providers in Peshawar
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Connect with trusted professionals for event planning, photography, and more
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input 
                type="text" 
                placeholder="What service are you looking for?" 
                className="pl-10 w-full bg-gray-50 text-gray-800"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Location" 
                className="pl-4 bg-gray-50 text-gray-800"
                defaultValue="Peshawar"
              />
            </div>
            <Button className="bg-marketplace-primary hover:bg-marketplace-secondary text-white px-6">
              Search
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <span className="text-white/80">Popular:</span>
            <a href="#" className="text-white hover:text-marketplace-accent">Event Planning</a>
            <a href="#" className="text-white hover:text-marketplace-accent">Photography</a>
            <a href="#" className="text-white hover:text-marketplace-accent">Home Cleaning</a>
            <a href="#" className="text-white hover:text-marketplace-accent">Catering</a>
            <a href="#" className="text-white hover:text-marketplace-accent">Web Development</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
