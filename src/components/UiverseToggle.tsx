"use client";

import React, { useState, useEffect } from "react";

export const UiverseToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if theme exists in localStorage
    const savedTheme = localStorage.getItem("codecompass-theme");
    
    if (savedTheme) {
      const isDarkMode = savedTheme === "dark";
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Default to dark theme
      setIsDark(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("codecompass-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("codecompass-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("codecompass-theme", "light");
    }
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div className="uiverse-toggle">
        <div className="toggle-switch">
          <label className="switch-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={true}
              onChange={() => {}}
            />
            <span className="slider"></span>
          </label>
        </div>
        <style jsx>{`
          .uiverse-toggle .toggle-switch {
            position: relative;
            width: 50px;
            height: 25px;
            --light: #d8dbe0;
            --dark: #28292c;
          }
          .uiverse-toggle .switch-label {
            position: absolute;
            width: 100%;
            height: 25px;
            background-color: var(--dark);
            border-radius: 12.5px;
            cursor: pointer;
            border: 1.5px solid var(--dark);
          }
          .uiverse-toggle .checkbox {
            position: absolute;
            display: none;
          }
          .uiverse-toggle .slider {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 12.5px;
          }
          .uiverse-toggle .checkbox:checked ~ .slider {
            background-color: var(--light);
          }
          .uiverse-toggle .slider::before {
            content: "";
            position: absolute;
            top: 5px;
            left: 5px;
            width: 12.5px;
            height: 12.5px;
            border-radius: 50%;
            -webkit-box-shadow: inset 6px -2px 0px 0px var(--light);
            box-shadow: inset 6px -2px 0px 0px var(--light);
            background-color: var(--dark);
          }
          .uiverse-toggle .checkbox:checked ~ .slider::before {
            -webkit-transform: translateX(25px);
            -ms-transform: translateX(25px);
            transform: translateX(25px);
            background-color: var(--dark);
            -webkit-box-shadow: none;
            box-shadow: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="uiverse-toggle">
      <div className="toggle-switch">
        <label className="switch-label">
          <input
            type="checkbox"
            className="checkbox"
            checked={isDark}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>

      <style jsx>{`
        .uiverse-toggle .toggle-switch {
          position: relative;
          width: 50px;
          height: 25px;
          --light: #d8dbe0;
          --dark: #28292c;
          --link: rgb(27, 129, 112);
          --link-hover: rgb(24, 94, 82);
        }

        .uiverse-toggle .switch-label {
          position: absolute;
          width: 100%;
          height: 25px;
          background-color: var(--dark);
          border-radius: 12.5px;
          cursor: pointer;
          border: 1.5px solid var(--dark);
          transition: all 0.3s ease;
        }

        .uiverse-toggle .switch-label:hover {
          transform: scale(1.05);
        }

        .uiverse-toggle .checkbox {
          position: absolute;
          display: none;
        }

        .uiverse-toggle .slider {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 12.5px;
          -webkit-transition: 0.3s;
          transition: 0.3s;
        }

        .uiverse-toggle .checkbox:checked ~ .slider {
          background-color: var(--light);
        }

        .uiverse-toggle .slider::before {
          content: "";
          position: absolute;
          top: 5px;
          left: 5px;
          width: 12.5px;
          height: 12.5px;
          border-radius: 50%;
          -webkit-box-shadow: inset 6px -2px 0px 0px var(--light);
          box-shadow: inset 6px -2px 0px 0px var(--light);
          background-color: var(--dark);
          -webkit-transition: 0.3s;
          transition: 0.3s;
        }

        .uiverse-toggle .checkbox:checked ~ .slider::before {
          -webkit-transform: translateX(25px);
          -ms-transform: translateX(25px);
          transform: translateX(25px);
          background-color: var(--dark);
          -webkit-box-shadow: none;
          box-shadow: none;
        }

        .uiverse-toggle .checkbox:focus + .slider {
          box-shadow: 0 0 0 2px rgba(204, 243, 1, 0.5);
        }

        @media (prefers-color-scheme: dark) {
          .uiverse-toggle .toggle-switch {
            --light: #f1f3f4;
            --dark: #1f2937;
          }
        }

        @media (max-width: 768px) {
          .uiverse-toggle .toggle-switch {
            width: 45px;
            height: 22px;
          }
          
          .uiverse-toggle .switch-label {
            height: 22px;
            border-radius: 11px;
          }
          
          .uiverse-toggle .slider {
            border-radius: 11px;
          }
          
          .uiverse-toggle .slider::before {
            width: 11px;
            height: 11px;
            top: 4.5px;
            left: 4.5px;
            -webkit-box-shadow: inset 5px -1.5px 0px 0px var(--light);
            box-shadow: inset 5px -1.5px 0px 0px var(--light);
          }
          
          .uiverse-toggle .checkbox:checked ~ .slider::before {
            -webkit-transform: translateX(22px);
            -ms-transform: translateX(22px);
            transform: translateX(22px);
          }
        }
      `}</style>
    </div>
  );
};