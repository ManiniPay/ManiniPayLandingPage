import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";
import HowItWorks from "./HowItWorks";
import Contact from "./contactSection";
import { Link } from "react-router-dom";

export const ManiniPayLanding = () => {
  const [showVideo, setShowVideo] = useState(false);
  
  // Create refs for the sections
  const howItWorksRef = useRef(null);
  const twoJourneysRef = useRef(null);

  // Scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: `linear-gradient(160deg, #003B2F 0%, #0A8D5E 40%, #00A86B 70%, #39FF14 100%)`,
      }}
    >
      {/* ANIMATED BACKGROUND */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/backgroundimage2.jpeg')" }}
      />

     <div className="absolute top-6 left-1/2 transform -translate-x-1/2 md:left-auto md:right-10 z-20">
  <button
    type="button"
    onClick={() => window.open('https://accounts.zoho.com.au/', '_blank')}
    className="w-52 bg-green-400 hover:bg-green-300 px-6 py-3 rounded-full font-semibold transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
    style={{ color: 'black' }}
  >
    Login to CRM
  </button>
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
        `}
      </style>

      {/* HERO SECTION */}
      <section className="text-center py-20 px-4">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Manini Pay – Pacific First Hybrid. Borderless Forever.
        </motion.h1>

        <p className="text-lg italic mb-4">— across islands and across borders.</p>
        <button
          onClick={() => setShowVideo(true)}
          className="bg-white text-green-900 font-semibold px-6 py-2 rounded-full mb-6 hover:bg-green-100 transition"
        >
          Play Official Launch Video
        </button>

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

        <p className="text-xl max-w-2xl mx-auto">
          A wallet built by the Pacific, for the Pacific – and beyond.
        </p>
        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </section>

      {/* FEATURES SECTION */}
      <section className="text-center px-6 md:px-20 py-10 bg-green-700 bg-opacity-30 rounded-2xl mx-4 md:mx-10">
        <h2 className="text-3xl font-bold mb-4">
          The World's First Pacific Hybrid Wallet
        </h2>
        <p className="mb-3">
          Manini Pay is not just an app. It's a movement. A Pacific canoe for the digital age.
        </p>
        <ul className="space-y-2 text-lg">
          <li>Fits every phone – no expensive tech needed.</li>
          <li>Speaks every currency – hold, convert, pay, send and receive in real time.</li>
          <li>Cardless. Cashless. Borderless. – no delays, no boats, no standing in lines.</li>
          <li>Military-grade security – real-time fraud and scam detection + full compliance.</li>
          <li>Instant transfers – no more 26% fees.</li>
        </ul>
        <p className="mt-4">This is more than a signup — it's your seat on the canoe.</p>
        <div className="mt-6 flex justify-center gap-4">

  <button 
    onClick={() => scrollToSection(howItWorksRef)}
    className="bg-white text-green-800 px-6 py-2 rounded-full font-semibold hover:bg-green-200"
  >
    How it Works
  </button>
  <button 
    onClick={() => scrollToSection(twoJourneysRef)}
    className="bg-yellow-400 text-green-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300"
  >
    Join the Movement
  </button>
</div>

        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </section>

      {/* WHY WE EXIST */}
      <section className="px-6 md:px-20 py-10 text-left bg-green-800 bg-opacity-30 rounded-2xl mx-4 md:mx-10 mt-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Why We Exist</h2>
        <ul className="space-y-2 text-lg">
          <li>➤ 1.7B unbanked globally.</li>
          <li>➤ 800M in Asia Pacific without bank accounts.</li>
          <li>➤ Pacific families lose USD 2.8B yearly in remittance fees.</li>
          <li>➤ Up to 26% charged to send money home.</li>
          <li>➤ More than 50% of Australia's First Peoples lack access to banking.</li>
          <li>➤ Asia Pacific raising poverty line with our live real-time payment.</li>
        </ul>

        <p className="mt-4 text-center font-semibold">
          Families → money leaves the Pacific → opportunity lost.
          <br />
          Manini Pay changes that.
        </p>
        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </section>

      {/* SOLUTION SECTION */}
      <section className="text-center px-6 md:px-20 py-10 rounded-2xl mx-4 md:mx-10 mt-10 bg-green-700 bg-opacity-30">
        <h2 className="text-3xl font-bold mb-4">The Manini Pay Solution</h2>
        <p>We are not building walls. We are building bridges.</p>
        <ul className="space-y-2 text-lg mt-4">
          <li>
            A mother can sell handicrafts from her living room to the world — and get paid in real time.
          </li>
          <li>
            A tribe in Vanuatu or a village in Fiji can sell crafts or group projects in seconds.
          </li>
          <li>Youth can launch businesses regionally with instant, safe payments.</li>
          <li>
            Extending banking to remote areas and beyond — travel overseas with no need for
            currency exchange. Your Manini Pay Wallet automatically converts funds into local
            currency, allowing you to use your phone for payments anywhere.
          </li>
        </ul>
        <p className="mt-4 font-semibold">One Pacific. One Movement. One Dream.</p>
        <div className="mt-6 space-x-4">
          <button 
            onClick={() => scrollToSection(twoJourneysRef)}
            className="bg-yellow-400 text-green-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300"
          >
            Join Waitlist
          </button>
        </div>
        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </section>

      {/* TIMELINE */}
      <section className="px-6 md:px-20 py-10 text-left bg-green-900 bg-opacity-40 rounded-2xl mx-4 md:mx-10 mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Progress Timeline</h2>
        <p className="text-center mb-4">
          Where we are now → MVP → Full Launch → Scaling Nations
        </p>
        <ul className="space-y-2 text-lg">
          <li>➤ 2025 Q4 → MVP Release (.mpk file, simulation data).</li>
          <li>➤ 2026 Q1–Q2 → Pilot programs in Australia, Fiji & Tonga.</li>
          <li>➤ 2026 Q3–Q4 → Full Launch with regional partners & diaspora rollout.</li>
          <li>➤ 2027–2030 → Scaling across all Pacific nations + Asia-Pacific.</li>
        </ul>

        <p className="mt-4 text-center font-semibold">
          Be one of the first 1,010 to test the MVP and shape the Pacific's future wallet.
        </p>
        <p className="italic text-center mt-2">
          "From the Islands to the World - The Canoe is Ready. We're Not Leaving Anyone Behind."
        </p>
        <div className="text-center mt-6">
          <button 
            onClick={() => scrollToSection(twoJourneysRef)}
            className="bg-yellow-400 text-green-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300"
          >
            Sign Up for Early Access
          </button>
        </div>
        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </section>

      {/* TWO JOURNEYS - Add ref here */}
      <section ref={twoJourneysRef} className="px-6 md:px-20 py-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Two Journeys, One Movement</h2>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-green-700 bg-opacity-40 p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">For Users & Communities</h3>
            <ul className="space-y-2 text-lg list-none">
              <li className="before:content-['➤'] before:mr-2 before:text-yellow-400">
                No more high fees.
              </li>
              <li className="before:content-['➤'] before:mr-2 before:text-yellow-400">
                Send money instantly — funds settle in real time.
              </li>
              <li className="before:content-['➤'] before:mr-2 before:text-yellow-400">
                Works on any phone.
              </li>
              <li className="before:content-['➤'] before:mr-2 before:text-yellow-400">
                Your feedback shapes the final product.
              </li>
              <li className="before:content-['➤'] before:mr-2 before:text-yellow-400">
                Live fraud detection keeps your money safe.
              </li>
              <li className="before:content-['➤'] before:mr-2 before:text-yellow-400">
                No more standing in long lines — get cash out instantly.
              </li>
              <li className="before:content-['➤'] before:mr-2 before:text-yellow-400">
                Kids' controlled accounts — teach financial literacy and give kids safe access to funds.
              </li>
            </ul>
          </div>

          <div className="bg-green-700 bg-opacity-40 p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">For Partners & Investors</h3>
            <ul className="space-y-2 text-lg list-none">
              <li className="before:content-['➤'] before:mr-2 before:text-yellow-400">
                Align with a mission-driven movement.
              </li>
              <li className="before:content-['➤'] before:mr-2 before:text-yellow-400">
                A once-in-a-generation transformation.
              </li>
              <li className="before:content-['➤'] before:mr-2 before:text-yellow-400">
                Profitable + Purpose-driven.
              </li>
            </ul>

            <div className="mt-4 flex justify-center gap-4">

              <button className="bg-white text-green-800 px-6 py-2 rounded-full font-semibold hover:bg-green-200">
                Contact Us Today
              </button>
              <button className="bg-yellow-400 text-green-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </section>

      {/* MULTI-LANGUAGE */}
      <section className="px-6 md:px-20 py-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Multi-Language Access</h2>
        <p className="text-lg mb-4">
          English | Tongan | Samoan | Fijian | Tagalog | sb Pijin | vu Bislama |
          한국어 | + more.
        </p>
        <p className="italic">Video subtitles available in all Pacific languages.</p>
        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </section>

      {/* HORIZON SECTION */}
      <section className="px-6 md:px-20 py-10 text-center">
        <h2 className="text-4xl font-bold mb-4">Eyes on the Horizon</h2>
        <p className="text-lg italic mb-2">
          "The canoe is ready. The crew is together. The horizon is clear."
        </p>
        <p className="mb-6">
          "Manini Pay is not just an app — it's a movement – This is how money moves."
        </p>
        <button 
          onClick={() => scrollToSection(twoJourneysRef)}
          className="bg-yellow-400 text-green-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300"
        >
          Join the Movement Today
        </button>
        <hr className="border-white opacity-40 my-8 w-3/4 mx-auto" />
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-sm bg-green-900 bg-opacity-60">
        <div className="space-x-4 mb-4">
          <a 
            href="#" 
            className="hover:underline"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(howItWorksRef);
            }}
          >
            How it Works
          </a>{" "}
          |
          <a 
            href="#" 
            className="hover:underline"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(twoJourneysRef);
            }}
          >
            Early Access
          </a>{" "}
          |
          <a href="#" className="hover:underline">
            Official Video
          </a>{" "}
          |
          <a href="#" className="hover:underline">
            Contact
          </a>{" "}
          |
          <Link to="/privacy" className="hover:underline">
  Privacy
</Link>{" "}
          |
          <Link to="/terms" className="hover:underline">
            Terms of Use
          </Link>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <FaFacebook />
          <FaYoutube />
          <FaTwitter />
          <FaInstagram />
        </div>
        <p className="italic mb-2">"Eyes on the horizon. Paddles in the water. Together, we sail."</p>
        <p>
          Together we're building a financial canoe that connects every island — one transaction at a
          time.
        </p>
      </footer>

      {/* HOW IT WORKS SECTION - Add ref here */}
      <div ref={howItWorksRef}>
        <HowItWorks />
      </div>
      
      <Contact />
    </div>
  );
};

export default ManiniPayLanding;