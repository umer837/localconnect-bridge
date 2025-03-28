
import React from 'react';
import { Search, ListChecks, Calendar, MessageSquare } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Find Services',
    description: 'Search for the services you need using filters to narrow down your options',
    icon: <Search size={32} />,
  },
  {
    id: 2,
    title: 'Compare Providers',
    description: 'Review profiles, check ratings, and read customer reviews to make informed decisions',
    icon: <ListChecks size={32} />,
  },
  {
    id: 3,
    title: 'Book Services',
    description: 'Select a provider and schedule an appointment at your preferred time',
    icon: <Calendar size={32} />,
  },
  {
    id: 4,
    title: 'Connect & Complete',
    description: 'Communicate directly with the provider and complete your service',
    icon: <MessageSquare size={32} />,
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find and hire local service providers in Peshawar in just a few simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="text-center flex flex-col items-center">
              <div className="bg-marketplace-light p-5 rounded-full mb-5 text-marketplace-primary">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {step.id < steps.length && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
