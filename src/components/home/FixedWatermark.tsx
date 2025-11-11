
'use client';

const FixedWatermark = () => {
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-auto pointer-events-none z-0"
      style={{
        opacity: 0.1,
        fontSize: '200px',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#000',
        textAlign: 'center',
        lineHeight: '1',
        WebkitTextStroke: '1px #fff',
        textShadow: '0 0 20px rgba(255,255,255,0.8)',
        userSelect: 'none',
      }}
    >
      Preventify
    </div>
  );
};

export default FixedWatermark;
