
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { rpcDonate } from '@/lib/donate';

interface DonationFormProps {
  campaignId: string;
  campaignTitle: string;
}

const DonationForm: React.FC<DonationFormProps> = ({ campaignId, campaignTitle }) => {
  const [amount, setAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const wallet = useAnchorWallet();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    rpcDonate(wallet, campaignId, Number(amount)).then((res) => {
      if (res.error) {
        setIsSubmitting(false);
        alert('An error occurred while processing your donation. Please try again.');
        return;
      }

      setIsSubmitting(false);
      navigate(`/success?campaign=${campaignId}&amount=${amount}`);
    });
  };

  const predefinedAmounts = [5, 10, 25, 50, 100];

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Heart className="w-5 h-5 mr-2 text-blue-accent" />
        Support this campaign
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Donation Amount
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {predefinedAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${amount === presetAmount.toString()
                    ? 'bg-blue-accent text-white'
                    : 'bg-white/50 hover:bg-blue-accent/10'
                  }`}
                onClick={() => setAmount(presetAmount.toString())}
              >
                ${presetAmount}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full pl-8 pr-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-blue-accent focus:border-transparent transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Your Name (Optional)
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-blue-accent focus:border-transparent transition-colors"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Leave a Message (Optional)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share why you're supporting this campaign"
            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-blue-accent focus:border-transparent transition-colors resize-none"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !amount}
          className="w-full py-4 rounded-lg bg-blue-accent text-white font-medium shadow-md hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Donate Now'
          )}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
