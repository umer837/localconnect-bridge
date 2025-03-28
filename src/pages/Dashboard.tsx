
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/Spinner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MessageSquare, Calendar, Star, Settings, Plus } from 'lucide-react';

interface Booking {
  id: string;
  service_id: string;
  client_id: string;
  provider_id: string;
  status: string;
  booking_date: string;
  created_at: string;
  service: {
    title: string;
  };
  client: {
    full_name: string;
  };
  provider: {
    business_name: string;
  };
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, isProvider } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        if (isProvider) {
          // Fetch provider's services
          const { data: servicesData, error: servicesError } = await supabase
            .from('services')
            .select('*')
            .eq('provider_id', user.id);
            
          if (servicesError) throw servicesError;
          setServices(servicesData || []);
          
          // Fetch provider's bookings
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select(`
              *,
              service:service_id(title),
              client:client_id(full_name)
            `)
            .eq('provider_id', user.id);
            
          if (bookingsError) throw bookingsError;
          setBookings(bookingsData || []);
        } else {
          // Fetch client's bookings
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select(`
              *,
              service:service_id(title),
              provider:provider_id(business_name)
            `)
            .eq('client_id', user.id);
            
          if (bookingsError) throw bookingsError;
          setBookings(bookingsData || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user, isProvider]);
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container-custom py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              {isProvider ? 'Manage your services and bookings' : 'Manage your bookings and account'}
            </p>
          </div>
          
          {isProvider && (
            <Link to="/add-service">
              <Button className="bg-marketplace-primary hover:bg-marketplace-secondary mt-4 md:mt-0">
                <Plus size={16} className="mr-2" />
                Add New Service
              </Button>
            </Link>
          )}
        </div>
        
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings" className="flex items-center">
              <Calendar size={16} className="mr-2" />
              Bookings
            </TabsTrigger>
            
            {isProvider && (
              <TabsTrigger value="services" className="flex items-center">
                <Star size={16} className="mr-2" />
                My Services
              </TabsTrigger>
            )}
            
            <TabsTrigger value="messages" className="flex items-center">
              <MessageSquare size={16} className="mr-2" />
              Messages
            </TabsTrigger>
            
            <TabsTrigger value="settings" className="flex items-center">
              <Settings size={16} className="mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-xl font-semibold">Your Bookings</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Spinner size="lg" />
              </div>
            ) : bookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <CardTitle>{booking.service.title}</CardTitle>
                      <CardDescription>
                        {isProvider 
                          ? `Booked by: ${booking.client.full_name}`
                          : `Provider: ${booking.provider.business_name}`
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Date:</span>
                          <span className="text-sm font-medium">
                            {new Date(booking.booking_date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Status:</span>
                          <span className={`text-sm font-medium ${
                            booking.status === 'confirmed' ? 'text-green-600' :
                            booking.status === 'pending' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <MessageSquare size={14} className="mr-1" />
                        Message
                      </Button>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No bookings found.</p>
                {!isProvider && (
                  <Link to="/">
                    <Button variant="outline" className="mt-4">
                      Explore Services
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </TabsContent>
          
          {isProvider && (
            <TabsContent value="services" className="space-y-6">
              <h2 className="text-xl font-semibold">Your Services</h2>
              
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <Spinner size="lg" />
                </div>
              ) : services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <Card key={service.id}>
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={service.image_url || 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3'} 
                          alt={service.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 line-clamp-2">{service.description}</p>
                        <p className="text-marketplace-primary font-bold mt-2">
                          Rs. {service.price.toLocaleString()}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button size="sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">You haven't added any services yet.</p>
                  <Link to="/add-service">
                    <Button className="mt-4 bg-marketplace-primary hover:bg-marketplace-secondary">
                      <Plus size={16} className="mr-2" />
                      Add New Service
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          )}
          
          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-xl font-semibold">Your Messages</h2>
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Message center coming soon.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Account settings coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
