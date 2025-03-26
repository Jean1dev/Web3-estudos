
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Campaign } from '../lib/campaigns';

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const progress = (campaign.currentAmount / campaign.targetAmount) * 100;
  const location = useLocation();
  
  // Determine if we're in a router context by checking if location is available
  const isInRouterContext = location !== null;
  
  const cardContent = (
    <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={campaign.image} 
          alt={campaign.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{campaign.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{campaign.description}</p>
        
        <div className="mt-auto">
          <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
            <div 
              className="h-full bg-blue-accent rounded-full" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="font-medium">{Math.round(progress)}% Funded</span>
            <span className="text-muted-foreground">{campaign.daysLeft} days left</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Only use Link if we're in a router context, otherwise use a div
  if (isInRouterContext) {
    return <Link to={`/donation/${campaign.id}`}>{cardContent}</Link>;
  }
  
  return <div>{cardContent}</div>;
};

export default CampaignCard;
