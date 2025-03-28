
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LogIn, PlusCircle, LayoutDashboard, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, isProvider } = useAuth();
  const navigate = useNavigate();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || 'U';
  };
  
  const userFullName = user?.user_metadata?.full_name || user?.email || 'User';
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1">
            <span className="font-bold text-lg md:text-xl text-marketplace-primary">
              PeshawarServify
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-marketplace-primary transition-colors">
              Home
            </Link>
            <Link to="/" className="text-gray-700 hover:text-marketplace-primary transition-colors">
              Services
            </Link>
            <Link to="/" className="text-gray-700 hover:text-marketplace-primary transition-colors">
              Providers
            </Link>
            <Link to="/" className="text-gray-700 hover:text-marketplace-primary transition-colors">
              About
            </Link>
            <Link to="/" className="text-gray-700 hover:text-marketplace-primary transition-colors">
              Contact
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback>{getInitials(userFullName)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{userFullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    {isProvider && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/add-service')} className="cursor-pointer">
                          <PlusCircle size={16} className="mr-2" />
                          <span>Add Service</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                      <LayoutDashboard size={16} className="mr-2" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut size={16} className="mr-2" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="relative">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell size={20} />
                    <Badge variant="destructive" className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center">
                      <span className="text-[10px]">3</span>
                    </Badge>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button variant="ghost" className="flex items-center">
                    <LogIn size={16} className="mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="bg-marketplace-primary hover:bg-marketplace-secondary">
                    <User size={16} className="mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-marketplace-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 border-t">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-marketplace-primary py-2" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link to="/" className="text-gray-700 hover:text-marketplace-primary py-2" onClick={toggleMobileMenu}>
              Services
            </Link>
            <Link to="/" className="text-gray-700 hover:text-marketplace-primary py-2" onClick={toggleMobileMenu}>
              Providers
            </Link>
            <Link to="/" className="text-gray-700 hover:text-marketplace-primary py-2" onClick={toggleMobileMenu}>
              About
            </Link>
            <Link to="/" className="text-gray-700 hover:text-marketplace-primary py-2" onClick={toggleMobileMenu}>
              Contact
            </Link>
            
            <div className="border-t border-gray-200 pt-3 mt-2">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>{getInitials(userFullName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{userFullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-marketplace-primary py-2" onClick={toggleMobileMenu}>
                    <LayoutDashboard size={16} className="mr-2" />
                    Dashboard
                  </Link>
                  
                  {isProvider && (
                    <Link to="/add-service" className="flex items-center text-gray-700 hover:text-marketplace-primary py-2" onClick={toggleMobileMenu}>
                      <PlusCircle size={16} className="mr-2" />
                      Add Service
                    </Link>
                  )}
                  
                  <button 
                    onClick={() => {
                      handleSignOut();
                      toggleMobileMenu();
                    }}
                    className="flex items-center text-gray-700 hover:text-marketplace-primary py-2 w-full text-left"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link to="/sign-in" className="flex items-center text-gray-700 hover:text-marketplace-primary py-2" onClick={toggleMobileMenu}>
                    <LogIn size={16} className="mr-2" />
                    Sign In
                  </Link>
                  
                  <Link to="/sign-up" className="flex items-center text-marketplace-primary py-2" onClick={toggleMobileMenu}>
                    <User size={16} className="mr-2" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
