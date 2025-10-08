// program.tsx
import React from 'react';
import Image from 'next/image';

const Program = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 px-4">
      {/* Top Marquee Section */}
      <section className="w-full max-w-7xl overflow-hidden mb-5">
        <div className="marquee-container">
          <div className="marquee-wrapper overflow-hidden">
            <div className="marquee-top scroll-content">
              {/* Logo 1 */}
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/java/java-icon.svg" alt="Java" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Java</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/isocpp/isocpp-icon.svg" alt="C++" className="lang-icon" width={48} height={48} />
                <span className="lang-text">C++</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg" alt="JavaScript" className="lang-icon" width={48} height={48} />
                <span className="lang-text">JavaScript</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/python/python-icon.svg" alt="Python" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Python</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/java/java-icon.svg" alt="Java" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Java</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/isocpp/isocpp-icon.svg" alt="C++" className="lang-icon" width={48} height={48} />
                <span className="lang-text">C++</span>
              </div>
              {/* Duplicates for seamless loop */}
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg" alt="JavaScript" className="lang-icon" width={48} height={48} />
                <span className="lang-text">JavaScript</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/python/python-icon.svg" alt="Python" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Python</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/java/java-icon.svg" alt="Java" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Java</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/isocpp/isocpp-icon.svg" alt="C++" className="lang-icon" width={48} height={48} />
                <span className="lang-text">C++</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg" alt="JavaScript" className="lang-icon" width={48} height={48} />
                <span className="lang-text">JavaScript</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/python/python-icon.svg" alt="Python" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Python</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CPU Section (Middle) */}
      <div className="rounded-xl w-full max-w-2xl">
        <svg className="text-gray-500 w-full h-full" viewBox="0 0 200 100">
          {/* Top curved paths to CPU */}
          <g stroke="currentColor" fill="none" strokeWidth="0.3">
            <circle cx="10" cy="10" r="2" fill="black" stroke="#232323" strokeWidth="0.5">
              <animate attributeName="r" values="0; 3; 2" dur="0.5s"/>
            </circle>
            <circle cx="50" cy="8" r="2" fill="black" stroke="#232323" strokeWidth="0.5">
              <animate attributeName="r" values="0; 3; 2" dur="0.5s"/>
            </circle>
            <circle cx="100" cy="5" r="2" fill="black" stroke="#232323" strokeWidth="0.5">
              <animate attributeName="r" values="0; 3; 2" dur="0.5s"/>
            </circle>
            <circle cx="150" cy="8" r="2" fill="black" stroke="#232323" strokeWidth="0.5">
              <animate attributeName="r" values="0; 3; 2" dur="0.5s"/>
            </circle>
            <circle cx="190" cy="10" r="2" fill="black" stroke="#232323" strokeWidth="0.5">
              <animate attributeName="r" values="0; 3; 2" dur="0.5s"/>
            </circle>
            
            <path d="M 10 10 h 45 q 5 0 5 5 v 12 q 0 5 5 5 h 15" strokeDasharray="100 100" pathLength="100">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" calcMode="spline" keySplines="0.25,0.1,0.5,1" keyTimes="0; 1"/>
            </path>
            <path d="M 50 8 v 12 q 0 5 5 5 h 30 q 5 0 5 5 v 5" strokeDasharray="100 100" pathLength="100">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" calcMode="spline" keySplines="0.25,0.1,0.5,1" keyTimes="0; 1"/>
            </path>
            <path d="M 100 5 v 8 q 0 5 5 5  q 5 0 5 5 v 12" strokeDasharray="100 100" pathLength="100">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" calcMode="spline" keySplines="0.25,0.1,0.5,1" keyTimes="0; 1"/>
            </path>
            <path d="M 150 8 v 12 q 0 5 -5 5 h -40 q -5 0 -5 5 v 5" strokeDasharray="100 100" pathLength="100">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" calcMode="spline" keySplines="0.25,0.1,0.5,1" keyTimes="0; 1"/>
            </path>
            <path d="M 190 10 h -45 q -5 0 -5 5 v 12 q 0 5 -5 5 h -15" strokeDasharray="100 100" pathLength="100">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" calcMode="spline" keySplines="0.25,0.1,0.5,1" keyTimes="0; 1"/>
            </path>
          </g>

          {/* Bottom curved paths from CPU */}
          <g stroke="currentColor" fill="none" strokeWidth="0.3">
            <path d="M 80 60 v 8 q 0 5 -5 5 h -18 q -5 0 -5 5 v 12" strokeDasharray="100 100" pathLength="100" markerEnd="url(#cpu-circle-marker-end)">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" calcMode="spline" keySplines="0.25,0.1,0.5,1" keyTimes="0; 1"/>
            </path>
            <path d="M 90 60 v 12 q 0 5 -5 5 h -12 q -5 0 -5 5 v 8" strokeDasharray="100 100" pathLength="100" markerEnd="url(#cpu-circle-marker-end)">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" calcMode="spline" keySplines="0.25,0.1,0.5,1" keyTimes="0; 1"/>
            </path>
            <path d="M 100 60 v 15 q 0 5 5 5 h 10 q 5 0 5 5 v 5" strokeDasharray="100 100" pathLength="100" markerEnd="url(#cpu-circle-marker-end)">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" calcMode="spline" keySplines="0.25,0.1,0.5,1" keyTimes="0; 1"/>
            </path>
            <path d="M 110 60 v 12 q 0 5 5 5 h 12 q 5 0 5 5 v 8" strokeDasharray="100 100" pathLength="100" markerEnd="url(#cpu-circle-marker-end)">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" calcMode="spline" keySplines="0.25,0.1,0.5,1" keyTimes="0; 1"/>
            </path>
            <path d="M 120 60 v 8 q 0 5 5 5 h 18 q 5 0 5 5 v 12" strokeDasharray="100 100" pathLength="100" markerEnd="url(#cpu-circle-marker-end)">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" calcMode="spline" keySplines="0.25,0.1,0.5,1" keyTimes="0; 1"/>
            </path>
          </g>

          {/* Animated Lights - Top to CPU */}
          <g mask="url(#cpu-mask-1)">
            <circle className="cpu-architecture cpu-line-1" cx="0" cy="0" r="8" fill="url(#cpu-light-grad)"/>
          </g>
          <g mask="url(#cpu-mask-2)">
            <circle className="cpu-architecture cpu-line-2" cx="0" cy="0" r="8" fill="url(#cpu-light-grad)"/>
          </g>
          <g mask="url(#cpu-mask-3)">
            <circle className="cpu-architecture cpu-line-3" cx="0" cy="0" r="8" fill="url(#cpu-light-grad)"/>
          </g>
          <g mask="url(#cpu-mask-4)">
            <circle className="cpu-architecture cpu-line-4" cx="0" cy="0" r="8" fill="url(#cpu-light-grad)"/>
          </g>
          <g mask="url(#cpu-mask-5)">
            <circle className="cpu-architecture cpu-line-5" cx="0" cy="0" r="8" fill="url(#cpu-light-grad)"/>
          </g>

          {/* Animated Lights - Bottom from CPU */}
          <g mask="url(#cpu-mask-6)">
            <circle className="cpu-architecture cpu-line-6" cx="0" cy="0" r="8" fill="url(#cpu-light-grad)"/>
          </g>
          <g mask="url(#cpu-mask-7)">
            <circle className="cpu-architecture cpu-line-7" cx="0" cy="0" r="8" fill="url(#cpu-light-grad)"/>
          </g>
          <g mask="url(#cpu-mask-8)">
            <circle className="cpu-architecture cpu-line-8" cx="0" cy="0" r="8" fill="url(#cpu-light-grad)"/>
          </g>
          <g mask="url(#cpu-mask-9)">
            <circle className="cpu-architecture cpu-line-9" cx="0" cy="0" r="8" fill="url(#cpu-light-grad)"/>
          </g>
          <g mask="url(#cpu-mask-10)">
            <circle className="cpu-architecture cpu-line-10" cx="0" cy="0" r="8" fill="url(#cpu-light-grad)"/>
          </g>

          {/* CPU Box */}
          <g className="cpu-box-glow">
            <g fill="url(#cpu-connection-gradient)">
              <rect x="78.75" y="33" width="2.5" height="5" rx="0.7"/>
              <rect x="88.75" y="33" width="2.5" height="5" rx="0.7"/>
              <rect x="98.75" y="33" width="2.5" height="5" rx="0.7"/>
              <rect x="108.75" y="33" width="2.5" height="5" rx="0.7"/>
              <rect x="118.75" y="33" width="2.5" height="5" rx="0.7"/>
              <rect x="78.75" y="62" width="2.5" height="5" rx="0.7"/>
              <rect x="88.75" y="62" width="2.5" height="5" rx="0.7"/>
              <rect x="98.75" y="62" width="2.5" height="5" rx="0.7"/>
              <rect x="108.75" y="62" width="2.5" height="5" rx="0.7"/>
              <rect x="118.75" y="62" width="2.5" height="5" rx="0.7"/>
            </g>
            
            <rect x="75" y="38" width="50" height="22" rx="2" fill="#181818" stroke="#CCF301" strokeWidth="0.5" filter="url(#cpu-glow)"/>
            <rect className="border-trace" x="75" y="38" width="50" height="22" rx="2" fill="none" stroke="#CCF301" strokeWidth="1" opacity="0.4"/>

            <line x1="77" y1="41" x2="82" y2="41" stroke="#CCF301" strokeWidth="0.8" opacity="0.6"/>
            <line x1="77" y1="41" x2="77" y2="46" stroke="#CCF301" strokeWidth="0.8" opacity="0.6"/>
            <line x1="123" y1="41" x2="118" y2="41" stroke="#CCF301" strokeWidth="0.8" opacity="0.6"/>
            <line x1="123" y1="41" x2="123" y2="46" stroke="#CCF301" strokeWidth="0.8" opacity="0.6"/>
            <line x1="77" y1="57" x2="82" y2="57" stroke="#CCF301" strokeWidth="0.8" opacity="0.6"/>
            <line x1="77" y1="57" x2="77" y2="52" stroke="#CCF301" strokeWidth="0.8" opacity="0.6"/>
            <line x1="123" y1="57" x2="118" y2="57" stroke="#CCF301" strokeWidth="0.8" opacity="0.6"/>
            <line x1="123" y1="57" x2="123" y2="52" stroke="#CCF301" strokeWidth="0.8" opacity="0.6"/>
            
            <image x="80" y="34" width="40" height="30" href="/codecompass-2.png" preserveAspectRatio="xMidYMid meet"/>
          </g>

          {/* Definitions */}
          <defs>
            <mask id="cpu-mask-1">
              <path d="M 10 10 h 45 q 5 0 5 5 v 12 q 0 5 5 5 h 13" strokeWidth="0.5" stroke="white"/>
            </mask>
            <mask id="cpu-mask-2">
              <path d="M 50 8 v 12 q 0 5 5 5 h 30 q 5 0 5 5 v 3" strokeWidth="0.5" stroke="white"/>
            </mask>
            <mask id="cpu-mask-3">
              <path d="M 100 5 v 8 q 0 5 5 5 q 5 0 5 5 v 10" strokeWidth="0.5" stroke="white"/>
            </mask>
            <mask id="cpu-mask-4">
              <path d="M 150 8 v 12 q 0 5 -5 5 h -40 q -5 0 -5 5 v 3" strokeWidth="0.5" stroke="white"/>
            </mask>
            <mask id="cpu-mask-5">
              <path d="M 190 10 h -45 q -5 0 -5 5 v 12 q 0 5 -5 5 h -13" strokeWidth="0.5" stroke="white"/>
            </mask>
            <mask id="cpu-mask-6">
              <path d="M 80 60 v 8 q 0 5 -5 5 h -18 q -5 0 -5 5 v 10" strokeWidth="0.5" stroke="white"/>
            </mask>
            <mask id="cpu-mask-7">
              <path d="M 90 60 v 12 q 0 5 -5 5 h -12 q -5 0 -5 5 v 6" strokeWidth="0.5" stroke="white"/>
            </mask>
            <mask id="cpu-mask-8">
              <path d="M 100 60 v 15 q 0 5 5 5 h 10 q 5 0 5 5 v 3" strokeWidth="0.5" stroke="white"/>
            </mask>
            <mask id="cpu-mask-9">
              <path d="M 110 60 v 12 q 0 5 5 5 h 12 q 5 0 5 5 v 6" strokeWidth="0.5" stroke="white"/>
            </mask>
            <mask id="cpu-mask-10">
              <path d="M 120 60 v 8 q 0 5 5 5 h 18 q 5 0 5 5 v 10" strokeWidth="0.5" stroke="white"/>
            </mask>

            <radialGradient id="cpu-light-grad" fx="1">
              <stop offset="0%" stopColor="#CCF301"/>
              <stop offset="50%" stopColor="#CCF301"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>

            <filter id="cpu-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
              <feOffset dx="0" dy="0" result="offsetblur"/>
              <feFlood floodColor="#CCF301" floodOpacity="0.4"/>
              <feComposite in2="offsetblur" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <linearGradient id="cpu-connection-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F4F4F"/>
              <stop offset="60%" stopColor="#121214"/>
            </linearGradient>

            <marker id="cpu-circle-marker-end" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="18" markerHeight="18">
              <circle cx="5" cy="5" r="2" fill="black" stroke="#232323" strokeWidth="0.5">
                <animate attributeName="r" values="0; 3; 2" dur="0.5s"/>
              </circle>
            </marker>
          </defs>
        </svg>
      </div>

      {/* Bottom Marquee Section */}
      <section className="w-full max-w-7xl overflow-hidden mt-2">
        <div className="marquee-container">
          <div className="marquee-wrapper overflow-hidden">
            <div className="marquee-bottom scroll-content">
              {/* Python */}
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/python/python-icon.svg" alt="Python" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Python</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg" alt="JavaScript" className="lang-icon" width={48} height={48} />
                <span className="lang-text">JavaScript</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/isocpp/isocpp-icon.svg" alt="C++" className="lang-icon" width={48} height={48} />
                <span className="lang-text">C++</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/java/java-icon.svg" alt="Java" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Java</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/python/python-icon.svg" alt="Python" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Python</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg" alt="JavaScript" className="lang-icon" width={48} height={48} />
                <span className="lang-text">JavaScript</span>
              </div>
              {/* Duplicates for seamless loop */}
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/isocpp/isocpp-icon.svg" alt="C++" className="lang-icon" width={48} height={48} />
                <span className="lang-text">C++</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/java/java-icon.svg" alt="Java" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Java</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/python/python-icon.svg" alt="Python" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Python</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg" alt="JavaScript" className="lang-icon" width={48} height={48} />
                <span className="lang-text">JavaScript</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/isocpp/isocpp-icon.svg" alt="C++" className="lang-icon" width={48} height={48} />
                <span className="lang-text">C++</span>
              </div>
              <div className="lang-item">
                <Image src="https://www.vectorlogo.zone/logos/java/java-icon.svg" alt="Java" className="lang-icon" width={48} height={48} />
                <span className="lang-text">Java</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      <style jsx>{`
        /* Marquee animations */
        @keyframes scrollRight {
            from {
                transform: translateX(-50%);
            }
            to {
                transform: translateX(0);
            }
        }

        @keyframes scrollLeft {
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(-50%);
            }
        }

        .marquee-top {
            animation: scrollRight 50s linear infinite;
        }

        .marquee-bottom {
            animation: scrollLeft 50s linear infinite;
        }

        .marquee-wrapper {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .lang-item {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.5rem;
            font-weight: 600;
            padding: 0 1rem;
            transition: transform 0.3s ease;
        }

        .lang-item:hover {
            transform: scale(1.1);
        }

        .lang-text {
            /* Default light mode color */
            color: #0b131c;
            text-shadow: 0 0 10px rgba(11, 19, 28, 0.5);
        }

        /* Dark mode styles for text only */
        :global(.dark) .lang-text {
            color: #CCF301;
            text-shadow: 0 0 10px rgba(204, 243, 1, 0.5);
        }

        /* Light mode styles for text only */
        :global(.light) .lang-text {
            color: #0b131c;
            text-shadow: 0 0 10px rgba(11, 19, 28, 0.5);
        }

        .lang-icon {
            width: 48px;
            height: 48px;
            filter: drop-shadow(0 0 12px rgba(204, 243, 1, 0.7));
            transition: filter 0.3s ease;
        }

        .lang-item:hover .lang-icon {
            filter: drop-shadow(0 0 20px rgba(204, 243, 1, 1));
        }

        /* CPU animations */
        .cpu-architecture {
            offset-anchor: 10px 0px;
            animation: animation-path;
            animation-iteration-count: infinite;
            animation-timing-function: cubic-bezier(0.75, -0.01, 0, 0.99);
        }

        .cpu-line-1 {
            offset-path: path("M 10 10 h 45 q 5 0 5 5 v 12 q 0 5 5 5 h 15");
            animation-duration: 4s;
            animation-delay: 0s;
        }
        .cpu-line-2 {
            offset-path: path("M 50 8 v 12 q 0 5 5 5 h 30 q 5 0 5 5 v 5");
            animation-delay: 1s;
            animation-duration: 3.5s;
        }
        .cpu-line-3 {
            offset-path: path("M 100 5 v 8 q 0 5 5 5 q 5 0 5 5 v 12");
            animation-delay: 2s;
            animation-duration: 3s;
        }
        .cpu-line-4 {
            offset-path: path("M 150 8 v 12 q 0 5 -5 5 h -40 q -5 0 -5 5 v 5");
            animation-delay: 1.5s;
            animation-duration: 3.5s;
        }
        .cpu-line-5 {
            offset-path: path("M 190 10 h -45 q -5 0 -5 5 v 12 q 0 5 -5 5 h -15");
            animation-delay: 2.5s;
            animation-duration: 4s;
        }
        .cpu-line-6 {
            offset-path: path("M 80 60 v 8 q 0 5 -5 5 h -18 q -5 0 -5 5 v 12");
            animation-delay: 0.5s;
            animation-duration: 4s;
        }
        .cpu-line-7 {
            offset-path: path("M 90 60 v 12 q 0 5 -5 5 h -12 q -5 0 -5 5 v 8");
            animation-delay: 1.5s;
            animation-duration: 3.5s;
        }
        .cpu-line-8 {
            offset-path: path("M 100 60 v 15 q 0 5 5 5 h 10 q 5 0 5 5 v 5");
            animation-delay: 2.5s;
            animation-duration: 3s;
        }
        .cpu-line-9 {
            offset-path: path("M 110 60 v 12 q 0 5 5 5 h 12 q 5 0 5 5 v 8");
            animation-delay: 1s;
            animation-duration: 3.5s;
        }
        .cpu-line-10 {
            offset-path: path("M 120 60 v 8 q 0 5 5 5 h 18 q 5 0 5 5 v 12");
            animation-delay: 2s;
            animation-duration: 4s;
        }

        @keyframes animation-path {
            0% {
                offset-distance: 0%;
            }
            100% {
                offset-distance: 100%;
            }
        }

        @keyframes borderTrace {
            0%, 100% {
                stroke-dashoffset: 288;
            }
            50% {
                stroke-dashoffset: 0;
            }
        }

        .border-trace {
            stroke-dasharray: 144;
            animation: borderTrace 4s linear infinite;
        }

        @keyframes pulseGlow {
            0%, 100% {
                filter: drop-shadow(0 0 1px #CCF301) drop-shadow(0 0 1px #CCF301);
            }
            50% {
                filter: drop-shadow(0 0 2px #CCF301) drop-shadow(0 0 2px #CCF301);
            }
        }

        .cpu-box-glow {
            animation: pulseGlow 2s ease-in-out infinite;
        }

        .scroll-container {
            overflow: hidden;
            position: relative;
            width: 100%;
            padding: 12px 0;
        }

        .scroll-content {
            display: inline-flex;
            align-items: center;
            gap: 3rem;
            will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default Program;