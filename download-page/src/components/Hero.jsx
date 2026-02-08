
import dashboard from "../assets/dashboard.png";

/* ================= IMAGE WITH ZOOM COMPONENT ================= */

import { useState, useEffect, useRef } from "react";

const ImageWithZoom = ({ src, alt }) => {
  const [zoomed, setZoomed] = useState(false);
  const popupRef = useRef(null);

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setZoomed(false);
      }
    };

    if (zoomed) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [zoomed]);

  return (
    <>
      {/* Normal Image */}
      <img
        src={src}
        alt={alt}
        onClick={() => setZoomed(true)}
        className="rounded-2xl w-full cursor-pointer transition duration-300 hover:scale-105"
      />

      {/* Pop-out */}
      {zoomed && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <img
            ref={popupRef}
            src={src}
            alt={alt}
            className="w-[80%] max-w-5xl rounded-2xl shadow-2xl animate-pop"
          />
        </div>
      )}
    </>
  );
};




/* ================= HERO COMPONENT ================= */

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-black text-white py-24">

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse"></div>

      {/* Glow Effect */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">

        {/* Badge
        <div className="inline-block mb-6 px-4 py-2 border border-cyan-400/40 text-cyan-400 rounded-full text-sm">
          🛡 Cyber Security
        </div> */}

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">The{" "}
          <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
           Divine Armor
          </span>{" "}
          for the <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
           Digital Kurukshetra
          </span>{" "}
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg md:text-xl mb-10">
          Real-time malware detection powered by real-time system monitoring.
          Secure, lightweight and built for modern systems.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#download"
            className="px-8 py-4 rounded-xl font-semibold 
            bg-linear-to-r from-cyan-500 to-blue-600 
            hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Download Now
          </a>

          <a
            href="#features"
            className="group relative px-8 py-4 rounded-xl font-semibold 
            border border-gray-700 bg-gray-900 
            hover:border-cyan-400 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-cyan-400 transition">
              Explore Features
            </span>

            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
          </a>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg border border-cyan-500/20 rounded-3xl p-6 shadow-2xl">
            <ImageWithZoom
              src={dashboard}
              alt="Security Dashboard"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
