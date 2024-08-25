import React from "react";

const MainBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#8b5cf6]">
      <div className="select-none h-[700px]">
        <img
          src="/assets/Hero-Background-notecode@2x.png"
          alt="hero"
          className="object-cover object-bottom w-full h-full"
        />
      </div>
      {children && (
        <div className="absolute -translate-x-[50%] top-10 w-full left-[50%]">
          {children}
        </div>
      )}
    </div>
  );
};

export default MainBackground;
