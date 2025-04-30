const PulsingCircleStyle = () => (
  <style>{`
    @keyframes heartbeat {
      0% { transform: scale(1); }
      50% { transform: scale(1.3); }
      100% { transform: scale(1); }
    }
    .circle-pulse {
      animation: heartbeat 2s ease-in-out infinite;
    }
  `}</style>
);

export default function PulsingCircle() {
  return (
    <div className="absolute top-[3px] right-[6px] w-[15px] h-[15px] bg-gray-400/50 rounded-full flex justify-center items-center">
      <div className="w-[8px] h-[8px] bg-black rounded-full circle-pulse" />
      <PulsingCircleStyle />
    </div>
  );
}
