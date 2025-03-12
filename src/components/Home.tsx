import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 bg-pattern">
      <div className="text-center space-y-8 p-12 max-w-4xl mx-4 backdrop-blur-sm bg-white/5 rounded-2xl">
        <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
            Weather App
          </span>
        </h1>
        <p className="text-xl text-slate-300 leading-relaxed mb-12">
          Get real-time weather updates and forecasts at your fingertips
        </p>
        <Link
          to="/weather"
          className="inline-block px-8 py-4 rounded font-semibold text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl text-white ring-1 ring-white/10"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
