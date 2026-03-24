// Subtle decorative corner brackets for the game screen
export default function ScreenDecor() {
  const bracketStyle = 'absolute pointer-events-none';
  const color = '#EAB308';
  const opacity = 0.12;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Top-left corner bracket */}
      <svg className={bracketStyle} style={{ top: 6, left: 6, opacity }} width="20" height="20" viewBox="0 0 20 20">
        <rect x="0" y="0" width="20" height="3" fill={color} />
        <rect x="0" y="0" width="3" height="20" fill={color} />
      </svg>
      {/* Top-right corner bracket */}
      <svg className={bracketStyle} style={{ top: 6, right: 6, opacity }} width="20" height="20" viewBox="0 0 20 20">
        <rect x="0" y="0" width="20" height="3" fill={color} />
        <rect x="17" y="0" width="3" height="20" fill={color} />
      </svg>
      {/* Bottom-left corner bracket */}
      <svg className={bracketStyle} style={{ bottom: 6, left: 6, opacity }} width="20" height="20" viewBox="0 0 20 20">
        <rect x="0" y="17" width="20" height="3" fill={color} />
        <rect x="0" y="0" width="3" height="20" fill={color} />
      </svg>
      {/* Bottom-right corner bracket */}
      <svg className={bracketStyle} style={{ bottom: 6, right: 6, opacity }} width="20" height="20" viewBox="0 0 20 20">
        <rect x="0" y="17" width="20" height="3" fill={color} />
        <rect x="17" y="0" width="3" height="20" fill={color} />
      </svg>

      {/* Scattered small pixel dots for game feel */}
      {[
        { x: '15%', y: '25%' }, { x: '82%', y: '18%' }, { x: '70%', y: '72%' },
        { x: '25%', y: '80%' }, { x: '55%', y: '45%' }, { x: '90%', y: '55%' },
        { x: '8%', y: '60%' }, { x: '45%', y: '15%' }, { x: '60%', y: '88%' },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: dot.x,
            top: dot.y,
            width: 3,
            height: 3,
            background: color,
            opacity: 0.08,
          }}
        />
      ))}
    </div>
  );
}
