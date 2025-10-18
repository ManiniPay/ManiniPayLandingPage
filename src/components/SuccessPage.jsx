import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const leadId = location.state?.leadId || 'N/A';

  return (
    <div 
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: `#0A8D5E`,
      }}
    >
      <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8 leading-relaxed font-sans">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center">
          🎉 You have successfully joined the movement!
        </h1>
        
        <p className="text-center mb-8 text-lg md:text-xl">
          Thank you for your interest in ManiniPay. We're excited to have you on board! 
          Our team will contact you soon to discuss how we can help you with your financial needs.
        </p>

        {/* Lead ID Display */}
        <div className="text-center mb-8">
          <div className="bg-white bg-opacity-10 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-sm mb-2 opacity-90">Your Reference ID:</p>
            <p className="text-xl font-mono font-bold bg-white bg-opacity-20 rounded px-4 py-2 inline-block">
              {leadId}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200"
          >
            Return to Home
          </button>
          
          <button
            onClick={() => window.location.href = '/#contact'}
            className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
          >
            Contact Us
          </button>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-sm opacity-90">
            Need immediate assistance? 
            <a href="mailto:support@maninipay.com" className="text-white hover:underline ml-1 font-semibold">
              Contact our support team
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm opacity-75">
          © 2025 Manini Pay Pty Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
