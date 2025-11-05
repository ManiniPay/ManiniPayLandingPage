import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
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
        className="absolute top-6 left-1/2 transform -translate-x-1/2 md:left-auto md:right-6 md:transform-none bg-green-400 hover:bg-green-300 px-6 py-3 rounded-full font-semibold transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform md:hover:scale-105 z-10"
        style={{ color: 'black' }}
      >
        Back to Home
      </button>
      <div className="privacy-policy w-full px-4 md:px-8 lg:px-12 pt-20 md:pt-6 py-6 md:py-8 leading-relaxed font-sans">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center">Manini Pay Hybrid Payment Platform Privacy Policy</h1>
        <p><strong>Effective Date:</strong> August 25, 2025</p>

      <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">1. Introduction</h2>
      <p>
        Manini Pay ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains 
        how we collect, use, disclose, and safeguard your information when you use our Hybrid Payment 
        Platform, including our website, mobile application, and related services. By using our services, you 
        consent to the practices described in this policy.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">2. Information We Collect</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li><strong>Account Registration:</strong> Name, contact details (email, phone number), and payment preferences.</li>
        <li><strong>Compliance Processes:</strong> Government-issued identification, tax numbers, and other data required for KYC (Know Your Customer) and AML (Anti-Money Laundering) compliance.</li>
        <li><strong>Transactional Activity:</strong> Payment history, bank account details, and device/browser data (IP address, geolocation).</li>
        <li><strong>User Communications:</strong> Records of support inquiries, feedback, or complaints.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">3. Use of Information</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li>Provide, operate, and improve our services.</li>
        <li>Verify identity and ensure compliance with AML/KYC regulations.</li>
        <li>Process transactions and prevent fraud.</li>
        <li>Communicate service updates, security alerts, or policy changes.</li>
        <li>Conduct risk assessments and internal analytics.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">4. Disclosure of Information</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li>Service Providers: Payment processors, IT vendors, and compliance tools.</li>
        <li>Regulatory Authorities: To meet legal obligations (e.g., AML reporting).</li>
        <li>Law Enforcement: When required by law or to protect our rights.</li>
      </ul>
      <p>Data is never sold to third parties for marketing purposes.</p>

      <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">5. Automated Decision-Making</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li>Fraud detection and prevention.</li>
        <li>Identity verification during onboarding.</li>
        <li>Risk assessments to safeguard platform integrity.</li>
      </ul>
      <p>You may request human intervention, contest decisions, or seek explanations by contacting us (Section 12).</p>

      <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">6. Data Retention</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li><strong>During Engagement:</strong> For the duration of your account activity.</li>
        <li><strong>Post-Termination:</strong> As required by law (e.g., AML regulations) or internal policies to manage fraud risks, legal claims, or security needs.</li>
      </ul>
      <p>Data is securely deleted or anonymized after retention periods expire, unless otherwise prohibited.</p>

      <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">7. Data Security</h2>
      <p>We implement industry-standard technical and organizational measures, including encryption, access controls, and regular audits, to protect your data from unauthorized access or breaches.</p>

      <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">8. International Data Transfers</h2>
      <p>Your data may be stored or processed in jurisdictions with different data protection laws. By using our services, you consent to such transfers, which are governed by safeguards like Standard Contractual Clauses (SCCs).</p>

      <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">9. Your Rights</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li>Access, correct, or delete inaccurate data.</li>
        <li>Restrict processing or object to specific uses.</li>
        <li>Request data portability.</li>
        <li>Withdraw consent (where applicable).</li>
      </ul>
      <p>To exercise these rights, contact us via Section 12. Note: Legal obligations may limit certain requests.</p>

      <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">10. Policy Updates</h2>
      <p>We may revise this Policy to reflect regulatory changes or operational needs. Material updates will be communicated via email or in-app notifications. Continued use constitutes acceptance of revised terms.</p>

      <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-2">PART A: AUSTRALIAN PRIVACY COMPLIANCE</h2>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">1. Legal Framework</h3>
      <p>Manini Pay Pty Ltd (“Manini Pay,” “we,” “us,” or “our”) is bound by:</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>The Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth).</li>
        <li>The Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth) (“AML/CTF Act”).</li>
      </ul>
      <p>This section applies exclusively to Australian customers and prevails over any conflicting terms in the broader Privacy Policy.</p>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">2. Jurisdiction</h3>
      <p>For Australian customers, this Privacy Policy is governed by and interpreted in accordance with the laws of Western Australia, Australia. Any disputes shall be resolved exclusively in the courts of Victoria.</p>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">3. Disclosure of Personal Information</h3>
      <ul className="list-disc ml-5 space-y-1">
        <li>As required or permitted by law (e.g., under the AML/CTF Act).</li>
        <li>To credit reporting bodies (CRBs) for credit assessments.</li>
        <li>To the Australian Document Verification Service (DVS) to validate identification documents.</li>
      </ul>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">4. Cross-Border Data Transfers</h3>
      <p>Your personal information may be transferred to, processed, or stored in jurisdictions outside Australia (e.g., the United States). We implement safeguards including:</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>Assessing the security measures of overseas recipients.</li>
        <li>Contractual obligations requiring third parties to adhere to our privacy standards.</li>
        <li>Monitoring and auditing data handling practices.</li>
      </ul>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">5. Credit-Related Personal Information</h3>
      <ul className="list-disc ml-5 space-y-1">
        <li>Permitted identification details: Name, date of birth, addresses, driver’s licence number.</li>
        <li>Credit history: Applications for credit, previous/default accounts, court judgments, insolvency records.</li>
        <li>Derived assessments: Creditworthiness ratings from CRBs or internal evaluations.</li>
      </ul>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">6. Access & Correction Rights</h3>
      <ul className="list-disc ml-5 space-y-1">
        <li>Access: You may request access to personal information we hold. We will provide reasons for denying access.</li>
        <li>Correction: You may request corrections to incomplete, inaccurate, or outdated data. If we refuse, we will note your request alongside the disputed information.</li>
      </ul>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">7. Complaints Resolution</h3>
      <p>Process: Notify us of privacy concerns via the contact details below. We will acknowledge your complaint within 5 business days and aim to resolve it within 30 days.</p>
      <p>Escalation: Unresolved complaints may be escalated to the Office of the Australian Information Commissioner (OAIC):</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>Website: <a href="https://www.oaic.gov.au/" className="text-blue-600 hover:underline">https://www.oaic.gov.au/</a></li>
        <li>Post: GPO Box 5218, Sydney NSW 2001</li>
        <li>Email: enquiries@oaic.gov.au</li>
        <li>Fax: +61 2 9284 9666</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-2">PART B: GENERAL PRIVACY POLICY</h2>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">Introduction</h3>
      <p>Manini Pay Pty Ltd and its affiliates (collectively, “Manini Pay,” “we,” “us,” or “our”) value your privacy and are committed to protecting your personal data in compliance with global privacy laws. This General Privacy Policy applies worldwide to our services, including our mobile app, website, payment platforms, and related offerings, except where overridden by region-specific sections (e.g., PART A for Australian customers).</p>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">1. Types of Data We Collect and Lawful Bases for Processing</h3>
      <p>We collect personal data necessary for our services, including identification details, financial information, device data, and usage patterns.</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>Consent: Where you explicitly agree (e.g., for marketing).</li>
        <li>Contract: To fulfill our services (e.g., processing payments).</li>
        <li>Legal Obligation: For compliance (e.g., AML/CTF requirements).</li>
        <li>Legitimate Interests: For security, fraud prevention, and service improvement.</li>
      </ul>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">2. How We Use and Share Your Data</h3>
      <p>We use data for purposes like providing services, personalization, and analytics. We share data with affiliates, service providers, and regulators as needed. Sharing is limited to what's necessary and protected by contracts. For Australian-specific disclosures, see PART A, Section 3. We do not sell your data.</p>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">3. Data Retention</h3>
      <ul className="list-disc ml-5 space-y-1">
        <li>General Periods: Account data is retained for the life of your account plus 5-7 years post closure for dispute resolution and audits.</li>
        <li>Transactional Data: Up to 10 years for financial compliance.</li>
        <li>Marketing Data: Until consent withdrawal or 2 years of inactivity.</li>
        <li>Security Logs: 1-2 years for fraud investigations.</li>
      </ul>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">4. Automated Decision-Making</h3>
      <p>We use automated tools for fraud detection or credit scoring. Safeguards ensure fairness, audits for bias, and human intervention is available where required.</p>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">5. User Rights</h3>
      <p>You have rights under global laws, typically within 30 days:</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>Access: Request details of your data.</li>
        <li>Rectification: Correct inaccurate data.</li>
        <li>Erasure: Delete data where no longer needed.</li>
        <li>Restriction/Objection: Limit processing or object.</li>
        <li>Portability: Receive data in a portable format.</li>
        <li>Withdraw Consent: At any time.</li>
        <li>Automated Decisions: Challenge and request human review.</li>
      </ul>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">6. International Data Transfers</h3>
      <p>Data may be transferred globally with safeguards like Standard Contractual Clauses, binding corporate rules, or adequacy decisions. By using our services, you consent to transfers.</p>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">7. Data Security</h3>
      <p>We implement robust measures such as encryption and access controls. Report suspected breaches immediately.</p>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">8. Children's Privacy</h3>
      <p>Our services are not for children under 16. We do not knowingly collect children's data without parental consent. If discovered, we delete it promptly.</p>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">9. Complaints and Oversight</h3>
      <p>Contact us first at privacy@maninipay.com. Unresolved issues can be escalated to relevant authorities (UK/EEA: ICO, APAC: PDPC, Australia: OAIC). We aim to resolve complaints within 30 days.</p>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">10. Changes to This Policy</h3>
      <p>We may update this Policy for legal or operational reasons. Material changes will be notified via email or our app. Review periodically; continued use implies acceptance.</p>

      <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">Contact Manini Pay</h3>
      <ul className="list-disc ml-5 space-y-1">
        <li>Global Privacy Officer: legal.global@maninipay.com</li>
        <li>Australia/New Zealand matters: legal.au@maninipay.com</li>
        <li>Postal Address: Level 29, 221 St Georges Terrace, Perth 6000, Australia</li>
      </ul>

      <p className="mt-6 text-center">© 2025 Manini Pay Pty Ltd (ABN 28 650 149 205). All rights reserved. Effective Date: August 25, 2025.</p>
     </div>
    </div>
  );
};

export default Privacy;
