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
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 leading-relaxed font-sans">
        {/* Success Icon */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <svg 
              className="w-10 h-10 sm:w-12 sm:h-12 text-white" 
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
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center px-2">
          🎉 You have successfully joined the movement!
        </h1>
        
        <p className="text-center mb-6 sm:mb-8 text-base sm:text-lg md:text-xl px-2 sm:px-4">
          Thank you for your interest in ManiniPay. We're excited to have you on board! 
          Our team will contact you soon to discuss how we can help you with your financial needs.
        </p>

        {/* Lead ID Display */}
        <div className="text-center mb-6 sm:mb-8 px-2">
          <div className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6 max-w-sm sm:max-w-md mx-auto">
            <p className="text-xs sm:text-sm mb-2 opacity-90">Your Reference ID:</p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-mono font-bold bg-white bg-opacity-20 rounded px-2 sm:px-4 py-2 inline-block break-all">
              {leadId}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-2">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200 text-sm sm:text-base"
          >
            Return to Home
          </button>
          
          <button
            onClick={() => window.location.href = '/#contact'}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200 text-sm sm:text-base"
          >
            Contact Us
          </button>
        </div>

        {/* Additional Info */}
        <div className="text-center px-2">
          <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
            Need immediate assistance? 
            <a href="mailto:info@maninipay.com" className="text-white hover:underline ml-1 font-semibold">
              Contact our support team
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm opacity-75 px-2">
          © 2025 Manini Pay Pty Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
