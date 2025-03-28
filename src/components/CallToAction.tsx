
import React from 'react';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 hero-gradient text-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Are You a Service Provider in Peshawar?</h2>
            <p className="text-lg opacity-90 mb-6">
              Join our platform to showcase your services, connect with new clients, and grow your business locally.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <div className="h-2 w-2 bg-marketplace-accent rounded-full mr-2"></div>
                <span>Create a professional profile to showcase your work</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 bg-marketplace-accent rounded-full mr-2"></div>
                <span>Receive bookings and inquiries from local clients</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 bg-marketplace-accent rounded-full mr-2"></div>
                <span>Build your reputation with client reviews</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 bg-marketplace-accent rounded-full mr-2"></div>
                <span>Manage your schedule and services all in one place</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-marketplace-primary hover:bg-marketplace-accent">
                Register as a Provider
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
              alt="Service Provider" 
              className="rounded-lg shadow-lg max-w-full h-auto"
              style={{ maxHeight: '350px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
