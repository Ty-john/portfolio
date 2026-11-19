import React, { useState, useEffect } from 'react';

/**
 * DoodleBackground: Fixed background with an organic, varied doodle pattern.
 * Transparent container so html/body background provides the canvas.
 * Uses /bg/doodles.png if present; otherwise renders an inline SVG pattern
 * of line-art tech icons with stroke var(--doodle-stroke) and opacity var(--doodle-opacity).
 */
export default function DoodleBackground() {
  const [hasPng, setHasPng] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/bg/doodles.png';
    img.onload = () => setHasPng(true);
    img.onerror = () => setHasPng(false);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[var(--bg)] transition-colors duration-300"
    >
      {hasPng ? (
        <div
          className="w-full h-full opacity-[0.10]"
          style={{
            backgroundImage: 'url(/bg/doodles.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '480px 480px',
          }}
        />
      ) : (
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="tech-doodles-pattern"
              width="480"
              height="480"
              patternUnits="userSpaceOnUse"
            >
              <g
                id="tech-doodles-group"
                style={{
                  stroke: 'var(--doodle-stroke)',
                  strokeOpacity: 'var(--doodle-opacity)',
                }}
                stroke="var(--doodle-stroke)"
                strokeOpacity="0.10"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                {/* 1. Large Laptop (Size 1.05, -14° tilt) */}
                <g transform="translate(38, 48) rotate(-14) scale(1.05)">
                  <rect x="0" y="0" width="32" height="20" rx="2" />
                  <path d="M-4 20h40l-3 4H-1z" />
                  <path d="M12 22h8" />
                </g>

                {/* 2. Small Coffee Cup (Size 0.72, +19° tilt) */}
                <g transform="translate(182, 36) rotate(19) scale(0.72)">
                  <path d="M4 8h18v9a5 5 0 01-5 5H9a5 5 0 01-5-5V8z" />
                  <path d="M22 10h3a2.5 2.5 0 012.5 2.5v1a2.5 2.5 0 01-2.5 2.5h-3" />
                  <path d="M8 2c0 1.5-1.5 2-1.5 3.5M13 1c0 1.5-1.5 2-1.5 3.5M18 2c0 1.5-1.5 2-1.5 3.5" />
                </g>

                {/* 3. Regular Code Brackets (Size 1.0, -8° tilt) */}
                <g transform="translate(308, 62) rotate(-8)">
                  <path d="M7 0L0 7l7 7M19 0l7 7-7 7M15 -1l-4 16" />
                </g>

                {/* 4. Small Star/Sparkle (Size 0.75, +24° tilt) */}
                <g transform="translate(426, 42) rotate(24) scale(0.75)">
                  <path d="M9 0L11 6L17 7L12 11L14 17L9 13L4 17L6 11L1 7L7 6Z" />
                </g>

                {/* 5. Regular Database (Size 1.0, +12° tilt) */}
                <g transform="translate(92, 168) rotate(12)">
                  <ellipse cx="14" cy="5" rx="13" ry="4" />
                  <path d="M1 5v6c0 2.2 5.8 4 13 4s13-1.8 13-4V5" />
                  <path d="M1 11v6c0 2.2 5.8 4 13 4s13-1.8 13-4v-6" />
                </g>

                {/* 6. Large Chip / Processor (Size 1.1, -22° tilt) */}
                <g transform="translate(235, 154) rotate(-22) scale(1.1)">
                  <rect x="6" y="6" width="18" height="18" rx="2" />
                  <rect x="10" y="10" width="10" height="10" />
                  <path d="M9 1v5M15 1v5M21 1v5M9 24v5M15 24v5M21 24v5" />
                  <path d="M1 9h5M1 15h5M1 21h5M24 9h5M24 15h5M24 21h5" />
                </g>

                {/* 7. Small Headphones (Size 0.75, -15° tilt) */}
                <g transform="translate(375, 145) rotate(-15) scale(0.75)">
                  <path d="M3 15A12 12 0 0127 15" />
                  <rect x="0" y="13" width="6" height="9" rx="3" />
                  <rect x="24" y="13" width="6" height="9" rx="3" />
                </g>

                {/* 8. Small Map Pin (Size 0.7, +18° tilt) */}
                <g transform="translate(442, 230) rotate(18) scale(0.7)">
                  <path d="M11 2a7 7 0 00-7 7c0 4.8 7 12 7 12s7-7.2 7-12a7 7 0 00-7-7z" />
                  <circle cx="11" cy="9" r="2.5" />
                </g>

                {/* 9. Large Headphones (Size 1.05, +15° tilt) */}
                <g transform="translate(45, 280) rotate(15) scale(1.05)">
                  <path d="M3 15A12 12 0 0127 15" />
                  <rect x="0" y="13" width="6" height="9" rx="3" />
                  <rect x="24" y="13" width="6" height="9" rx="3" />
                </g>

                {/* 10. Small Code Brackets (Size 0.72, -20° tilt) */}
                <g transform="translate(175, 275) rotate(-20) scale(0.72)">
                  <path d="M7 0L0 7l7 7M19 0l7 7-7 7M15 -1l-4 16" />
                </g>

                {/* 11. Regular Notebook (Size 1.0, +14° tilt) */}
                <g transform="translate(315, 268) rotate(14)">
                  <rect x="4" y="2" width="18" height="24" rx="2" />
                  <path d="M4 6H1M4 11H1M4 16H1M4 21H1" />
                  <path d="M8 8h10M8 13h10M8 18h6" />
                </g>

                {/* 12. Small Chip (Size 0.7, -16° tilt) */}
                <g transform="translate(425, 335) rotate(-16) scale(0.7)">
                  <rect x="6" y="6" width="18" height="18" rx="2" />
                  <rect x="10" y="10" width="10" height="10" />
                  <path d="M9 1v5M15 1v5M21 1v5M9 24v5M15 24v5M21 24v5" />
                  <path d="M1 9h5M1 15h5M1 21h5M24 9h5M24 15h5M24 21h5" />
                </g>

                {/* 13. Regular Coffee Cup (Size 1.0, -12° tilt) */}
                <g transform="translate(105, 395) rotate(-12)">
                  <path d="M4 8h18v9a5 5 0 01-5 5H9a5 5 0 01-5-5V8z" />
                  <path d="M22 10h3a2.5 2.5 0 012.5 2.5v1a2.5 2.5 0 01-2.5 2.5h-3" />
                  <path d="M8 2c0 1.5-1.5 2-1.5 3.5M13 1c0 1.5-1.5 2-1.5 3.5M18 2c0 1.5-1.5 2-1.5 3.5" />
                </g>

                {/* 14. Large Map Pin (Size 1.05, +16° tilt) */}
                <g transform="translate(255, 385) rotate(16) scale(1.05)">
                  <path d="M11 2a7 7 0 00-7 7c0 4.8 7 12 7 12s7-7.2 7-12a7 7 0 00-7-7z" />
                  <circle cx="11" cy="9" r="2.5" />
                </g>

                {/* 15. Small Laptop (Size 0.75, -9° tilt) */}
                <g transform="translate(392, 420) rotate(-9) scale(0.75)">
                  <rect x="0" y="0" width="32" height="20" rx="2" />
                  <path d="M-4 20h40l-3 4H-1z" />
                  <path d="M12 22h8" />
                </g>

                {/* 16. Small Database (Size 0.72, +22° tilt) */}
                <g transform="translate(28, 430) rotate(22) scale(0.72)">
                  <ellipse cx="14" cy="5" rx="13" ry="4" />
                  <path d="M1 5v6c0 2.2 5.8 4 13 4s13-1.8 13-4V5" />
                  <path d="M1 11v6c0 2.2 5.8 4 13 4s13-1.8 13-4v-6" />
                </g>
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-doodles-pattern)" />
        </svg>
      )}
    </div>
  );
}
