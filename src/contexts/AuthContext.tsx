
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  isProvider: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProvider, setIsProvider] = useState(false);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          checkUserRole(session.user.id);
        }
      } catch (error) {
        console.error('Error retrieving session:', error);
        toast.error('Unable to connect to authentication service');
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            checkUserRole(session.user.id);
          } else {
            setIsProvider(false);
          }
          
          setIsLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up auth listener:', error);
      setIsLoading(false);
      return () => {};
    }
  }, []);

  // Check if user is a service provider
  const checkUserRole = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('service_providers')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      setIsProvider(!!data);
    } catch (error) {
      console.error('Error checking user role:', error);
      setIsProvider(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      toast.success("Successfully signed in!");
    } catch (error: any) {
      toast.error(error.message || "Sign in failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      
      // First, create the user account
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: userData.fullName,
            phone: userData.phone,
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (!data.user) {
        throw new Error("Failed to create user account");
      }
      
      // If user is a service provider, create an entry in the service_providers table
      if (userData.accountType === 'provider') {
        try {
          const { error: providerError } = await supabase
            .from('service_providers')
            .insert({
              user_id: data.user.id,
              business_name: userData.businessName,
              category: userData.category,
              description: userData.description,
              location: userData.location,
            });
          
          if (providerError) {
            console.error("Error creating provider profile:", providerError);
            toast.error("Account created but provider profile wasn't saved. Please contact support.");
          } else {
            setIsProvider(true);
          }
        } catch (providerError: any) {
          console.error("Error creating provider profile:", providerError);
          toast.error("Account created but provider profile wasn't saved. Please contact support.");
        }
      }
      
      toast.success("Account created successfully! Please check your email to confirm your account.");
    } catch (error: any) {
      console.error("Sign up error:", error);
      
      // Better error handling with more specific messages
      if (error.message.includes("Email")) {
        toast.error("Invalid email address. Please check and try again.");
      } else if (error.message.includes("password")) {
        toast.error("Password issue: " + error.message);
      } else {
        toast.error(error.message || "Failed to create account. Please try again.");
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(error.message || "Sign out failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut, isProvider }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
