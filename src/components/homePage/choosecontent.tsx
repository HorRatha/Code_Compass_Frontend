import React, { useEffect, useRef, useCallback } from 'react';

interface ChooseContentProps {
  isDarkMode?: boolean;
}

const ChooseContent: React.FC<ChooseContentProps> = () => {
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
      return null;
    }

    const pathContainerRect = pathContainer.getBoundingClientRect();
    const scrollY = window.pageYOffset;
    
    const containerOffsetTop = pathContainerRect.top + scrollY;

    const points: { x: number; y: number }[] = [];

    points.push({
      x: pathContainerRect.width / 2,
      y: -50
    });

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const content = card.querySelector('.choose-feature-content');
      const contentRect = content?.getBoundingClientRect();

      if (contentRect) {
        const x = rect.left - pathContainerRect.left + contentRect.width / 2;
        const y = rect.top + scrollY - containerOffsetTop + contentRect.height / 2;
        points.push({ x, y });
      }
    });

    if (points.length < 2) {
      return null;
    }

    let pathD = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const cpDistance = distance * 0.4;

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
          position: relative;
        }

        .section-divider-choose {
          max-width: 200px;
          height: 2px;
          background: linear-gradient(to right, transparent, currentColor, transparent);
          margin: 0 auto 60px;
          opacity: 0.3;
        }

        .path-container-choose {
          position: relative;
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
          z-index: 0;
          overflow: visible;
        }

        .path-line-choose {
          fill: none;
          stroke: #0b131c;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          opacity: 0.3;
        }

        .dark .path-line-choose {
          stroke: #CCF301;
          opacity: 0.4;
        }

        .path-glow-choose {
          fill: none;
          stroke: #0b131c;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 8px rgba(11, 19, 28, 0.3)) drop-shadow(0 0 16px rgba(11, 19, 28, 0.2));
        }

        .dark .path-glow-choose {
          stroke: #CCF301;
          filter: drop-shadow(0 0 8px rgba(204, 243, 1, 0.7)) drop-shadow(0 0 16px rgba(204, 243, 1, 0.7));
        }

        .choose-feature-row {
          position: relative;
          z-index: 2;
          margin-bottom: 64px;
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
            margin-bottom: 32px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .choose-feature-row {
            margin-bottom: 48px;
          }
        }

        .choose-feature-card {
          opacity: 0;
          transition: opacity 0.8s ease, transform 0.8s ease;
          min-height: 300px;
        }

        @media (max-width: 768px) {
          .choose-feature-card {
            min-height: 200px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .choose-feature-card {
            min-height: 250px;
          }
        }

        .choose-feature-card.feature-card-visible {
          opacity: 1;
        }

        .choose-feature-content {
          padding: 48px;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          height: 100%;
        }

        .dark .choose-feature-content {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(204, 243, 1, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(20px);
        }

        @media (max-width: 768px) {
          .choose-feature-content {
            padding: 24px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .choose-feature-content {
            padding: 32px;
          }
        }

        .choose-feature-content:hover {
          transform: translateY(-8px);
        }

        .choose-feature-content:hover {
          box-shadow: 0 12px 40px rgba(11, 19, 28, 0.15);
          border-color: #0b131c;
        }

        .dark .choose-feature-content:hover {
          box-shadow: 0 20px 60px rgba(204, 243, 1, 0.2);
          border-color: #CCF301;
        }

        .choose-feature-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #0b131c;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .dark .choose-feature-title {
          color: #CCF301;
        }

        @media (max-width: 768px) {
          .choose-feature-title {
            font-size: 1.25rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .choose-feature-title {
            font-size: 1.5rem;
          }
        }

        .choose-feature-description {
          font-size: 1.25rem;
          line-height: 1.8;
          color: #475569;
        }

        .dark .choose-feature-description {
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .choose-feature-description {
            font-size: 0.875rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .choose-feature-description {
            font-size: 1rem;
          }
        }

        .path-dot-choose {
          position: absolute;
          width: 16px;
          height: 16px;
          background: #CCF301;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(204, 243, 1, 0.7), 0 0 40px rgba(204, 243, 1, 0.7);
          z-index: 3;
          pointer-events: none;
          transform: translate(-50%, -50%);
          opacity: 0;
        }

        @media (max-width: 768px) {
          .section-divider-choose {
            max-width: 200px;
          }
        }
      `}</style>

      <div className="choose-content-wrapper text-gray-900 dark:text-white transition-colors duration-300" ref={containerRef}>
        <div className="section-divider-choose"></div>

        <div className="path-container-choose max-w-7xl mx-auto px-6">
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