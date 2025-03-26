
import React, { useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import CampaignCard from '../components/CampaignCard';
import Navbar from '../components/Navbar';
import { Campaign } from '../lib/campaigns';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { rpcGetVaquinhas } from '@/lib/get-vaquinhas';
import NotConnectedAlert from '@/components/NotConnectedAlert';

const Index = () => {
  const { wallet, connected } = useWallet();
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);

  useEffect(() => {
    if (wallet && connected) {
      rpcGetVaquinhas(wallet as any).then((response) => {
        if (response.error) {
          throw new Error('Failed to fetch campaigns');
        }

        setCampaigns(response.data);
      });
    }

  }, [wallet, connected]); 

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-blue-light to-white">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-32 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Make a Difference with Fundiverse
            </h1>
            <p className="text-xl text-muted-foreground">
              Support impactful projects and be part of meaningful change. 
              Every contribution counts.
            </p>
          </motion.div>
          
          {!connected ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <NotConnectedAlert />
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign, index) => (
                <motion.div 
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <CampaignCard campaign={campaign} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
