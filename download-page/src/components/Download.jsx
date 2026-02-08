import React from "react";

const Download = () => {
  return (
    <section
      id="download"
      className="relative overflow-hidden bg-black text-white py-28"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse"></div>
      {/* SAME HERO GRID */}
      <div className="absolute inset-0 
        bg-[linear-gradient(rgba(0,255,255,0.15)_1px,transparent_1px),
            linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)]
        bg-[size:40px_40px]">
      </div>

      {/* Glow Accent */}
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px]"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to <span className="text-cyan-400">Protect</span> Your PC?
        </h2>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Download our antivirus software now and get complete protection
          against viruses, malware, and online threats.
        </p>

        {/* CTA Button */}
<div className="flex justify-center">
  <a
    href="/downloads/KARAN-KAVACH.zip"
    target="_blank"
rel="noopener noreferrer"

    download
    className="px-12 py-4 rounded-xl font-semibold text-lg 
    bg-gradient-to-r from-cyan-500 to-blue-600 
    hover:scale-105 transition-all duration-300 
    shadow-lg shadow-cyan-500/20 flex items-center"
  >
    <svg
      className="w-6 h-6 mr-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
    Download for Windows/Linux/MacOS
  </a>
</div>


        {/* Version Info */}
        <div className="mt-10 text-gray-500 text-sm">
          <p>Version 26.02.1 • Released January 2026 • 45.2 MB</p>
          <p className="mt-2">Supports all major OS(Best for Intel Chips)</p>
        </div>

        {/* Stats */}
        <div className="mt-16 max-w-4xl mx-auto 
          bg-white/5 backdrop-blur-lg 
          border border-white/10 
          rounded-2xl p-8">

          <div className="grid md:grid-cols-1 gap-8">

            <div>
              <div className="text-2xl font-bold text-gray-400 mb-2">
                Developed as a part of cyber buddy mega-project.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Download;
