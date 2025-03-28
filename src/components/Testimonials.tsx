
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Farah Khan',
    role: 'Client',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: 'I found an amazing event planner through this platform for my daughter\'s wedding. The service was exceptional and everything was perfectly organized.',
    rating: 5
  },
  {
    id: 2,
    name: 'Imran Ahmed',
    role: 'Client',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
    content: 'Hired a professional photographer for our company event. The quality of work was outstanding and the pricing was transparent.',
    rating: 5
  },
  {
    id: 3,
    name: 'Saima Nawaz',
    role: 'Provider',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    content: 'As a home service provider, this platform has helped me connect with new clients and grow my business in Peshawar.',
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-marketplace-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What People Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read testimonials from clients and service providers who have used our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < testimonial.rating ? "fill-marketplace-accent text-marketplace-accent" : "text-gray-300"} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
