import { useState, useEffect } from 'react';
import './style.css';
import volumeIcon from '../../assets/icons/volume.png';
import muteIcon from '../../assets/icons/mute.png';
import slide from '../../assets/icons/slide.png';
import zoomin from '../../assets/icons/zoomin.png';
import fullscreen from '../../assets/icons/fullscreen.png';
import exit from '../../assets/icons/exit.png';

const ControlBar = ({ className = '' }) => {
  const [volume, setVolume] = useState(50);
  const [zoom, setZoom] = useState(90);
  const [currentSlide, setCurrentSlide] = useState(9);
  const [totalSlides, setTotalSlides] = useState(45);

  // Simulate volume control (e.g., setting audio volume)
  useEffect(() => {
    console.log(`Volume set to: ${volume}`);
  }, [volume]);

  // Simulate zoom effect (e.g., applying CSS zooming)
  useEffect(() => {
    console.log(`Zoom set to: ${zoom}%`);
  }, [zoom]);

  return (
    <div className={`flex items-center justify-between bg-[#00000099] text-white p-3 w-full ${className}`}>
      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <button onClick={() => setVolume(volume === 0 ? 50 : 0)}>
          <img src={volume === 0 ? muteIcon : volumeIcon} alt="Volume" className="w-6 h-6" />
        </button>
        <input
          type="range"
          min="0"
          max="100"
          className="volume-slider"
          style={{
            background: volume === 0 ? '#823B00' : `linear-gradient(to right, #f8f5f2 ${volume}%, #823B00 ${volume}%)`,
          }}
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
        />
      </div>

      {/* Slide Counter */}
      <div className="flex items-center gap-2">
        <img src={slide} alt="Slides" className="w-6 h-6" />
        <span className="text-sm">
          {currentSlide}/{totalSlides} slides
        </span>
      </div>

      {/* Zoom Control */}
      <div className="flex items-center gap-2">
        <span className="bg-white text-black px-2 py-1 rounded-md text-sm">{zoom}%</span>
        <button onClick={() => setZoom((prev) => (prev === 200 ? 50 : Math.min(prev + 10, 200)))}>
          <img src={zoom === 200 ? zoomin : zoomin} alt={zoom === 200 ? 'Zoom Out' : 'Zoom In'} className="w-6 h-6" />
        </button>
        <button>
          <img src={fullscreen} alt="Fullscreen" className="w-6 h-6" />
        </button>
      </div>

      {/* Fullscreen & Exit Buttons */}
      <div className="flex items-center gap-2">
        <button>
          <img src={exit} alt="Exit" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
