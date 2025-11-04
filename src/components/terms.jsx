import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: `#0A8D5E`,
      }}
    >
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 right-6 bg-green-400 hover:bg-green-300 px-6 py-3 rounded-full font-semibold transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 z-10"
        style={{ color: 'black' }}
      >
        Back to Home
      </button>
      <div className="terms-of-use w-full px-4 md:px-8 lg:px-12 py-6 md:py-8 leading-relaxed font-sans">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center">MANINI PAY TERMS OF USE</h1>
        <p className="text-center mb-6"><strong>Effective Date:</strong> August 25, 2025</p>

        <p className="mb-4">
          Manini Pay Pty Ltd (ABN [Insert ABN], "Manini Pay," "we," "us," or "our") provides payment services 
          through our live payment hybrid platform, mobile app, website, and related features (collectively, 
          the "Services"). These Terms of Use ("Terms") govern your access to and use of the Services. By 
          accessing or using the Services, creating an account, or otherwise engaging with us, you ("you" or 
          "User") agree to be bound by these Terms, our Privacy Policy (incorporated by reference), and any 
          additional terms presented to you (e.g., for specific features).
        </p>

        <p className="mb-4">
          If you do not agree, do not use the Services. These Terms form a legally binding contract. We may 
          update these Terms at any time; material changes will be notified via email, app notification, or our 
          website. Your continued use constitutes acceptance. These Terms apply globally, with region-specific 
          provisions for the European Economic Area (EEA)/United Kingdom (UK), Asia-Pacific (APAC), and 
          Australia/New Zealand (ANZ) to ensure compliance with local laws.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Eligibility and Account Registration</h2>
        <p className="mb-2">To use the Services, you must:</p>
        <ul className="list-disc ml-5 space-y-1 mb-4">
          <li>Be at least 18 years old (or the age of majority in your jurisdiction, if higher).</li>
          <li>Provide accurate, complete, and current information during registration.</li>
          <li>Maintain the security of your account credentials and notify us immediately of any unauthorized access.</li>
        </ul>

        <p className="mb-4">
          <strong>Kids' Account Compliance:</strong> The Services are not intended for children under 16 years old (or higher 
          per local laws, e.g., 18 in some APAC jurisdictions). If you are under 16, you may only use the 
          Services under the direct supervision and with explicit consent of a parent or legal guardian, who 
          must create and manage a linked "Kids' Account." Parents/guardians are solely responsible for all 
          activities on such accounts, including compliance with applicable children's privacy laws (e.g., GDPR 
          Article 8 in EEA/UK for consent to data processing; PDPA safeguards in APAC; ACL protections in 
          ANZ). We do not knowingly collect data from children without verifiable parental consent. If we 
          discover unauthorized use by a minor, we may suspend or terminate the account without liability. 
          Users agree to indemnify us for any violations.
        </p>

        <p className="mb-4">
          You represent that you are not prohibited from using the Services under applicable laws (e.g., 
          sanctions lists in EEA/UK, APAC export controls, or ANZ AML/CTF regulations).
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Description of Services</h2>
        <p className="mb-4">
          Manini Pay offers a live payment hybrid platform enabling seamless hybrid transactions, combining 
          digital (e.g., app-based wallets, online transfers) and in-person methods (e.g., QR codes, NFC taps, 
          point-of-sale integrations). Features include real-time payments, currency conversions, and 
          analytics. Availability may vary by region due to regulatory requirements (e.g., PSD2 compliance in 
          EEA/UK for open banking; APAC fintech licensing; AFSL requirements in Australia).
        </p>

        <p className="mb-2">
          <strong>Tribal Authorisations and Cultural Hierarchy (Updated for 2025):</strong> Our "Tribes" feature allows users 
          to form group accounts (e.g., family, community, or cultural groups) with hierarchical permissions. 
          Updated as of 2025, this includes:
        </p>
        <ul className="list-disc ml-5 space-y-1 mb-4">
          <li><strong>Cultural Hierarchy:</strong> Customizable roles respecting cultural sensitivities (e.g., "Elders" or 
          admins with veto power over transactions, inspired by indigenous hierarchies in ANZ/APAC 
          regions like Aboriginal/Torres Strait Islander or Pacific Island communities).</li>
          <li><strong>Authorisations:</strong> Transactions require approvals based on hierarchy (e.g., multi-signature for 
          group funds). Users must designate roles fairly and without discrimination.</li>
          <li><strong>Compliance:</strong> Tribes must comply with anti-discrimination laws (e.g., Equality Act 2010 in UK; 
          Human Rights Act 1993 in New Zealand). We provide tools for internal dispute resolution but 
          disclaim liability for intra-tribe conflicts. Users indemnify us for misuse.</li>
        </ul>

        <p className="mb-4">
          All features are provided "as is" and subject to availability. We may modify or discontinue features 
          without notice, without liability.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. User Obligations and Prohibited Conduct</h2>
        <p className="mb-2">You agree to:</p>
        <ul className="list-disc ml-5 space-y-1 mb-4">
          <li>Use the Services only for lawful purposes and in compliance with these Terms and applicable 
          laws (e.g., AML/CTF in ANZ/APAC; PSD2 anti-fraud in EEA/UK).</li>
          <li>Not engage in prohibited activities, including fraud, money laundering, unauthorized 
          transactions, or disrupting the Services.</li>
          <li>Accurately represent transactions and indemnify us against losses from your misuse.</li>
          <li>For Tribes: Ensure all members consent to hierarchies and authorisations; resolve disputes 
          internally.</li>
        </ul>

        <p className="mb-4">
          In EEA/UK and ANZ, you have statutory rights (e.g., ACL guarantees in Australia/New Zealand for 
          services to be fit for purpose; Consumer Rights Act in UK for fair terms). We comply with these, but 
          you must notify us of issues promptly.
        </p>

        <p className="mb-4">
          You grant us a non-exclusive, royalty-free license to use data you provide for Service operation, 
          subject to our Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Fees, Payments, and Refunds</h2>
        <p className="mb-4">
          Fees for Services (e.g., transaction charges) are detailed on our website or app. You authorize us to 
          charge your linked payment methods. Refunds are at our discretion, subject to regional laws (e.g., 
          14-day cooling-off in EEA/UK under Consumer Contracts Regulations; ACL remedies in ANZ).
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
        <p className="mb-4">
          All content, trademarks, and technology in the Services are owned by or licensed to Manini Pay. You 
          receive a limited, non-transferable license for personal use only. No reverse engineering or 
          unauthorized copying.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Termination and Suspension</h2>
        <p className="mb-4">
          We may suspend or terminate your account at any time for violations, suspected fraud, or legal 
          reasons, without liability. Upon termination, you must cease use and pay outstanding fees. In 
          EEA/UK/APAC/ANZ, we provide reasonable notice where required by law (e.g., ACL fairness in ANZ).
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">7. Disclaimers and Limitations of Liability</h2>
        <p className="mb-2"><strong>Disclaimers:</strong></p>
        <p className="mb-4">
          THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS 
          OR IMPLIED (E.G., MERCHANTABILITY, FITNESS FOR PURPOSE, NON-INFRINGEMENT). WE DO NOT 
          GUARANTEE UNINTERRUPTED ACCESS, ACCURACY, OR SECURITY. IN EEA/UK/ANZ, THIS DOES NOT 
          AFFECT STATUTORY GUARANTEES (E.G., ACL IN AUSTRALIA/NEW ZEALAND; CONSUMER RIGHTS ACT 
          IN UK).
        </p>

        <p className="mb-2"><strong>Limitations of Liability:</strong></p>
        <p className="mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, MANINI PAY SHALL NOT BE 
          LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (E.G., LOST PROFITS, 
          DATA LOSS). OUR TOTAL LIABILITY IS CAPPED AT THE FEES YOU PAID IN THE 12 MONTHS PRIOR TO 
          THE CLAIM. THIS APPLIES EVEN IF ADVISED OF POSSIBLE DAMAGES. IN EEA/UK/APAC/ANZ, LIABILITY 
          FOR GROSS NEGLIGENCE, WILLFUL MISCONDUCT, OR STATUTORY RIGHTS IS NOT EXCLUDED (E.G., 
          DEATH/INJURY UNDER ACL).
        </p>

        <p className="mb-4">
          <strong>Indemnification:</strong> You agree to indemnify, defend, and hold harmless Manini Pay from any claims, 
          losses, or damages arising from your use of the Services, violations of these Terms, or infringement 
          of third-party rights (including Tribes-related disputes).
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">8. Governing Law and Dispute Resolution</h2>
        <p className="mb-4">
          These Terms are governed by the laws of Western Australia, Australia, without regard to conflicts of 
          laws, except as overridden below for regional compliance:
        </p>
        <ul className="list-disc ml-5 space-y-1 mb-4">
          <li><strong>EEA/UK:</strong> Governed by the laws of England and Wales (or your EEA country if mandatory). 
          Disputes may be resolved via alternative dispute resolution (e.g., UK Online Dispute 
          Resolution platform) or courts in your residence.</li>
          <li><strong>APAC:</strong> Governed by Singapore law for general APAC users (or local laws if mandatory, e.g., 
          Japan for Japanese users). Disputes via arbitration in Singapore under SIAC rules, where 
          enforceable.</li>
          <li><strong>Australia/New Zealand:</strong> Governed by laws of Western Australia (Australia) or New Zealand 
          (as applicable). Disputes via ACCC/ tribunals in Australia or Commerce Commission in New 
          Zealand; arbitration in Perth if agreed.</li>
        </ul>

        <p className="mb-4">
          For all regions, we prefer informal resolution first (contact legal.au@maninipay.com). Class actions 
          are waived; disputes are individual only.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">9. Region-Specific Provisions</h2>
        <ul className="list-disc ml-5 space-y-1 mb-4">
          <li><strong>EEA/UK:</strong> You have a 14-day right to cancel without reason. We comply with GDPR; see 
          Privacy Policy. Unfair terms are void.</li>
          <li><strong>APAC:</strong> Consent to data processing aligns with PDPA/APPI. Services comply with local fintech 
          regulations; you confirm eligibility.</li>
          <li><strong>Australia/New Zealand:</strong> These Terms incorporate ACL guarantees (Australia) and Consumer 
          Guarantees Act (New Zealand). Unfair contract terms are unenforceable. For AML/CTF, you 
          consent to identity verification.</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">10. Miscellaneous</h2>
        <ul className="list-disc ml-5 space-y-1 mb-4">
          <li><strong>Severability:</strong> Invalid provisions do not affect others.</li>
          <li><strong>Assignment:</strong> We may assign these Terms; you may not without consent.</li>
          <li><strong>Force Majeure:</strong> No liability for events beyond control (e.g., natural disasters).</li>
          <li><strong>Entire Agreement:</strong> These Terms supersede prior agreements.</li>
        </ul>

        <p className="mb-4">
          <strong>Contact Us:</strong> For questions, email legal.au@maninipay.com or write to: Manini Pay Pty Ltd, Level 29, 
          221 St Georges Terrace, Perth 6000, Australia.
        </p>

        <p className="mt-6 text-center">© 2025 Manini Pay Pty Ltd (ABN 28 650 149 205). All rights reserved. Effective Date: August 25, 2025.</p>
      </div>
    </div>
  );
};

export default Terms;
