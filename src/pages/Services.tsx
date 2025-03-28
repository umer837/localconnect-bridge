
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// This would normally come from a database
const servicesByCategory = {
  'photography': [
    { id: 1, title: 'Wedding Photography', provider: 'Ahmed Studios', price: '15,000 PKR', rating: 4.8 },
    { id: 2, title: 'Corporate Event Photography', provider: 'ProfessionalShots', price: '20,000 PKR', rating: 4.7 },
    { id: 3, title: 'Portrait Sessions', provider: 'Capture Memories', price: '5,000 PKR', rating: 4.9 },
    { id: 4, title: 'Product Photography', provider: 'CleanShots', price: '10,000 PKR', rating: 4.6 },
  ],
  'event-planning': [
    { id: 1, title: 'Wedding Planning', provider: 'Perfect Day Events', price: '50,000 PKR', rating: 4.9 },
    { id: 2, title: 'Corporate Events', provider: 'Business Occasions', price: '35,000 PKR', rating: 4.7 },
    { id: 3, title: 'Birthday Parties', provider: 'Celebration Experts', price: '15,000 PKR', rating: 4.8 },
    { id: 4, title: 'Conference Management', provider: 'Professional Conferences', price: '40,000 PKR', rating: 4.6 },
  ],
  'home-services': [
    { id: 1, title: 'House Cleaning', provider: 'CleanHome Services', price: '3,000 PKR', rating: 4.7 },
    { id: 2, title: 'Plumbing', provider: 'Quick Fix Plumbers', price: '2,500 PKR', rating: 4.6 },
    { id: 3, title: 'Electrical Work', provider: 'Power Solutions', price: '2,800 PKR', rating: 4.8 },
    { id: 4, title: 'Painting Services', provider: 'Fresh Coat Painters', price: '15,000 PKR', rating: 4.5 },
  ],
  'professional-services': [
    { id: 1, title: 'Legal Consultation', provider: 'Law Experts', price: '5,000 PKR', rating: 4.9 },
    { id: 2, title: 'Financial Advisory', provider: 'Money Matters', price: '4,000 PKR', rating: 4.8 },
    { id: 3, title: 'Business Consulting', provider: 'Growth Partners', price: '10,000 PKR', rating: 4.7 },
    { id: 4, title: 'Tax Planning', provider: 'Tax Professionals', price: '3,500 PKR', rating: 4.6 },
  ],
  'beauty-wellness': [
    { id: 1, title: 'Hair Styling', provider: 'Glamour Salon', price: '2,500 PKR', rating: 4.8 },
    { id: 2, title: 'Massage Therapy', provider: 'Relaxation Center', price: '3,000 PKR', rating: 4.9 },
    { id: 3, title: 'Facial Treatments', provider: 'Skin Glow', price: '2,000 PKR', rating: 4.7 },
    { id: 4, title: 'Manicure & Pedicure', provider: 'Nail Art Studio', price: '1,500 PKR', rating: 4.6 },
  ],
  'food-catering': [
    { id: 1, title: 'Wedding Catering', provider: 'Delicious Occasions', price: '25,000 PKR', rating: 4.8 },
    { id: 2, title: 'Corporate Lunch', provider: 'Business Bites', price: '15,000 PKR', rating: 4.7 },
    { id: 3, title: 'Party Food Services', provider: 'Celebration Meals', price: '20,000 PKR', rating: 4.9 },
    { id: 4, title: 'Daily Meal Plans', provider: 'Healthy Eats', price: '10,000 PKR', rating: 4.6 },
  ],
  'shopping-delivery': [
    { id: 1, title: 'Grocery Shopping', provider: 'Quick Shop', price: '1,000 PKR', rating: 4.7 },
    { id: 2, title: 'Gift Shopping', provider: 'Gift Hunters', price: '1,500 PKR', rating: 4.8 },
    { id: 3, title: 'Medicine Delivery', provider: 'Pharmacy Express', price: '500 PKR', rating: 4.9 },
    { id: 4, title: 'Electronics Delivery', provider: 'Tech Express', price: '1,200 PKR', rating: 4.6 },
  ],
  'personal-services': [
    { id: 1, title: 'Personal Assistant', provider: 'Helping Hand', price: '20,000 PKR', rating: 4.8 },
    { id: 2, title: 'Driver Services', provider: 'Safe Rides', price: '15,000 PKR', rating: 4.7 },
    { id: 3, title: 'Home Tutoring', provider: 'Knowledge Plus', price: '10,000 PKR', rating: 4.9 },
    { id: 4, title: 'Fitness Training', provider: 'Fit Life', price: '8,000 PKR', rating: 4.6 },
  ],
};

const categoryNames = {
  'photography': 'Photography',
  'event-planning': 'Event Planning',
  'home-services': 'Home Services',
  'professional-services': 'Professional Services',
  'beauty-wellness': 'Beauty & Wellness',
  'food-catering': 'Food & Catering',
  'shopping-delivery': 'Shopping & Delivery',
  'personal-services': 'Personal Services',
};

const Services = () => {
  const { category } = useParams();
  const formattedCategory = category as keyof typeof servicesByCategory;

  // Check if category exists in our data
  const services = formattedCategory ? servicesByCategory[formattedCategory] : null;
  const categoryName = formattedCategory ? categoryNames[formattedCategory] : '';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container-custom py-12">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
          
          {services ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{categoryName} Services</h1>
                <p className="text-gray-600">
                  Browse {services.length} available {categoryName.toLowerCase()} services in Peshawar
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-gray-200 h-48 w-full"></div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-700 mb-2">Provider: <span className="font-medium">{service.provider}</span></p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-marketplace-primary font-bold">{service.price}</span>
                        <div className="flex items-center text-amber-500">
                          <span className="text-sm font-medium">{service.rating}</span>
                          <span className="ml-1">★</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h2>
              <p className="text-gray-600 mb-8">We couldn't find the category you're looking for.</p>
              <Link to="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
