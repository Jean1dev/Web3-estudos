
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Navbar from '../components/Navbar';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-blue-light to-white">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-40 pb-20 text-center">
          <h1 className="text-6xl font-bold mb-6">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-xl text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-accent text-white font-medium hover:bg-blue-600 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
