"use client";

import React from "react";
import Program from "@/components/homePage/home_feature/program";
import ChooseContent from "@/components/homePage/choosecontent";

const ChooseLanguage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="text-center">
        <h3
          className="text-3xl md:text-4xl lg:text-6xl font-bold mb-8"
          style={{ fontFamily: '"Source Code Pro", monospace' }}
        >
          Choose Your <span className="text-lime-400">Language</span>,<br />
          Solve Problems <span className="text-lime-400">Your Way!</span>
        </h3>
        <Program />
        <ChooseContent/>
      </div>
    </div>
  );
};

export default ChooseLanguage;