import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <header className="bg-white py-4 px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/assets/logo.jpg"
            alt="RoboCrop Logo"
            className="h-10"
          />
          <h1 className="text-gray-700 text-2xl font-bold ml-2">ROBOCROP</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow relative">
        
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/assets/Land.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay to ensure text is readable against the image */}
          
          
        </div>

        {/* Top Wavy Border */}
        <div className="absolute top-0 left-0 right-0 h-20 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute top-0 left-0 w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L80,106.7C160,117,320,139,480,138.7C640,139,800,117,960,112C1120,107,1280,117,1360,122.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pt-32 px-8 md:px-20 text-white">
          <h2 className="uppercase font-bold text-3xl text-yellow-400 mb-4">Welcome to Robocrop</h2>
          
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold uppercase leading-tight mb-2">
              Your Crop
            </h1>
            
            {/* Sun/rays icon */}
            <div className="absolute right-0 top-0 md:right-64">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 0L30 20L10 30L30 40L40 60L50 40L70 30L50 20L40 0Z" fill="#FFD54F"/>
              </svg>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold uppercase leading-tight">
              Your Control
            </h1>
          </div>
          
          <div className="mt-16">
            <Link 
              to="/SignUp" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-8 rounded-lg inline-block"
            >
              Login/SignUp
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;