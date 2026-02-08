import React from "react";

const UsageGuide = () => {
  const steps = [
    {
  number: "1",
  title: "Download & Install",
  description: (
    <>
      Download the .zip file and refer GitHub for setup.
      <br />
      <a
        href="https://github.com/Vishal-HaCkEr1910/KARAN-KAVACH"
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 underline hover:text-cyan-300 transition"
      >
        https://github.com/Vishal-HaCkEr1910/KARAN-KAVACH
      </a>
    </>
  ),
},

    {
      number: "2",
      title: "Grant admin permissions",
      description:
        "After installation, run your system scan using admin privilages for full support.",
    },
    {
      number: "3",
      title: "Adjust using ui",
      description:
        "Customize your protection settings, schedule automatic scans, and enable real-time monitoring of running PIDs, lbr jumps monitoring and memory analysis.",
    },
    {
      number: "4",
      title: "Stay Protected",
      description:
        "Let the antivirus run in the background. It will automatically update and protect your system 24/7.",
    },
  ];

  return (
    <section
      id="usageguide"
      className="relative bg-black text-white py-24 overflow-hidden"
    >
      {/* SAME CYBER GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse"></div>

      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">
            How to <span className="text-cyan-400">Use</span>
          </h2>
          <p className="text-xl text-slate-400">
            Get started in just 4 simple steps
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {steps.map((step, index) => (
            <div key={index} className="flex mb-12 last:mb-0 relative">
              
              {/* Step Number */}
              <div className="flex-shrink-0 mr-8">
                <div className="w-16 h-16 
                  bg-gradient-to-br from-cyan-500 to-blue-600 
                  rounded-full flex items-center justify-center 
                  text-white text-2xl font-bold
                  shadow-lg shadow-cyan-500/30">
                  {step.number}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-grow bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-2xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-lg">
                  {step.description}
                </p>
              </div>

              {/* Vertical Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-20 w-[2px] h-[80px] bg-cyan-500/30"></div>
              )}
            </div>
          ))}
        </div>

        {/* Pro Tip Box */}
        <div className="mt-20 max-w-4xl mx-auto 
          bg-slate-900/70 backdrop-blur-xl 
          border border-cyan-500/30 
          p-8 rounded-2xl shadow-lg shadow-cyan-500/10">
          
          <h4 className="text-lg font-semibold text-cyan-400 mb-3">
            💡 Pro Tip
          </h4>
          <p className="text-slate-400">
            For best protection, keep automatic updates enabled and run a full
            system scan at least once a week. Schedule scans during times when
            you're not using your computer for maximum efficiency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UsageGuide;
