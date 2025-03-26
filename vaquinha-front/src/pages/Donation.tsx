
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Navbar from '../components/Navbar';
import DonationForm from '../components/DonationForm';
import { getCampaignById } from '../lib/campaigns';
import { ArrowLeft, Clock, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Donation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const campaign = id ? getCampaignById(id) : undefined;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!campaign && id) {
        navigate('/not-found');
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [campaign, id, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-accent"></div>
      </div>
    );
  }
  
  if (!campaign) {
    return null;
  }
  
  const progress = (campaign.currentAmount / campaign.targetAmount) * 100;
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-blue-light to-white">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-32 pb-20">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-sm mb-8 hover:text-blue-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to campaigns
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="glass rounded-2xl overflow-hidden">
                <div className="h-72 md:h-96 overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6 md:p-8">
                  <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
                  
                  <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                    <div
                      className="h-full bg-blue-accent rounded-full"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-accent">${campaign.currentAmount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">raised of ${campaign.targetAmount.toLocaleString()}</p>
                    </div>
                    
                    <div className="text-center flex flex-col items-center">
                      <p className="text-2xl font-bold flex items-center">
                        <Users className="w-5 h-5 mr-1 inline-block text-blue-accent" />
                        {campaign.backers}
                      </p>
                      <p className="text-sm text-muted-foreground">backers</p>
                    </div>
                    
                    <div className="text-center flex flex-col items-center">
                      <p className="text-2xl font-bold flex items-center">
                        <Clock className="w-5 h-5 mr-1 inline-block text-blue-accent" />
                        {campaign.daysLeft}
                      </p>
                      <p className="text-sm text-muted-foreground">days left</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-xl font-semibold mb-4">About This Campaign</h3>
                    <p>{campaign.longDescription}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DonationForm campaignId={campaign.id} campaignTitle={campaign.title} />
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Donation;
