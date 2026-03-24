import { useEffect, useState } from 'react';

// A small pixel-art monster that wanders randomly on the screen
export default function PixelMonster() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [flip, setFlip] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos(prev => {
        const dx = (Math.random() - 0.5) * 22;
        const dy = (Math.random() - 0.5) * 22;
        const nx = Math.max(5, Math.min(88, prev.x + dx));
        const ny = Math.max(8, Math.min(82, prev.y + dy));
        if (dx < 0) setFlip(true);
        if (dx > 0) setFlip(false);
        return { x: nx, y: ny };
      });
      setFrame(f => (f + 1) % 2);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const monsterPixels = frame === 0 ? (
    // Frame 1 - standing
    <svg width="28" height="28" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="4" y="0" width="8" height="2" fill="#EAB308" />
      <rect x="2" y="2" width="12" height="2" fill="#EAB308" />
      <rect x="2" y="4" width="2" height="2" fill="#EAB308" />
      <rect x="6" y="4" width="4" height="2" fill="#EAB308" />
      <rect x="12" y="4" width="2" height="2" fill="#EAB308" />
      <rect x="4" y="4" width="2" height="2" fill="#000" />
      <rect x="10" y="4" width="2" height="2" fill="#000" />
      <rect x="2" y="6" width="12" height="2" fill="#EAB308" />
      <rect x="6" y="8" width="4" height="2" fill="#EAB308" />
      <rect x="4" y="8" width="2" height="2" fill="#EAB308" />
      <rect x="10" y="8" width="2" height="2" fill="#EAB308" />
      <rect x="2" y="10" width="4" height="2" fill="#EAB308" />
      <rect x="10" y="10" width="4" height="2" fill="#EAB308" />
      <rect x="2" y="12" width="2" height="2" fill="#EAB308" />
      <rect x="12" y="12" width="2" height="2" fill="#EAB308" />
    </svg>
  ) : (
    // Frame 2 - walking
    <svg width="28" height="28" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="4" y="0" width="8" height="2" fill="#EAB308" />
      <rect x="2" y="2" width="12" height="2" fill="#EAB308" />
      <rect x="2" y="4" width="2" height="2" fill="#EAB308" />
      <rect x="6" y="4" width="4" height="2" fill="#EAB308" />
      <rect x="12" y="4" width="2" height="2" fill="#EAB308" />
      <rect x="4" y="4" width="2" height="2" fill="#000" />
      <rect x="10" y="4" width="2" height="2" fill="#000" />
      <rect x="2" y="6" width="12" height="2" fill="#EAB308" />
      <rect x="4" y="8" width="8" height="2" fill="#EAB308" />
      <rect x="2" y="10" width="4" height="2" fill="#EAB308" />
      <rect x="10" y="10" width="4" height="2" fill="#EAB308" />
      <rect x="4" y="12" width="2" height="2" fill="#EAB308" />
      <rect x="10" y="12" width="2" height="2" fill="#EAB308" />
    </svg>
  );

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div
        style={{
          position: 'absolute',
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: `${flip ? 'scaleX(-1)' : 'scaleX(1)'}`,
          transition: 'left 0.9s linear, top 0.9s linear',
          opacity: 0.14,
        }}
      >
        {monsterPixels}
      </div>
    </div>
  );
}
