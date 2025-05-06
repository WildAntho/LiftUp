const PulsingCircleStyle = () => (
  <style>{`
    @keyframes heartbeat {
      0% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.3); opacity: 1; }
      100% { transform: scale(1); opacity: 0.5; }
    }
    .circle-pulse {
      animation: heartbeat 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      will-change: transform;
      transform: translateZ(0);
      backface-visibility: hidden;
    }
  `}</style>
);

export default function PulsingCircle() {
  return (
    <div className="absolute top-[6px] right-[8px]">
      <div className="w-[8px] h-[8px] bg-black rounded-full circle-pulse" />
      <PulsingCircleStyle />
    </div>
  );
}
