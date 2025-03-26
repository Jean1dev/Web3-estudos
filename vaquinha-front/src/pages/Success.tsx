
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Navbar from '../components/Navbar';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';
import { getCampaignById } from '../lib/campaigns';
import { motion } from 'framer-motion';

const Success = () => {
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaign');
  const amount = searchParams.get('amount');
  const navigate = useNavigate();
  
  const [campaign, setCampaign] = useState(campaignId ? getCampaignById(campaignId) : undefined);
  
  useEffect(() => {
    if (!campaignId || !amount) {
      navigate('/');
    }
    
    setCampaign(campaignId ? getCampaignById(campaignId) : undefined);
  }, [campaignId, amount, navigate]);
  
  if (!campaign || !amount) {
    return null;
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-blue-light to-white">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-40 pb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass max-w-2xl mx-auto rounded-2xl p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-light flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-blue-accent" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You For Your Donation!</h1>
            
            <p className="text-xl mb-6">
              Your contribution of ${parseFloat(amount).toFixed(2)} to <span className="font-semibold">{campaign.title}</span> will help make a difference.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="my-8 p-6 bg-white/50 rounded-xl"
            >
              <p className="text-lg">
                Your generosity helps bring this project to life. We'll send you updates on the campaign's progress.
              </p>
            </motion.div>
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button 
                onClick={() => navigate('/')} 
                className="flex items-center px-6 py-3 rounded-lg bg-white border border-gray-200 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Return Home
              </button>
              
              <button 
                onClick={() => navigate(`/donation/${campaign.id}`)} 
                className="flex items-center px-6 py-3 rounded-lg bg-blue-accent text-white font-medium hover:bg-blue-600 transition-colors"
              >
                Visit Campaign
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Success;
