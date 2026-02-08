import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import UsageGuide from './components/UsageGuide';
import DeveloperCards from './components/DeveloperCards';
import Download from './components/Download';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      
      <Header />
      <Hero />
      <Features />
      <UsageGuide />
      <DeveloperCards />
      <Download />
    </div>
  );
}

export default App;
