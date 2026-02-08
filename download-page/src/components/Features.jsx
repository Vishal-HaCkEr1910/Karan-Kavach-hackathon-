import React from "react";

const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Memory Monitoring",
      description: "Monitors CPU's internal operation"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Real-Time Protection",
      description: "Continuous monitoring to block threats before they harm your system"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Zero Day Ready",
      description: "No signatures needed"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Lightweight",
      description: "Less than 2% CPU usage"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Cross platform",
      description: "Windows, MacOS, Linux"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Easy to Use",
      description: "Simple interface that anyone can navigate"
    }
  ];

  return (
    <section
  id="features"
  className="relative bg-black text-white py-24 overflow-hidden"
>
<div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse"></div>
  {/* SAME GRID AS HERO */}
  <div
    className="absolute inset-0 -z-20
    bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),
        linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)]
    bg-[size:40px_40px]"
  ></div>

  {/* Seamless Blend Glow */}
  <div
    className="absolute top-0 left-0 right-0 h-40 -z-10
    bg-gradient-to-b from-transparent to-black"
  ></div>

  <div className="container mx-auto px-6">

    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold mb-4">
        Powerful <span className="text-cyan-400">Features</span>
      </h2>
      <p className="text-xl text-slate-400">
        Everything you need to keep your system secure
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-slate-900/60 backdrop-blur-xl
          border border-white/10
          rounded-2xl p-8
          transition-all duration-300
          hover:border-cyan-400
          hover:shadow-lg hover:shadow-cyan-500/10"
        >
          <div
            className="w-14 h-14 mb-6
            bg-gradient-to-br from-cyan-500 to-blue-600
            rounded-xl flex items-center justify-center text-white"
          >
            {feature.icon}
          </div>

          <h3 className="text-xl font-semibold mb-3">
            {feature.title}
          </h3>

          <p className="text-slate-400">
            {feature.description}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>

  );
};

export default Features;
