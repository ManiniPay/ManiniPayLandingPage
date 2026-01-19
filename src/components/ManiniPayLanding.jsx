import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";
import HowItWorks from "./HowItWorks";
import Contact from "./contactSection";
import { Link } from "react-router-dom";

export const ManiniPayLanding = () => {
  const [showVideo, setShowVideo] = useState(false);
  
  // Create refs for the sections
  const howItWorksRef = useRef(null);
  const problemRef = useRef(null);
  const storyRef = useRef(null);
  const solutionRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Professional Sparkle Background Component with Rays and Particles
  const SparkleBackground = ({ intensity = 'medium', sectionId = '' }) => {
    const sparkleCount = intensity === 'high' ? 40 : intensity === 'medium' ? 30 : 20;
    const rayCount = intensity === 'high' ? 8 : intensity === 'medium' ? 6 : 4;
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
        {/* Animated Rays/Beams */}
        {Array.from({ length: rayCount }, (_, i) => {
          const angle = (360 / rayCount) * i;
          const delay = (i * 0.3) % 4;
          return (
            <div
              key={`ray-${sectionId}-${i}`}
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

        {/* Sparkle Particles - Small twinkling dots */}
        {Array.from({ length: sparkleCount }, (_, i) => {
          const size = 2 + (i % 3); // 2px, 3px, or 4px
          const left = (i * 23.7) % 100;
          const top = (i * 31.3) % 100;
          const delay = (i * 0.15) % 3;
          const duration = 3 + (i % 4); // 3-6 seconds
          const opacity = 0.6 + (i % 3) * 0.15; // 0.6-0.9
          
          return (
            <div
              key={`sparkle-${sectionId}-${i}`}
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

        {/* Moving Particles - Floating up smoothly */}
        {Array.from({ length: Math.floor(sparkleCount * 0.6) }, (_, i) => {
          const size = 1 + (i % 2); // 1px or 2px
          const left = (i * 37.1) % 100;
          const duration = 8 + (i % 6); // 8-13 seconds
          const delay = (i * 0.2) % 5;
          const animType = i % 3 === 0 ? 'particle-float' : i % 3 === 1 ? 'particle-float-left' : 'particle-float-right';
          
          return (
            <div
              key={`particle-${sectionId}-${i}`}
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

        {/* Glowing Orbs - Large floating elements */}
        {Array.from({ length: Math.floor(sparkleCount * 0.2) }, (_, i) => {
          const size = 4 + (i % 3); // 4px, 5px, or 6px
          const left = (i * 47.3) % 100;
          const top = (i * 53.7) % 100;
          const duration = 12 + (i % 8); // 12-19 seconds
          const delay = (i * 0.4) % 6;
          
          return (
            <div
              key={`orb-${sectionId}-${i}`}
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

  // Hero Video Card - uses local /public/hero.mp4 with gradient frame + scroll scale
  const HeroVideo = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    // Scroll-based scale effect: hero video grows towards center of viewport,
    // and subtly shrinks when user scrolls away (up or down)
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start center", "end start"],
    });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.06, 0.92]);

    const handlePlay = async () => {
      if (!videoRef.current || isLoading) return;
      try {
        setIsLoading(true);
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing hero video:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    };

    return (
      <motion.div
        ref={containerRef}
        className="w-full max-w-5xl mx-auto mb-10 md:mb-14 relative z-10 origin-center"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        style={{ scale }}
      >
        {/* Vertical gradient behind video that fades out towards the bottom */}
        <div className="relative rounded-[26px] pb-4">
          <div
            className="pointer-events-none absolute inset-x-4 top-0 h-[140%] -z-10 rounded-[32px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(16,185,129,0.45) 0%, rgba(5,150,105,0.25) 35%, rgba(15,118,110,0.12) 60%, rgba(0,0,0,0) 100%)",
            }}
          />

          <div
            className="rounded-2xl p-[10px] w-full"
            style={{
              // Top-to-bottom gradient: visible at top + upper sides, fades out before bottom
              background:
                "linear-gradient(180deg, rgba(74,222,128,0.55) 0%, rgba(34,197,94,0.35) 35%, rgba(15,118,110,0.12) 65%, rgba(0,0,0,0) 100%)",
            }}
          >
            <div className="relative w-full rounded-[18px] overflow-hidden bg-black">
              <video
                ref={videoRef}
                className="w-full aspect-video object-contain"
                preload="none"
                playsInline
                controls={isPlaying}
                muted={false}
                onEnded={handleEnded}
                poster="/video.png"
              >
                <source src="/hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay play button */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/30 backdrop-blur-[3px] text-white"
                >
                  <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white text-emerald-700 shadow-xl shadow-emerald-500/40 border border-emerald-300/80">
                    <span className="ml-1 text-4xl md:text-5xl">▶</span>
                  </div>
                  <div className="px-4 text-sm md:text-base font-semibold tracking-wide uppercase text-emerald-100">
                    {isLoading ? "Loading video..." : "Click to watch the hero story"}
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at top, #0a0a0a 0%, #000000 50%, #0a1628 100%)`,
      }}
    >
      {/* ANIMATED BACKGROUND - Dark with subtle green glow */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(10, 141, 94, 0.15) 0%, transparent 50%),
                       radial-gradient(circle at 80% 70%, rgba(0, 168, 107, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Professional Sparkle Background - Global */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <SparkleBackground intensity="high" sectionId="global" />
      </div>

      {/* TOP NAVBAR */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 min-h-[100px] flex items-center justify-between relative z-20">
        {/* Logo on Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/logo.png" 
            alt="Manini Pay Logo" 
            className="h-10 md:h-12 lg:h-14 w-auto"
          />
        </motion.div>

        {/* Login Button on Right */}
        <motion.button
          type="button"
          onClick={() => window.open('https://accounts.zoho.com.au/', '_blank')}
          className="px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-200 text-xs md:text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
          style={{
            backgroundColor: "#2D7A44",
            color: "white",
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Login to CRM
        </motion.button>
</div>

      <style>
        {`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background: linear-gradient(
              120deg,
              #0A8D5E,
              #16A085,
              #0A8D5E,
              #1ABC9C
            );
            animation: gradientFlow 12s ease infinite;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.6;
            }
            25% {
              transform: translate(20px, -30px) scale(1.2);
              opacity: 0.8;
            }
            50% {
              transform: translate(-15px, -50px) scale(0.9);
              opacity: 0.4;
            }
            75% {
              transform: translate(30px, -20px) scale(1.1);
              opacity: 0.7;
            }
          }
          
          .animate-float {
            animation: float linear infinite;
          }
          
          /* Ray Rotation Animation */
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
          
          /* Sparkle Twinkle Animation */
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
          
          /* Particle Float Animations - Smooth upward movement with variations */
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
          
          /* Orb Pulse Animation */
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
        `}
      </style>

      {/* HERO SECTION */}
      <section className="min-h-[calc(100vh-90px)] flex flex-col justify-center items-center text-center !py-0 px-4 relative overflow-hidden">
        {/* Sparkle Background in Hero Section */}
        <SparkleBackground intensity="high" sectionId="hero" />
        
        {/* Subtle gradient overlay on hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent pointer-events-none z-0" />
        
       
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl relative z-10 text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          A Wallet for Everyone. A Future Without Financial Barriers.
        </motion.h1>

        <motion.h3
          className="text-xl md:text-2xl mb-6 max-w-4xl mx-auto relative z-10 text-gray-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Manini Pay gives people access to money — instantly, securely, and across borders — even if they don't have a bank account.
        </motion.h3>

        {/* Emotional Teasers */}
        <motion.div
          className="max-w-3xl mx-auto mb-8 space-y-3 text-lg md:text-xl relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="italic text-gray-300">• Because opportunity shouldn't depend on where you live.</p>
          <p className="italic text-gray-300">• Because no one should be excluded from the financial world.</p>
          <p className="italic text-gray-300">• Because money should move as freely as our people do.</p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => scrollToSection(contactRef)}
            className="px-8 py-4 rounded-full font-bold text-lg transition transform hover:scale-105 shadow-lg"
            style={{
              backgroundColor: "#2D7A44",
              color: "white",
            }}
          >
            Join Early Access
          </button>
          <button
            onClick={() => setShowVideo(true)}
            className="px-8 py-4 rounded-full font-bold text-lg transition transform hover:scale-105 shadow-lg border"
            style={{
              backgroundColor: "transparent",
              color: "#2D7A44",
              borderColor: "#2D7A44",
            }}
          >
            Watch Our Story
          </button>
        </motion.div>

        {/* Local hero video card (performance-friendly) */}
        <HeroVideo />

        {/* Video Modal Popup */}
        {showVideo && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            onClick={() => setShowVideo(false)}
          >
            <div
              className="relative w-11/12 md:w-3/4 lg:w-1/2 aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/rANxOZNVuRo?si=Z5yCCcRRuKIBwRlm"
                title="Manini Pay Official Launch Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>

              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-2 right-2 text-white bg-red-600 rounded-full px-3 py-1 font-bold hover:bg-red-700"
                aria-label="Close video"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <hr className="border-white opacity-40 mt-8 w-3/4 mx-auto" />
      </section>

      {/* PROBLEM SECTION */}
      <motion.section 
        ref={problemRef} 
        className="px-6 md:px-20 py-16 text-center bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl mx-4 md:mx-10 my-10 border border-green-500/20 shadow-2xl shadow-green-500/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <SparkleBackground intensity="medium" sectionId="problem" />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-white"
          variants={fadeInUp}
        >
          Financial Exclusion Is Holding Us Back
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl mb-4 max-w-3xl mx-auto text-gray-300"
          variants={fadeInUp}
        >
          Financial exclusion is one of the biggest barriers to progress in the Pacific.
        </motion.p>
        <motion.p 
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-300"
          variants={fadeInUp}
        >
          Across the Pacific, millions are locked out of the financial world. This isn't just a statistic — it's a lived reality.
        </motion.p>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { stat: "30%", text: "of Fiji is unbanked" },
            { stat: "80-85%", text: "PNG unbanked" },
            { stat: "68%", text: "Vanuatu unbanked" },
            { stat: "75%", text: "Solomon Islands unbanked" },
            { stat: "40%", text: "Tonga unbanked" },
            { stat: "30%", text: "Samoa unbanked" },
            { stat: "26%", text: "Remittance fees" },
            { stat: "64%", text: "Pacific women unbanked" },
            { stat: "50%+", text: "Australia's First People excluded" },
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 p-6 rounded-xl hover:border-green-500/60 transition-all"
              variants={staggerItem}
              whileHover={{ scale: 1.05, borderColor: "rgba(10, 141, 94, 0.8)", transition: { duration: 0.2 } }}
            >
              <p className="text-2xl font-bold mb-2 text-green-400">{item.stat}</p>
              <p className="text-lg text-gray-300">{item.text}</p>
            </motion.div>
          ))}
          <motion.div 
            className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 p-6 rounded-xl md:col-span-3 hover:border-green-500/60 transition-all"
            variants={staggerItem}
          >
            <p className="text-lg">• Rural communities travel hours just to access money</p>
          </motion.div>
        </motion.div>

        <motion.p 
          className="text-xl font-semibold mb-2 text-gray-200"
          variants={fadeInUp}
        >
          When people can't access money, they can't access opportunity.
        </motion.p>
        <motion.p 
          className="text-xl font-bold mb-4 text-green-400"
          variants={fadeInUp}
        >
          We're here to change that.
        </motion.p>

        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </motion.section>

      {/* FOUNDER STORY SECTION */}
      <motion.section 
        ref={storyRef} 
        className="px-6 md:px-20 py-16 text-center bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl mx-4 md:mx-10 my-10 border border-green-500/20 shadow-2xl shadow-green-500/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <SparkleBackground intensity="medium" sectionId="story" />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-white"
          variants={fadeInUp}
        >
          Born from a Promise
        </motion.h2>
        <motion.p 
          className="text-xl mb-6 font-semibold text-green-400"
          variants={fadeInUp}
        >
          This isn't a fintech story. It's a family story.
        </motion.p>
        
        <motion.div 
          className="max-w-4xl mx-auto text-left bg-gray-900/90 backdrop-blur-sm border border-green-500/30 p-8 rounded-xl"
          variants={fadeInUp}
          whileHover={{ scale: 1.02, borderColor: "rgba(10, 141, 94, 0.6)", transition: { duration: 0.3 } }}
        >
          <p className="text-lg md:text-xl leading-relaxed italic">
            "When I was five, my mother and I travelled by canoe just to receive money. The village town officer had to verify people one by one and sign for those who didn't have one. Years later, we stood in line for hours in the heat — only to be turned away because she forgot one digit in a reference number. That day, I promised myself I would build something better. Manini Pay is that promise — a wallet built so no one is left behind again."
          </p>
        </motion.div>

        <motion.button
          onClick={() => setShowVideo(true)}
          className="mt-6 bg-white text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Watch the Story
        </motion.button>

        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </motion.section>

      {/* WHAT IS MANINI PAY SECTION / SOLUTION SECTION */}
      <motion.section 
        ref={solutionRef} 
        className="px-6 md:px-20 py-16 text-center bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl mx-4 md:mx-10 my-10 border border-green-500/20 shadow-2xl shadow-green-500/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <SparkleBackground intensity="high" sectionId="solution" />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-white"
          variants={fadeInUp}
        >
          Meet Manini Pay
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl mb-6 max-w-4xl mx-auto font-semibold text-gray-200"
          variants={fadeInUp}
        >
          Manini Pay — a borderless, cashless, cardless wallet built for inclusion.
        </motion.p>
        
        {/* Positioning Statement */}
        <motion.p 
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto italic text-gray-300"
          variants={fadeInUp}
        >
          We're not a bank. We're not replacing banks. We're building access — for the people who've been left out for too long.
        </motion.p>

        {/* Features with Icons */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { icon: "⚡", text: "Instant payments" },
            { icon: "🔄", text: "Hold, receive, send, Pay, Convert — instantly" },
            { icon: "🌏", text: "Travel FX ready" },
            { icon: "📱", text: "Offline QR payments" },
            { icon: "👤", text: "Face scan access & payments" },
            { icon: "🏦", text: "No bank account needed to start" },
            { icon: "💰", text: "Low, transparent fees" },
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 p-6 rounded-xl hover:border-green-500/60 transition-all"
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5, borderColor: "rgba(10, 141, 94, 0.8)", transition: { duration: 0.2 } }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-gray-200">{feature.text}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Value Teasers */}
        <motion.div 
          className="max-w-4xl mx-auto mb-8 space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            "• Your phone becomes your wallet — anywhere.",
            "• Real time settlement means no waiting, no delays.",
            "• One wallet for Australia, NZ, and the Pacific.",
          ].map((item, index) => (
            <motion.p 
              key={index}
              className="text-lg md:text-xl"
              variants={staggerItem}
            >
              {item}
            </motion.p>
          ))}
        </motion.div>

        <motion.button
    onClick={() => scrollToSection(contactRef)}
          className="bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Early Access
        </motion.button>

        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </motion.section>

      {/* BUILT FOR THE PACIFIC SECTION */}
      <motion.section 
        className="px-6 md:px-20 py-16 text-center bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl mx-4 md:mx-10 my-10 border border-green-500/20 shadow-2xl shadow-green-500/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <SparkleBackground intensity="medium" sectionId="pacific" />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-white"
          variants={fadeInUp}
        >
          🌺 Built for the Pacific
        </motion.h2>
        <motion.p 
          className="text-xl mb-8 italic text-gray-300"
          variants={fadeInUp}
        >
          A wallet shaped by our culture, our challenges, and our future.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            "✓ Works on any phone",
            "✓ Offline QR payments",
            "✓ Simple onboarding",
            "✓ Designed for women and rural communities",
            "✓ Built for families across islands and borders",
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 p-6 rounded-xl text-left hover:border-green-500/60 transition-all"
              variants={staggerItem}
              whileHover={{ scale: 1.05, x: 5, borderColor: "rgba(10, 141, 94, 0.8)", transition: { duration: 0.2 } }}
            >
              <p className="text-lg text-gray-300">{item}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          className="text-xl font-semibold mt-6 text-green-400"
          variants={fadeInUp}
        >
          This is not just an app. It's a movement.
        </motion.p>

        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </motion.section>

      {/* HOW WE SOLVE IT SECTION - "Designed for Inclusion. Built for Trust." */}
      <motion.section 
        className="px-6 md:px-20 py-16 bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl mx-4 md:mx-10 my-10 border border-green-500/20 shadow-2xl shadow-green-500/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <SparkleBackground intensity="medium" sectionId="solve" />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-center text-white"
          variants={fadeInUp}
        >
          Designed for Inclusion. Built for Trust.
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-center font-semibold text-gray-300"
          variants={fadeInUp}
        >
          Technology that removes barriers — not creates them.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { problem: "Financial Exclusion", solution: "Mobile onboarding" },
            { problem: "High Fees", solution: "Low cost micro transactions" },
            { problem: "Fragmented Systems", solution: "Unified wallet + APIs" },
            { problem: "Gender Gap", solution: "Simple onboarding for women" },
            { problem: "Rural Barriers", solution: "Offline QR + remote onboarding" },
            { problem: "Safety", solution: "Real-time Fraud Detection" },
            { problem: "Security", solution: "Face scan payments (you can steal a password, not a face)" },
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 p-6 rounded-xl hover:border-green-500/60 transition-all"
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5, borderColor: "rgba(10, 141, 94, 0.8)", transition: { duration: 0.2 } }}
            >
              <p className="text-lg font-semibold mb-2 text-green-400">{item.problem}</p>
              <p className="text-base text-gray-300">→ {item.solution}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          className="text-xl font-semibold mt-8 text-center text-green-400"
          variants={fadeInUp}
        >
          Inclusion isn't a feature — it's the mission.
        </motion.p>


        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </motion.section>

      {/* COMPLIANCE & TRUST SECTION */}
      <motion.section 
        className="px-6 md:px-20 py-16 text-center bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl mx-4 md:mx-10 my-10 border border-green-500/20 shadow-2xl shadow-green-500/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <SparkleBackground intensity="medium" sectionId="compliance" />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-white"
          variants={fadeInUp}
        >
          🌊 Compliance & Trust
        </motion.h2>
        <motion.p 
          className="text-xl mb-8 font-semibold text-gray-300"
          variants={fadeInUp}
        >
          Safe. Secure. Regulator aligned.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto mb-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {["KYC/AML", "Encryption", "Audit logs", "Real time fraud detection", "Sandbox ready"].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 p-6 rounded-xl hover:border-green-500/60 transition-all"
              variants={staggerItem}
              whileHover={{ scale: 1.1, rotate: 2, borderColor: "rgba(10, 141, 94, 0.8)", transition: { duration: 0.2 } }}
            >
              <p className="text-lg font-semibold text-gray-200">{item}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          className="text-lg font-semibold mt-4 text-gray-200"
          variants={fadeInUp}
        >
          We work with regulators — not around them.
        </motion.p>

        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </motion.section>

      {/* WHY NOW SECTION */}
      <motion.section 
        className="px-6 md:px-20 py-16 text-center bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl mx-4 md:mx-10 my-10 border border-green-500/20 shadow-2xl shadow-green-500/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <SparkleBackground intensity="medium" sectionId="whynow" />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-white"
          variants={fadeInUp}
        >
          The Pacific Is Ready
        </motion.h2>
        <motion.p 
          className="text-xl mb-8 font-semibold text-gray-300"
          variants={fadeInUp}
        >
          The region is changing — and so must the way money moves.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            "• Smartphone adoption rising",
            "• Government inclusion initiatives",
            "• Youth driven digital economy",
            "• Remittance pain at all time high",
            "• Demand for real time payments",
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 p-6 rounded-xl hover:border-green-500/60 transition-all"
              variants={staggerItem}
              whileHover={{ scale: 1.05, x: 5, borderColor: "rgba(10, 141, 94, 0.8)", transition: { duration: 0.2 } }}
            >
              <p className="text-lg text-gray-300">{item}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          className="text-xl font-semibold mt-4 text-green-400"
          variants={fadeInUp}
        >
          This is the moment to lift communities out of poverty — together.
        </motion.p>

        <motion.button
            onClick={() => scrollToSection(contactRef)}
          className="mt-6 bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore why timing matters
        </motion.button>

        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </motion.section>

      {/* SOCIAL PROOF SECTION - "Recognized for Impact" */}
      <motion.section 
        className="px-6 md:px-20 py-16 text-center bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl mx-4 md:mx-10 my-10 border border-green-500/20 shadow-2xl shadow-green-500/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <SparkleBackground intensity="medium" sectionId="social" />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-white"
          variants={fadeInUp}
        >
          Recognized for Impact
        </motion.h2>
        <motion.p 
          className="text-xl mb-8 text-gray-300"
          variants={fadeInUp}
        >
          We're not starting from zero.
        </motion.p>

        <motion.div 
          className="max-w-4xl mx-auto mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="bg-gray-900/90 backdrop-blur-sm border border-green-500/40 p-8 rounded-xl mb-6"
            variants={staggerItem}
            whileHover={{ scale: 1.02, borderColor: "rgba(10, 141, 94, 0.8)", transition: { duration: 0.3 } }}
          >
            <h3 className="text-2xl font-bold mb-4 text-green-400">Top 5 Fintech Startups</h3>
            <p className="text-xl text-gray-200">Pacific Fintech Sandbox Accelerator (2026)</p>
            <p className="text-lg mt-4 italic text-gray-400">Innovation with purpose — recognised across the region.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
            variants={staggerContainer}
          >
            {[
              { items: ["✓ Landing page live", "✓ Early users joining the waitlist", "✓ MVP in testing"] },
              { items: ["✓ Pilot launch in March", "✓ Official launch October 2026"] },
            ].map((group, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 p-6 rounded-xl hover:border-green-500/60 transition-all"
                variants={staggerItem}
                whileHover={{ scale: 1.05, x: 5, borderColor: "rgba(10, 141, 94, 0.8)", transition: { duration: 0.2 } }}
              >
                {group.items.map((item, i) => (
                  <p key={i} className="text-lg text-gray-300">{item}</p>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.p 
          className="text-lg font-semibold mt-6 text-green-400"
          variants={fadeInUp}
        >
          This recognition validates our vision — and our mission.
        </motion.p>

        <motion.button
          onClick={() => scrollToSection(contactRef)}
          className="mt-6 bg-white text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See our roadmap
        </motion.button>

        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </motion.section>

      {/* TIMELINE SECTION */}
      <motion.section 
        className="px-6 md:px-20 py-16 text-left bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl mx-4 md:mx-10 my-10 border border-green-500/20 shadow-2xl shadow-green-500/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <SparkleBackground intensity="medium" sectionId="timeline" />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-6 text-white"
          variants={fadeInUp}
        >
          We're Building Fast
        </motion.h2>
        <motion.p 
          className="text-center text-xl mb-8 text-gray-300"
          variants={fadeInUp}
        >
          A movement in motion.
        </motion.p>
        <motion.ul 
          className="space-y-4 text-lg max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { date: "March 2026", event: "MVP Testing" },
            { date: "June–September 2026", event: "Pilot Launch" },
            { date: "October 2026", event: "Official Launch" },
          ].map((item, index) => (
            <motion.li 
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 p-4 rounded-xl hover:border-green-500/60 transition-all"
              variants={staggerItem}
              whileHover={{ scale: 1.03, x: 10, borderColor: "rgba(10, 141, 94, 0.8)", transition: { duration: 0.2 } }}
            >
              ➤ <strong className="text-green-400">{item.date}:</strong> <span className="text-gray-300">{item.event}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p 
          className="mt-6 text-center font-semibold text-xl text-green-400"
          variants={fadeInUp}
        >
          Be part of the first wave of financial inclusion.
        </motion.p>
        <motion.div 
          className="text-center mt-6"
          variants={fadeInUp}
        >
          <motion.button
            onClick={() => scrollToSection(contactRef)}
            className="bg-yellow-400 text-green-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Pilot Group
          </motion.button>
        </motion.div>
        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </motion.section>

      {/* FINAL CTA SECTION */}
      <motion.section 
        className="px-6 md:px-20 py-16 text-center relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <SparkleBackground intensity="high" sectionId="cta" />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-white"
          variants={fadeInUp}
        >
          Join the Movement
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl mb-4 italic text-gray-300"
          variants={fadeInUp}
        >
          Be part of the future of Pacific finance.
        </motion.p>
        <motion.p 
          className="text-xl mb-8 font-semibold text-green-400"
          variants={fadeInUp}
        >
          This is how money moves.
        </motion.p>
        <motion.p 
          className="text-lg mb-8 text-gray-300"
          variants={fadeInUp}
        >
          Sign up for early access. Help shape the future of Pacific finance.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.button
            onClick={() => scrollToSection(contactRef)}
            className="bg-yellow-400 text-green-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-lg"
            variants={staggerItem}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Early Access
          </motion.button>
          <motion.button
          onClick={() => scrollToSection(contactRef)}
            className="bg-white text-green-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-100 transition shadow-lg"
            variants={staggerItem}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Pilot Tester
          </motion.button>
        </motion.div>
        <motion.p 
          className="text-xl font-bold mt-8"
          variants={fadeInUp}
        >
          One wallet. One region. One future. Manini Pay – This Is How Money Moves
        </motion.p>
        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </motion.section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-sm bg-black bg-opacity-80 backdrop-blur-sm border-t border-green-500/20">
        <div className="flex flex-nowrap justify-center items-center gap-1 md:gap-4 mb-4 text-xs md:text-sm overflow-x-auto px-2">
          <a 
            href="#" 
            className="hover:underline whitespace-nowrap"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(howItWorksRef);
            }}
          >
            How it Works
          </a>
          <span className="text-white">|</span>
          <a 
            href="#" 
            className="hover:underline whitespace-nowrap"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(contactRef);
            }}
          >
            Early Access
          </a>
          <span className="text-white">|</span>
          <a
            href="#"
            className="hover:underline whitespace-nowrap"
            onClick={(e) => {
              e.preventDefault();
              setShowVideo(true);
            }}
          >
            Official Video
          </a>
          <span className="text-white">|</span>
          <a
            href="#"
            className="hover:underline whitespace-nowrap"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(contactRef);
            }}
          >
            Contact
          </a>
          <span className="text-white">|</span>
          <Link to="/privacy" className="hover:underline whitespace-nowrap">
  Privacy
</Link>
          <span className="text-white">|</span>
          <Link to="/terms" className="hover:underline whitespace-nowrap">
            Terms of Use
          </Link>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <FaFacebook className="cursor-pointer hover:text-yellow-400 transition" />
          <FaYoutube className="cursor-pointer hover:text-yellow-400 transition" />
          <FaTwitter className="cursor-pointer hover:text-yellow-400 transition" />
          <FaInstagram className="cursor-pointer hover:text-yellow-400 transition" />
        </div>
        <p className="italic mb-2">"Eyes on the horizon. Paddles in the water. Together, we sail."</p>
        <p>
          Together we're building a financial canoe that connects every island — one transaction at a time.
        </p>
      </footer>

      {/* HOW IT WORKS SECTION */}
      <div ref={howItWorksRef}>
        <HowItWorks />
      </div>
      
      {/* CONTACT SECTION */}
      <div ref={contactRef}>
        <Contact />
      </div>
    </div>
  );
};

export default ManiniPayLanding;
