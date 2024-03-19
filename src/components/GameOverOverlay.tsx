import React, { useEffect, useState } from 'react';

interface GameOverOverlayProps {
  onTryAgain: () => void;
}

const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ onTryAgain }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        // Delay showing the overlay to create a fade-in effect
        const timeout = setTimeout(() => {
        setShowOverlay(true);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    const overlayStyle = {
        opacity: showOverlay ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out', // Define transition for opacity change
    };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50" style={overlayStyle}>
      <div className="text-center text-white">
        <p className="text-6xl m-12">Game Over.</p>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-4xl m-12 text-white" onClick={onTryAgain}>Try Again</button>
      </div>
    </div>
  );
};

export default GameOverOverlay;