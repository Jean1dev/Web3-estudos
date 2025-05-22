
export interface Campaign {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  targetAmount: number;
  currentAmount: number;
  backers: number;
  daysLeft: number;
  creator: string;
}

let state: Campaign[] = []

export const fillCampaign = (campaigns: Campaign[]) => {
  state = campaigns;
};

export const getCampaignById = (id: string): Campaign | undefined => {
  return state.find(campaign => campaign.id === id);
};
