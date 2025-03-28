
import React from 'react';
import { Star, MapPin, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";

const providers = [
  {
    id: 1,
    name: 'Ahmad Photography',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    rating: 4.8,
    reviews: 56,
    location: 'University Road, Peshawar',
    description: 'Professional photography services for weddings, events, and portraits with over 5 years of experience.'
  },
  {
    id: 2,
    name: 'Royal Events',
    category: 'Event Planning',
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 4.9,
    reviews: 78,
    location: 'Saddar, Peshawar',
    description: 'Complete event management solutions including venue selection, decoration, catering, and entertainment.'
  },
  {
    id: 3,
    name: 'Peshawar Home Services',
    category: 'Home Services',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    rating: 4.7,
    reviews: 42,
    location: 'Hayatabad, Peshawar',
    description: 'Professional home cleaning, plumbing, electrical, and maintenance services at affordable rates.'
  },
  {
    id: 4,
    name: 'Khan Catering',
    category: 'Food & Catering',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.6,
    reviews: 64,
    location: 'Tehkal, Peshawar',
    description: 'Authentic Pakistani cuisine for all types of events, from small gatherings to large weddings.'
  }
];

const FeaturedProviders = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Service Providers</h2>
            <p className="text-gray-600">Top-rated professionals in Peshawar</p>
          </div>
          <a href="#" className="text-marketplace-primary hover:text-marketplace-secondary font-medium">
            View All Providers
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((provider) => (
            <div key={provider.id} className="bg-white rounded-lg overflow-hidden shadow card-hover">
              <div className="relative h-48">
                <img 
                  src={provider.image} 
                  alt={provider.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium">
                  {provider.category}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <img 
                    src={provider.avatar} 
                    alt={provider.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-marketplace-accent text-marketplace-accent" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                      <span className="text-xs text-gray-500">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <MapPin size={14} />
                  <span>{provider.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {provider.description}
                </p>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare size={14} className="mr-1" /> Contact
                  </Button>
                  <Button size="sm" className="flex-1 bg-marketplace-primary">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
