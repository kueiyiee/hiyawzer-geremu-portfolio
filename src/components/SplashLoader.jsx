import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import SignatureSVG from '../assets/HG.svg?react';

// Register GSAP plugin
gsap.registerPlugin(CSSPlugin);

// Prevent double animation in StrictMode / remounts
let _animationHasRun = false;

const SplashLoader = ({ onAnimationComplete }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // StrictMode remount guard
    if (_animationHasRun) {
      onAnimationComplete?.();
      return;
    }

    _animationHasRun = true;

    const svgElement = svgRef.current;
    const container = containerRef.current;

    if (!svgElement || !container) return;

    // Prevent scrolling while splash is active
    document.body.style.overflow = 'hidden';

    const paths = svgElement.querySelectorAll(
      'path, line, polyline, circle, ellipse'
    );

    if (paths.length === 0) return;

    // Initialize SVG paths
    paths.forEach((path) => {
      const length = path.getTotalLength?.();

      if (!length || isNaN(length)) return;

      path.removeAttribute('fill');
      path.removeAttribute('stroke');
      path.removeAttribute('stroke-width');
      path.removeAttribute('stroke-dasharray');
      path.removeAttribute('stroke-dashoffset');

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
        stroke: '#b8f2e6',
        strokeWidth: 1,
      });
    });

    // Remove fills from groups
    svgElement.querySelectorAll('g').forEach((g) => {
      g.removeAttribute('fill');
      g.style.fill = 'none';
    });

    // Main animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(container, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',

          onComplete: () => {
            document.body.style.overflow = '';

            onAnimationComplete?.();
          },
        });
      },
    });

    // Signature drawing animation
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'power2.inOut',

      stagger: {
        each: 0.15,
        ease: 'power1.inOut',
      },
    })

      // Glow effect
      .to(
        paths,
        {
          filter:
            'drop-shadow(0 0 8px rgba(184, 242, 230, 0.6))',
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.5'
      )

      // Small hold before fade
      .to({}, { duration: 0.8 });

    return () => {
      document.body.style.overflow = '';

      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
        zIndex: 100000,
        opacity: 1,
      }}
    >
      {/* Animated glow background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background:
            'radial-gradient(circle, rgba(184, 242, 230, 0.1) 0%, transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Signature SVG */}
      <SignatureSVG
        ref={svgRef}
        style={{
          width: '320px',
          height: 'auto',
          stroke: '#b8f2e6',
          fill: 'none',
          strokeWidth: 1,
          position: 'relative',
          zIndex: 1,
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }

          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default SplashLoader;