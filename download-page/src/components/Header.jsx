import React from "react";
import logo from "../assets/logo-a.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-xl bg-slate-950/60 border-b border-white/10">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo + Name (Scroll to Hero) */}
          <a href="#hero" className="flex items-center gap-3 cursor-pointer">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center">
              <img
                className="rounded-xl"
                src={logo}
                alt="Karan Kavach Logo"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white hover:text-cyan-400 transition">
                Karan-Kavach
              </h1>
              <p className="text-xs text-slate-400 tracking-wide">
                24/7 Protection
              </p>
            </div>
          </a>

          {/* Navigation */}
          <div className="hidden md:flex gap-10 text-slate-300 font-medium">
            {[
              { name: "Features", link: "#features" },
              { name: "Usage Guide", link: "#usageguide" },
              { name: "Team", link: "#team" },
              { name: "Download", link: "#download" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="relative group"
              >
                <span className="group-hover:text-cyan-400 transition">
                  {item.name}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

        </nav>
      </div>
    </header>
  );
};

export default Header;
