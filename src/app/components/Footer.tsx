import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
      <div className="container mx-auto">
        <p className="text-sm md:text-base">
          © 2025 Weather Forecast. Using Visual Crossing API
          <span className="ml-2">
            <a
              href="https://github.com/mrejo11/weather-webApp"
              className="text-blue-400 hover:underline inline-flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github text-xl"></i>
              <span className="ml-1">source code</span>
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 