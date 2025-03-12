import React from "react";

const Weather_skeleton: React.FC = () => {
  return (
    <div className="flex w-full flex-col sm:flex-row">
      <div className="bg-white sm:w-[33%] min-w-[300px] h-screen p-4">
        {/* Search Skeleton */}
        <div className="w-full mb-8">
          <div className="skeleton h-12 w-full rounded-full bg-gray-300 animate-pulse"></div>
        </div>

        {/* Weather Icon Skeleton */}
        <div className="flex justify-center mb-8">
          <div className="skeleton w-44 h-44 rounded-lg bg-gray-300 animate-pulse"></div>
        </div>

        {/* Temperature Skeleton */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="skeleton h-16 w-32 bg-gray-300 animate-pulse"></div>
          <div className="skeleton h-4 w-24 bg-gray-300 animate-pulse"></div>
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-8">
          <div className="skeleton w-[60%] h-1 rounded-full bg-gray-300 animate-pulse"></div>
        </div>

        {/* Date & Time Skeleton */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="skeleton h-4 w-32 bg-gray-300 animate-pulse"></div>
          <div className="skeleton h-4 w-40 bg-gray-300 animate-pulse"></div>
          <div className="skeleton h-4 w-16 bg-gray-300 animate-pulse"></div>
        </div>

        {/* City Skeleton */}
        <div className="flex justify-center">
          <div className="skeleton h-12 w-48 bg-gray-300 animate-pulse"></div>
        </div>
      </div>

      {/* Right Panel Skeleton */}
      <div className="bg-gray-200 flex-1 p-4">
        <div className="flex gap-4 mb-8">
          <div className="skeleton h-8 w-32 bg-gray-300 animate-pulse"></div>
          <div className="skeleton h-8 w-24 bg-gray-300 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className=" rounded-2xl p-4 bg-gray-300 animate-pulse"
            >
              <div className="skeleton h-4 w-24 bg-gray-300 animate-pulse mb-2"></div>
              <div className="skeleton h-8 w-16 bg-gray-300 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather_skeleton;
