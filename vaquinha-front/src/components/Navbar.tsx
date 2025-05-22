
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Beef, Info } from 'lucide-react';
import WalletSelection from './ui/wallet-select';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Beef className="h-7 w-7 text-blue-accent" />
            <span className="font-bold text-xl tracking-tight">Vaquinha Web3</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-blue-accent">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium transition-colors hover:text-blue-accent">
              About
            </Link>
            <Link to="/create" className="text-sm font-medium transition-colors hover:text-blue-accent">
              Create Campaign
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <WalletSelection/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
