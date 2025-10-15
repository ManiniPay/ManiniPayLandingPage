// src/pages/ContactPage.js

import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-green-900 bg-opacity-80 text-white py-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      <div className="max-w-3xl mx-auto bg-green-700 bg-opacity-60 rounded-2xl shadow-lg p-8 space-y-6">
        <p>
          <strong>Address1:</strong><br />
          Level 1,Dalamax Building Lot1 Nasau<br />
          Backroad,Fiji<br />
        </p>

        <p>
          <strong>Address2:</strong><br />
          AMP Tower 140 St Georges Terrace<br />
          Perth WA 6001.
        </p>

      </div>
    </div>
  );
};

export default ContactPage;
