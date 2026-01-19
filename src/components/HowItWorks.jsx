import React from "react";
import { motion } from "framer-motion";
import "./HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    {
      title: "Register Your Name",
      description: "Create your account with Manini.",
    },
    {
      title: "Load Money into Manini Wallet",
      description: "Add funds to your digital wallet.",
    },
    {
      title: "Select Receivers from Contacts",
      description: "Choose who to send money to easily.",
    },
    {
      title: "Instant Exchange Rates",
      description: "Get the best rates right away.",
    },
    {
      title: "Send Amount",
      description: "Transfer money with just a few taps.",
    },
  ];

  const receiverSteps = [
    {
      title: "Instant Phone Notification",
      description: "Receiver gets notified of the payment.",
    },
    {
      title: "Open Manini Pay Wallet",
      description: "Easily access the received money.",
    },
    {
      title: "Use Mobile Phone to Pay",
      description: "Purchase items like milk, bread, or fresh products.",
    },
    {
      title: "Rest of Amount Stays in Wallet",
      description: "No worries about leftover balance.",
    },
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

  // Professional Sparkle Background with Rays and Particles
  const SparkleBackground = () => {
    const sparkleCount = 30;
    const rayCount = 6;
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Rays/Beams */}
        {Array.from({ length: rayCount }, (_, i) => {
          const angle = (360 / rayCount) * i;
          const delay = (i * 0.3) % 4;
          return (
            <div
              key={`ray-${i}`}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                width: '2px',
                height: '150%',
                background: `linear-gradient(to bottom, 
                  transparent 0%, 
                  rgba(74, 222, 128, 0.1) 20%,
                  rgba(34, 197, 94, 0.3) 50%,
                  rgba(74, 222, 128, 0.1) 80%,
                  transparent 100%)`,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                transformOrigin: 'center',
                animation: `ray-rotate 20s linear infinite`,
                animationDelay: `${delay}s`,
                boxShadow: '0 0 20px rgba(74, 222, 128, 0.5)',
              }}
            />
          );
        })}

        {/* Sparkle Particles */}
        {Array.from({ length: sparkleCount }, (_, i) => {
          const size = 2 + (i % 3);
          const left = (i * 23.7) % 100;
          const top = (i * 31.3) % 100;
          const delay = (i * 0.15) % 3;
          const duration = 3 + (i % 4);
          const opacity = 0.6 + (i % 3) * 0.15;
          return (
            <div
              key={`sparkle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                backgroundColor: `rgba(74, 222, 128, ${opacity})`,
                boxShadow: `
                  0 0 ${size * 2}px rgba(74, 222, 128, 0.8),
                  0 0 ${size * 4}px rgba(34, 197, 94, 0.6),
                  0 0 ${size * 6}px rgba(16, 185, 129, 0.4)
                `,
                animation: `sparkle-twinkle ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* Moving Particles */}
        {Array.from({ length: Math.floor(sparkleCount * 0.6) }, (_, i) => {
          const size = 1 + (i % 2);
          const left = (i * 37.1) % 100;
          const duration = 8 + (i % 6);
          const delay = (i * 0.2) % 5;
          const animType = i % 3 === 0 ? 'particle-float' : i % 3 === 1 ? 'particle-float-left' : 'particle-float-right';
          return (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                backgroundColor: `rgba(34, 197, 94, ${0.7 + (i % 2) * 0.2})`,
                boxShadow: `
                  0 0 ${size * 3}px rgba(74, 222, 128, 0.9),
                  0 0 ${size * 6}px rgba(34, 197, 94, 0.7)
                `,
                animation: `${animType} ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* Glowing Orbs */}
        {Array.from({ length: Math.floor(sparkleCount * 0.2) }, (_, i) => {
          const size = 4 + (i % 3);
          const left = (i * 47.3) % 100;
          const top = (i * 53.7) % 100;
          const duration = 12 + (i % 8);
          const delay = (i * 0.4) % 6;
          return (
            <div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                backgroundColor: `rgba(16, 185, 129, 0.4)`,
                boxShadow: `
                  0 0 ${size * 4}px rgba(74, 222, 128, 0.8),
                  0 0 ${size * 8}px rgba(34, 197, 94, 0.6),
                  0 0 ${size * 12}px rgba(16, 185, 129, 0.4)
                `,
                animation: `orb-pulse ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div 
      className="how-it-works py-6 sm:py-12 px-3 sm:px-6 text-white relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at top, #0a0a0a 0%, #000000 50%, #0a1628 100%)`,
      }}
    >
      {/* Sparkle Background */}
      <SparkleBackground />
      
      {/* Sparkle Animation CSS */}
      <style>{`
        @keyframes ray-rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
            opacity: 0.3;
          }
        }
        @keyframes sparkle-twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes particle-float {
          0% {
            transform: translateY(calc(100vh + 50px)) translateX(0) scale(0.5);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) translateX(30px) scale(1);
            opacity: 0;
          }
        }
        @keyframes particle-float-left {
          0% {
            transform: translateY(calc(100vh + 50px)) translateX(0) scale(0.5);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) translateX(-25px) scale(1);
            opacity: 0;
          }
        }
        @keyframes particle-float-right {
          0% {
            transform: translateY(calc(100vh + 50px)) translateX(0) scale(0.5);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) translateX(40px) scale(1);
            opacity: 0;
          }
        }
        @keyframes orb-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.3);
          }
        }
      `}</style>
      
      {/* Main Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-10 leading-snug sm:leading-tight">
        How Manini Works
      </h1>

      {/* Sender Steps */}
      <div className="steps grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="step backdrop-blur-sm flex flex-col gap-2 py-4 md:!py-[30px] px-4 sm:px-5 rounded-lg shadow-lg text-center hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 border"
            style={{
              background:
                "linear-gradient(135deg, #2D7A44, #183f24)",
              borderColor: "rgba(18, 53, 30, 0.9)",
              boxShadow: "0 0 22px rgba(45,122,68,0.45)",
            }}
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
            transition={{ delay: index * 0.15 }}
          >
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 mt-0 leading-[1.1] sm:leading-snug md:leading-snug text-white">
              {step.title}
            </h2>

            <p className="text-base sm:text-base leading-relaxed -mt-2 sm:mt-0 text-gray-300">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Receiver Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold !text-white text-center mt-8 sm:mt-0 pt-4 sm:pt-0 mb-6 sm:mb-10">
        For The Receiver
      </h1>

      {/* Receiver Steps */}
      <div className="receiver-steps grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {receiverSteps.map((step, index) => (
          <motion.div
            key={index}
            className="receiver-step backdrop-blur-sm pt-1 py-4 md:!py-[30px] px-4 sm:px-5 rounded-lg shadow-lg text-center hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 border"
            style={{
              background:
                "linear-gradient(135deg, #2D7A44, #183f24)",
              borderColor: "rgba(18, 53, 30, 0.9)",
              boxShadow: "0 0 22px rgba(45,122,68,0.45)",
            }}
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
            transition={{ delay: index * 0.15 }}
          >
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 mt-0 leading-[1.1] sm:leading-snug md:leading-snug text-white">
              {step.title}
            </h2>

            <p className="text-base sm:text-base leading-relaxed -mt-2 sm:mt-0 text-gray-300">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
