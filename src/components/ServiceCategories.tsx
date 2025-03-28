
import React from 'react';
import { 
  Camera, 
  Calendar, 
  Home, 
  UserCheck, 
  ShoppingBag, 
  Utensils, 
  Briefcase, 
  Heart 
} from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Photography',
    icon: <Camera size={32} />,
    description: 'Professional photographers for events and portraits',
    count: 42
  },
  {
    id: 2,
    name: 'Event Planning',
    icon: <Calendar size={32} />,
    description: 'Complete event management and planning services',
    count: 38
  },
  {
    id: 3,
    name: 'Home Services',
    icon: <Home size={32} />,
    description: 'Maintenance, cleaning, and repair services',
    count: 56
  },
  {
    id: 4,
    name: 'Professional Services',
    icon: <Briefcase size={32} />,
    description: 'Legal, financial, and consulting expertise',
    count: 29
  },
  {
    id: 5,
    name: 'Beauty & Wellness',
    icon: <Heart size={32} />,
    description: 'Beauty treatments and wellness services',
    count: 34
  },
  {
    id: 6,
    name: 'Food & Catering',
    icon: <Utensils size={32} />,
    description: 'Catering services and food delivery',
    count: 45
  },
  {
    id: 7,
    name: 'Shopping & Delivery',
    icon: <ShoppingBag size={32} />,
    description: 'Personal shopping and delivery services',
    count: 27
  },
  {
    id: 8,
    name: 'Personal Services',
    icon: <UserCheck size={32} />,
    description: 'Personal assistance and specialized help',
    count: 31
  }
];

const ServiceCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse Service Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the wide range of services available from local providers in Peshawar
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow p-6 card-hover">
              <div className="text-marketplace-primary mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-3">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{category.count} providers</span>
                <a href="#" className="text-marketplace-primary hover:text-marketplace-secondary text-sm font-medium">
                  View All
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
