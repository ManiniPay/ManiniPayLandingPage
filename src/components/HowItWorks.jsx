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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="how-it-works" >
      <h1>How Manini Works</h1>
      <div className="steps">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={animationVariants}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="step"
          >
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </motion.div>
        ))}
      </div>
      <h2>For the Receiver</h2>
      <div className="receiver-steps">
        {receiverSteps.map((step, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={animationVariants}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="receiver-step"
          >
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;