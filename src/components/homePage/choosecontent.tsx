import React, { useEffect, useRef, useCallback } from 'react';

interface ChooseContentProps {
  isDarkMode?: boolean;
}

const ChooseContent: React.FC<ChooseContentProps> = ({ isDarkMode = true }) => {
  const pathDataRef = useRef<{ pathLength: number; pathGlow: SVGPathElement | null; pathLine: SVGPathElement | null }>({
    pathLength: 0,
    pathGlow: null,
    pathLine: null
  });
  const tickingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const generatePath = useCallback(() => {
    const container = containerRef.current;
    if (!container) return null;

    const pathContainer = container.querySelector('.path-container-choose');
    if (!pathContainer) return null;

    const cards = container.querySelectorAll('.choose-feature-card');
    const pathLine = container.querySelector('#pathLine') as SVGPathElement;
    const pathGlow = container.querySelector('#pathGlow') as SVGPathElement;

    if (!cards.length || !pathLine || !pathGlow) {
      console.log('Missing elements:', { cards: cards.length, pathLine: !!pathLine, pathGlow: !!pathGlow });
      return null;
    }

    const pathContainerRect = pathContainer.getBoundingClientRect();
    const scrollY = window.pageYOffset;
    
    // Get the actual offset from top of page
    const containerOffsetTop = pathContainerRect.top + scrollY;

    const points: { x: number; y: number }[] = [];

    // Starting point at top center
    points.push({
      x: pathContainerRect.width / 2,
      y: -50
    });

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const content = card.querySelector('.choose-feature-content');
      const contentRect = content?.getBoundingClientRect();

      if (contentRect) {
        // Calculate relative to path container
        const x = rect.left - pathContainerRect.left + contentRect.width / 2;
        const y = rect.top + scrollY - containerOffsetTop + contentRect.height / 2;
        points.push({ x, y });
      }
    });

    if (points.length < 2) {
      console.log('Not enough points:', points.length);
      return null;
    }

    // Create smooth S-curve path
    let pathD = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const cpDistance = distance * 0.4;

      // Create curved control points
      const cp1 = {
        x: prev.x + (dx * 0.3),
        y: prev.y + cpDistance
      };

      const cp2 = {
        x: curr.x - (dx * 0.3),
        y: curr.y - cpDistance
      };

      pathD += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${curr.x} ${curr.y}`;
    }

    pathLine.setAttribute('d', pathD);
    pathGlow.setAttribute('d', pathD);

    const pathLength = pathGlow.getTotalLength();

    console.log('Path generated:', { pathLength, points: points.length });

    return { pathLength, pathGlow, pathLine };
  }, []);

  const updatePathProgress = useCallback(() => {
    const { pathLength, pathGlow } = pathDataRef.current;
    if (!pathGlow || pathLength === 0) return;

    const container = containerRef.current;
    if (!container) return;

    const pathContainer = container.querySelector('.path-container-choose');
    if (!pathContainer) return;

    const containerRect = pathContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const containerStart = containerRect.top;
    const containerEnd = containerRect.bottom;
    const scrollStart = viewportHeight * 0.8;
    const scrollEnd = viewportHeight * 0.2;

    let scrollProgress = 0;
    if (containerStart < scrollStart && containerEnd > scrollEnd) {
      const totalScrollable = containerRect.height - (scrollStart - scrollEnd);
      const scrolled = scrollStart - containerStart;
      scrollProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    } else if (containerEnd <= scrollEnd) {
      scrollProgress = 1;
    }

    const drawLength = scrollProgress * pathLength;

    pathGlow.style.strokeDasharray = `${drawLength} ${pathLength}`;
    pathGlow.style.strokeDashoffset = '0';

    const dot = container.querySelector('#pathDot') as HTMLElement;
    if (dot && drawLength > 0 && drawLength <= pathLength) {
      const point = pathGlow.getPointAtLength(drawLength);
      dot.style.left = `${point.x}px`;
      dot.style.top = `${point.y}px`;
      dot.style.opacity = '1';
    } else if (dot) {
      dot.style.opacity = '0';
    }
  }, []);

  const initPath = useCallback(() => {
    const result = generatePath();
    if (result) {
      pathDataRef.current = result;
      updatePathProgress();
    }
  }, [generatePath, updatePathProgress]);

  const initIntersectionObserver = useCallback(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('feature-card-visible');
        }
      });
    }, {
      threshold: 0.2
    });

    document.querySelectorAll('.choose-feature-card').forEach(card => {
      observer.observe(card);
    });
  }, []);

  useEffect(() => {
    // Wait for cards to render, then init path
    const timer = setTimeout(() => {
      initPath();
      initIntersectionObserver();
    }, 500);

    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          updatePathProgress();
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    const handleResize = () => {
      setTimeout(() => initPath(), 200);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [initPath, initIntersectionObserver, updatePathProgress]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&display=swap');
        
        .choose-content-wrapper * {
          font-family: 'Barlow', sans-serif;
        }
        
        .choose-content-wrapper {
          --text-primary: ${isDarkMode ? '#ffffff' : '#0b131c'};
          --text-secondary: ${isDarkMode ? '#94a3b8' : '#475569'};
          --accent-color: ${isDarkMode ? '#CCF301' : '#0b131c'};
          --accent-glow: ${isDarkMode ? 'rgba(204, 243, 1, 0.7)' : 'rgba(11, 19, 28, 0.3)'};
          --line-color: ${isDarkMode ? 'rgba(204, 243, 1, 0.4)' : 'rgba(11, 19, 28, 0.2)'};
          --card-bg: ${isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'transparent'};
          --card-light-gradient: linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #f3f4f6 100%);
          --card-border: ${isDarkMode ? 'rgba(204, 243, 1, 0.1)' : 'rgba(11, 19, 28, 0.1)'};
          color: var(--text-primary);
          position: relative;
        }
        
        .hero-section-choose {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
        }

        .title-main-choose {
          font-size: 3rem; /* text-6xl - 60px */
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }

        .title-gradient-choose {
          background: linear-gradient(135deg, var(--accent-color) 0%, ${isDarkMode ? '#a8d800' : '#1e293b'} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-divider-choose {
          max-width: 200px;
          height: 2px;
          background: linear-gradient(to right, transparent, var(--accent-color), transparent);
          margin: 0 auto 60px;
        }

        .path-container-choose {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 24px;
        }

        .path-svg-choose {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: visible;
        }

        .path-line-choose {
          fill: none;
          stroke: var(--line-color);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .path-glow-choose {
          fill: none;
          stroke: var(--accent-color);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 8px var(--accent-glow)) drop-shadow(0 0 16px var(--accent-glow));
        }

        .choose-feature-row {
          position: relative;
          z-index: 2;
          margin-bottom: 64px; /* space-y-16 - 64px */
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .choose-feature-row:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .choose-feature-row {
            grid-template-columns: 1fr;
            gap: 40px;
            margin-bottom: 32px; /* space-y-8 - 32px */
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .choose-feature-row {
            margin-bottom: 48px; /* space-y-12 - 48px */
          }
        }

        .choose-feature-card {
          opacity: 0;
          transition: opacity 0.8s ease, transform 0.8s ease;
          min-height: 300px; /* min-h-[300px] */
        }

        @media (max-width: 768px) {
          .choose-feature-card {
            min-height: 200px; /* min-h-[200px] */
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .choose-feature-card {
            min-height: 250px; /* min-h-[250px] */
          }
        }

        .choose-feature-card.feature-card-visible {
          opacity: 1;
        }

        .choose-feature-content {
          padding: 48px; /* p-12 - 48px */
          background: ${isDarkMode ? 'var(--card-bg)' : 'var(--card-light-gradient)'};
          backdrop-filter: ${isDarkMode ? 'blur(20px)' : 'none'};
          border: 1px solid var(--card-border);
          border-radius: 24px;
          box-shadow: ${isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.1)' : '0 4px 24px rgba(0, 0, 0, 0.05)'};
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          height: 100%;
        }

        @media (max-width: 768px) {
          .choose-feature-content {
            padding: 24px; /* p-6 - 24px */
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .choose-feature-content {
            padding: 32px; /* p-8 - 32px */
          }
        }

        .choose-feature-content:hover {
          transform: translateY(-8px);
          box-shadow: ${isDarkMode ? '0 20px 60px rgba(204, 243, 1, 0.2)' : '0 12px 40px rgba(11, 19, 28, 0.15)'};
          border-color: var(--accent-color);
        }

        .choose-feature-title {
          font-size: 1.875rem; /* text-3xl - 30px */
          font-weight: 700;
          color: var(--accent-color);
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        @media (max-width: 768px) {
          .choose-feature-title {
            font-size: 1.25rem; /* text-xl - 20px */
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .choose-feature-title {
            font-size: 1.5rem; /* text-2xl - 24px */
          }
        }

        .choose-feature-description {
          font-size: 1.25rem; /* text-xl - 20px */
          line-height: 1.8;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .choose-feature-description {
            font-size: 0.875rem; /* text-sm - 14px */
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .choose-feature-description {
            font-size: 1rem; /* text-base - 16px */
          }
        }

        .path-dot-choose {
          position: absolute;
          width: 16px;
          height: 16px;
          background: var(--accent-color);
          border-radius: 50%;
          box-shadow: 0 0 20px var(--accent-glow), 0 0 40px var(--accent-glow);
          z-index: 3;
          pointer-events: none;
          transform: translate(-50%, -50%);
          opacity: 0;
        }

        /* Responsive title sizes */
        @media (max-width: 768px) {
          .title-main-choose {
            font-size: 1.875rem; /* text-3xl - 30px */
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .title-main-choose {
            font-size: 2.25rem; /* text-4xl - 36px */
          }
        }
      `}</style>

      <div className="choose-content-wrapper" ref={containerRef}>
        <div className="section-divider-choose"></div>

        <div className="path-container-choose">
          <svg className="path-svg-choose" preserveAspectRatio="none">
            <path className="path-line-choose" id="pathLine"></path>
            <path className="path-glow-choose" id="pathGlow"></path>
          </svg>
          
          <div className="path-dot-choose" id="pathDot"></div>

          <div className="choose-feature-row">
            <div className="choose-feature-card">
              <div className="choose-feature-content">
                <h2 className="choose-feature-title">Problem Sets</h2>
                <p className="choose-feature-description">
                  Sharpen your skills in Java, widely used in enterprise applications, Android development, and scalable systems.
                </p>
              </div>
            </div>
            <div className="choose-feature-card">
              <div className="choose-feature-content">
                <h2 className="choose-feature-title">Coding Challenges</h2>
                <p className="choose-feature-description">
                  Solve coding problems in Python, the most beginner-friendly language with powerful libraries for data science, AI, and automation.
                </p>
              </div>
            </div>
          </div>

          <div className="choose-feature-row">
            <div className="choose-feature-card">
              <div className="choose-feature-content">
                <h2 className="choose-feature-title">Algorithm Exercises</h2>
                <p className="choose-feature-description">
                  Master C, the foundation of programming that teaches you memory management, performance, and low-level concepts.
                </p>
              </div>
            </div>
            <div className="choose-feature-card">
              <div className="choose-feature-content">
                <h2 className="choose-feature-title">JavaScript Tasks</h2>
                <p className="choose-feature-description">
                  Level up with JavaScript, the language of the web, powering interactive websites, front-end frameworks, and full-stack apps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseContent;