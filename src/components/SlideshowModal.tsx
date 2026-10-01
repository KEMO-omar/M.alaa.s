import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight, Maximize, Clock } from 'lucide-react';
import { MediaItem } from '../types';

interface SlideshowModalProps {
  media: MediaItem[];
  onClose: () => void;
}

export const SlideshowModal: React.FC<SlideshowModalProps> = ({ media, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [intervalMs, setIntervalMs] = useState<number>(4000);
  const [progress, setProgress] = useState<number>(0);

  const currentItem = media[currentIndex] || media[0];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, media.length]);

  // Slideshow timer
  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    // If current item is video, let the video play for at least its duration or interval
    const stepMs = 50;
    const increment = (stepMs / intervalMs) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPlaying, intervalMs, currentIndex]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex(prev => (prev + 1) % media.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex(prev => (prev - 1 + media.length) % media.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between animate-in fade-in select-none">
      
      {/* Top Bar */}
      <div className="p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase tracking-wider">
            Automated Slideshow
          </span>
          <h2 className="text-white text-base sm:text-lg font-bold">
            {currentItem.title}
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            {currentIndex + 1} / {media.length} • {currentItem.dimensions}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Interval picker */}
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl p-1 text-xs">
            <Clock className="w-3.5 h-3.5 text-slate-300 ml-1.5 mr-1" />
            {[3000, 5000, 8000].map((ms) => (
              <button
                key={ms}
                onClick={() => setIntervalMs(ms)}
                className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  intervalMs === ms ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {ms / 1000}s
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors cursor-pointer"
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer"
            title="Exit slideshow (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-12 relative overflow-hidden">
        {currentItem.type === 'video' ? (
          <video
            ref={videoRef}
            key={currentItem.id}
            src={currentItem.url}
            autoPlay
            muted
            playsInline
            loop
            className="max-h-[80vh] max-w-full rounded-2xl shadow-2xl animate-in zoom-in-95 duration-500"
          />
        ) : (
          <img
            key={currentItem.id}
            src={currentItem.url}
            alt={currentItem.title}
            className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-500 select-none"
          />
        )}

        {/* Floating Prev / Next Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-transform hover:scale-110 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-transform hover:scale-110 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar & Footer */}
      <div className="z-20 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6 flex flex-col gap-3">
        {/* Continuous progress bar */}
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Thumbnails preview strip */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {media.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setProgress(0);
              }}
              className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all border-2 cursor-pointer ${
                currentIndex === idx 
                  ? 'border-amber-400 scale-110 shadow-lg' 
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              {item.type === 'video' ? (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-300">
                  <Play className="w-4 h-4" />
                </div>
              ) : (
                <img src={item.url} alt="" className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
