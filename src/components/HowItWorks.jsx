import React from 'react';
import { motion } from 'framer-motion';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    { title: "Register Your Name", description: "Create your account with Manini." },
    { title: "Load Money into Manini Wallet", description: "Add funds to your digital wallet." },
    { title: "Select Receivers from Contacts", description: "Choose who to send money to easily." },
    { title: "Instant Exchange Rates", description: "Get the best rates right away." },
    { title: "Send Amount", description: "Transfer money with just a few taps." },
  ];

  const receiverSteps = [
    { title: "Instant Phone Notification", description: "Receiver gets notified of the payment." },
    { title: "Open Manini Pay Wallet", description: "Easily access the received money." },
    { title: "Use Mobile Phone to Pay", description: "Purchase items like milk, bread, or fresh products." },
    { title: "Rest of Amount Stays in Wallet", description: "No worries about leftover balance." },
  ];

  const animationVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      }
    }
  };

  return (
    <div className="how-it-works py-20 px-4 bg-white" style={{ color: 'black' }}>
      <h1 className="text-4xl font-bold text-center mb-10">How Manini Works</h1>

      <div className="steps grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="step bg-green-100 p-2 rounded-lg shadow-lg alignment"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={animationVariants}
            transition={{ delay: index * 0.3, duration: 1 }}
          >
            <h2 className="title-align text-xl font-semibold mb-2">{step.title}</h2>
            <p className='align-desc'>{step.description}</p>
          </motion.div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center my-12 !text-black">For the Receiver</h2>

      <div className="receiver-steps grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {receiverSteps.map((step, index) => (
          <motion.div
            key={index}
            className="receiver-step bg-blue-100 p-6 rounded-lg shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={animationVariants}
            transition={{ delay: index * 0.3, duration: 1 }}
          >
            <h2 className="text-lg font-semibold mb-2">{step.title}</h2>
            <p>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
