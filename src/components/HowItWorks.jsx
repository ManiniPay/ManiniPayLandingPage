import React from "react";
import { motion } from "framer-motion";
import "./HowItWorks.css";

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
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    },
  };

  return (
    <div className="how-it-works bg-white py-6 sm:py-12 px-3 sm:px-6 text-black">
      {/* Main Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-10 leading-snug sm:leading-tight">
  How Manini Works
</h1>

      {/* Sender Steps */}
      <div className="steps grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="step bg-green-100 p-4 sm:p-5 rounded-lg shadow-lg border-2 border-dashed border-green-400 text-center hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500"
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
            transition={{ delay: index * 0.15 }}
          >
              <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 mt-0 leading-[1.1] sm:leading-snug md:leading-snug">
    {step.title}
  </h2>

<p className="text-base sm:text-base leading-relaxed -mt-2 sm:mt-0">
  {step.description}
</p>
          </motion.div>
        ))}
      </div>

      {/* Receiver Title */}
    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-6 sm:mt-0 mb-6 sm:mb-10">
  For The Receiver
</h1>


      {/* Receiver Steps */}
      <div className="receiver-steps grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {receiverSteps.map((step, index) => (
         <motion.div
  key={index}
  className="receiver-step bg-blue-100 pt-1 px-4 pb-4 sm:p-5 rounded-lg shadow-lg border-2 border-dashed border-blue-400 text-center hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500"
  initial="hidden"
  whileInView="visible"
  variants={animationVariants}
  transition={{ delay: index * 0.15 }}
>
  <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 mt-0 leading-[1.1] sm:leading-snug md:leading-snug">
    {step.title}
  </h2>

  <p className="text-base sm:text-base leading-relaxed -mt-2 sm:mt-0">
    {step.description}
  </p>
</motion.div>



        ))}
      </div>
    </div>
  );
};

export default HowItWorks;