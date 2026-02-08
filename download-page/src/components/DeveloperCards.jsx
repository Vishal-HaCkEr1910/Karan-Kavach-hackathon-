import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";

const DeveloperCards = () => {
  const developers = [
    {
      name: "Vishal Yadav",
      role: "Cybersecurity Expert",
      bio: "Expert in reverse engineering, malware analysis and threat detection algorithms",
      avatar: "VY",
      social: {
        github: "https://github.com/Vishal-HaCkEr1910",
        linkedin: "https://www.linkedin.com/in/vishal-yadav-iiituna",
        instagram: "https://www.instgram.com/rao_vishalxx7"
      }
    },
    {
      name: "Keshav Sethi",
      role: "UI/UX Designer",
      bio: "Expert in modern JavaScript architecture, asynchronous programming and graphic designing",
      avatar: "KS",
      social: {
        github: "https://github.com/keshavsethii",
        linkedin: "https://www.linkedin.com/in/keshavsethii",
        instagram: "https://www.instgram.com/keshavsethii"
      }
    },
    {
      name: "Sankalp Pal",
      role: "Web Developer",
      bio: "Expert in React.js component architecture, advanced state management and performance-optimized frontend systems",
      avatar: "SP",
      social: {
        github: "https://github.com/sp-geek",
        linkedin: "https://www.linkedin.com/in/sankalp001",
        instagram: "https://www.instgram.com/san.kalp_01"
      }
    },
    {
      name: "Aditya Kumar",
      role: "UI/UX Designer",
      bio: "Specialist in graphic designing, visual branding and interactive digital experiences",
      avatar: "AK",
      social: {
        github: "https://github.com/aadi-manav03",
        linkedin: "https://www.linkedin.com/in/aditya-kumar-2b0a93325",
        instagram: "https://www.instgram.com/adityakr_199"
      }
    }
  ];

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-black text-white py-24"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 container mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">
            Meet Our <span className="text-cyan-400">Team</span>
          </h2>
          <p className="text-xl text-gray-400">
            The experts behind your protection
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg 
              border border-white/10 
              rounded-2xl overflow-hidden
              transition-all duration-300
              hover:border-cyan-400
              hover:shadow-lg hover:shadow-cyan-500/20"
            >
              {/* Top Gradient */}
              <div className="h-28 bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                
                {/* Avatar */}
                <div className="w-24 h-24 bg-black rounded-full 
                  flex items-center justify-center 
                  text-2xl font-bold text-white 
                  border-4 border-white/10">
                  {dev.avatar}
                </div>
              </div>

              <div className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-1">
                  {dev.name}
                </h3>

                <p className="text-cyan-400 font-medium mb-4">
                  {dev.role}
                </p>

                <p className="text-gray-400 text-sm mb-6">
                  {dev.bio}
                </p>

                {/* Social Icons */}
                <div className="flex justify-center space-x-6 text-gray-400 ">
                  
                  {dev.social.github !== "#" && (
                    <a 
                      href={dev.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition duration-300"
                    >
                      <Github size={20} />
                    </a>
                  )}

                  {dev.social.linkedin !== "#" && (
                    <a
                      href={dev.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition duration-300"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}

                  {dev.social.instagram !== "#" && (
                    <a
                      href={dev.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition duration-300"
                    >
                      <Instagram size={20} />
                    </a>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DeveloperCards;
