
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/Spinner';
import { Star, MapPin, Phone, Mail, Calendar, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Provider {
  id: string;
  business_name: string;
  description: string;
  location: string;
  category: string;
  avatar_url: string;
  user: {
    email: string;
    phone: string;
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

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  client_id: string;
  client: {
    full_name: string;
    avatar_url: string;
  };
}

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  
  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        setLoading(true);
        
        // Fetch provider data
        const { data: providerData, error: providerError } = await supabase
          .from('service_providers')
          .select(`
            *,
            user:user_id(
              email,
              phone
            )
          `)
          .eq('id', id)
          .single();
          
        if (providerError) throw providerError;
        setProvider(providerData);
        
        // Fetch provider's services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('provider_id', id);
          
        if (servicesError) throw servicesError;
        setServices(servicesData || []);
        
        // Fetch provider's reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select(`
            *,
            client:client_id(
              full_name,
              avatar_url
            )
          `)
          .eq('provider_id', id);
          
        if (reviewsError) throw reviewsError;
        setReviews(reviewsData || []);
        
        // Calculate average rating
        if (reviewsData && reviewsData.length > 0) {
          const total = reviewsData.reduce((sum, review) => sum + review.rating, 0);
          setAverageRating(total / reviewsData.length);
        }
      } catch (error) {
        console.error('Error fetching provider data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProviderData();
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Provider Not Found</h2>
            <p className="text-gray-600 mb-4">The service provider you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Provider Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-marketplace-light rounded-full flex items-center justify-center mb-4">
                    {provider.avatar_url ? (
                      <img 
                        src={provider.avatar_url} 
                        alt={provider.business_name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="text-3xl font-bold text-marketplace-primary">
                        {provider.business_name.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-1">{provider.business_name}</h1>
                  
                  <Badge className="mb-2">{provider.category}</Badge>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          size={16} 
                          className={`${
                            star <= Math.round(averageRating) 
                              ? 'fill-marketplace-accent text-marketplace-accent' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">
                      {averageRating.toFixed(1)} ({reviews.length} reviews)
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{provider.description}</p>
                  
                  <div className="w-full space-y-3">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm">{provider.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm">{provider.user.phone}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm">{provider.user.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full">
                  <MessageSquare size={16} className="mr-2" />
                  Contact Provider
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar size={16} className="mr-2" />
                  Book Service
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Services and Reviews */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="services">
              <TabsList className="mb-6">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="services">
                <h2 className="text-xl font-bold mb-4">Services Offered</h2>
                
                {services.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service) => (
                      <Card key={service.id} className="overflow-hidden">
                        {service.image_url && (
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={service.image_url} 
                              alt={service.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 line-clamp-2 mb-2">{service.description}</p>
                          <p className="text-marketplace-primary font-bold">
                            Rs. {service.price.toLocaleString()}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Book Now</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No services available yet.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Customer Reviews</h2>
                </div>
                
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-start mb-2">
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0">
                            {review.client.avatar_url ? (
                              <img 
                                src={review.client.avatar_url} 
                                alt={review.client.full_name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-sm font-medium text-gray-500">
                                {review.client.full_name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.client.full_name}</h4>
                            <div className="flex items-center">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star}
                                    size={14} 
                                    className={`${
                                      star <= review.rating 
                                        ? 'fill-marketplace-accent text-marketplace-accent' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-xs text-gray-500">
                                {new Date(review.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No reviews available yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProviderProfile;
