import React, { useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { isRealText } from '../data/portfolioData';

/**
 * PolaroidFrame: An editorial polaroid frame with thicker bottom border,
 * slight initial rotation, hard offset shadow, optional gold tape strip on top,
 * and neutral placeholder. Stays light (paper look) in both themes with darker shadow in dark mode.
 */
export default function PolaroidFrame({
  frame,
  targetRef,
  travel = [-40, 60],
  rotateDelta = 2.2,
  initialRotate = 0,
  showTape = true,
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const baseRotation =
    typeof frame?.rotation === 'number' ? frame.rotation : initialRotate;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], travel);
  const rTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [baseRotation - rotateDelta / 2, baseRotation + rotateDelta / 2]
  );

  const hasImage = isRealText(frame?.image) && !imgError;

  return (
    <motion.div
      style={{
        y: shouldReduceMotion ? 0 : yTransform,
        rotate: shouldReduceMotion ? baseRotation : rTransform,
        willChange: 'transform',
      }}
      className={`relative bg-white p-3 pb-8 sm:p-3.5 sm:pb-9 rounded-sm border border-[#C9A227]/25 shadow-[6px_8px_0px_rgba(11,31,58,0.13)] dark:shadow-[6px_8px_0px_rgba(0,0,0,0.45)] select-none ${className}`}
    >
      {/* Optional Gold Tape Strip on top */}
      {(showTape || frame?.tape) && (
        <div
          aria-hidden="true"
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-5 bg-gradient-to-r from-[#E8D48A]/90 via-[#C9A227]/85 to-[#E8D48A]/90 border-y border-[#9A7B1C]/35 shadow-sm rotate-[-2deg] pointer-events-none z-20 backdrop-blur-[1px]"
        />
      )}

      {/* Square / 4:3 Image Slot */}
      <div className="relative w-full aspect-square bg-[#FBF8F1] overflow-hidden border border-[#C9A227]/20 rounded-[1px]">
        {hasImage ? (
          <img
            src={frame.image}
            alt={frame.title || frame.caption || 'Polaroid snapshot'}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#FBF8F1] via-[#F4EBCF]/60 to-[#FFFFFF] flex flex-col items-center justify-center p-3 text-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-[#8A6D12]">
              <Camera className="w-4 h-4 text-[#8A6D12]" />
            </div>
            <span className="text-[10px] text-navy/60 uppercase tracking-wider font-normal">
              {frame?.title || 'Snapshot'}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Editorial Caption */}
      {(frame?.title || frame?.caption) && (
        <div className="pt-2 px-0.5 text-center">
          {frame.title && (
            <span className="block text-xs font-normal text-navy leading-snug line-clamp-2">
              {frame.title}
            </span>
          )}
          {frame.caption && (
            <span className="block text-[10px] font-normal text-navy/60 truncate mt-0.5">
              {frame.caption}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
