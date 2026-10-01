import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Download, Star, ZoomIn, ZoomOut, 
  RotateCw, Play, Pause, Volume2, VolumeX, Maximize, Film, Image as ImageIcon, 
  Palette, Calendar, FileText, HardDrive, Check, Copy, Info, RefreshCw
} from 'lucide-react';
import { MediaItem } from '../types';

interface MediaLightboxProps {
  item: MediaItem;
  allMedia: MediaItem[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  onSelectMedia: (item: MediaItem) => void;
  onDownload: (item: MediaItem) => void;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({
  item,
  allMedia,
  isFavorite,
  onToggleFavorite,
  onClose,
  onSelectMedia,
  onDownload
}) => {
  const currentIndex = allMedia.findIndex(m => m.id === item.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allMedia.length - 1;

  // Image zoom & rotate states
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  // Video playback states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isLooping, setIsLooping] = useState<boolean>(true);

  // UI state
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Reset zoom & rotation when switching items
  useEffect(() => {
    setZoomLevel(1);
    setRotation(0);
    setIsPlaying(true);
  }, [item.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onSelectMedia(allMedia[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && hasNext) {
        onSelectMedia(allMedia[currentIndex + 1]);
      } else if (e.key === ' ' && item.type === 'video') {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasPrev, hasNext, item.type, isPlaying]);

  const handlePrev = () => {
    if (hasPrev) onSelectMedia(allMedia[currentIndex - 1]);
  };

  const handleNext = () => {
    if (hasNext) onSelectMedia(allMedia[currentIndex + 1]);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  // Video controls
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleFullscreenVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopyLink = () => {
    const fullUrl = window.location.origin + item.url;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col select-none animate-in fade-in duration-200">
      
      {/* Top Navbar */}
      <div className="h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            title="Close viewer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="hidden sm:block">
            <h2 className="text-sm font-semibold text-white truncate max-w-xs md:max-w-md">
              {item.title}
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              {currentIndex + 1} of {allMedia.length} • {item.filename}
            </p>
          </div>
        </div>

        {/* Toolbar actions */}
        <div className="flex items-center gap-2">
          {item.type === 'image' && (
            <div className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-xl p-1">
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Reset zoom"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleRotate}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Rotate 90 degrees"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => onToggleFavorite(item.id)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isFavorite
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title={isFavorite ? 'Remove star' : 'Star this item'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>

          <button
            onClick={() => onDownload(item)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-medium"
            title="Download original file"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              showDetails
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle metadata sidebar"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Previous Button */}
        {hasPrev && (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-white backdrop-blur-md shadow-2xl transition-all hover:scale-110 cursor-pointer"
            title="Previous item (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-auto md:left-[calc(100%-80px)] top-1/2 -translate-y-1/2 z-30 p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-white backdrop-blur-md shadow-2xl transition-all hover:scale-110 cursor-pointer"
            style={{
              right: showDetails ? '340px' : '16px'
            }}
            title="Next item (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Center Media Stage */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative bg-black/40">
          {item.type === 'video' ? (
            <div className="relative max-w-4xl max-h-[75vh] w-full flex flex-col items-center justify-center">
              <video
                ref={videoRef}
                src={item.url}
                autoPlay
                playsInline
                loop={isLooping}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlayPause}
                className="max-h-[65vh] max-w-full rounded-2xl shadow-2xl cursor-pointer bg-black"
              />

              {/* Video Player Control Bar */}
              <div className="w-full max-w-xl mt-4 bg-slate-900/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-3 shadow-xl flex flex-col gap-2">
                {/* Scrub bar */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 min-w-[36px]">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 1}
                    step="0.05"
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <span className="text-[11px] font-mono text-slate-400 min-w-[36px]">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Bottom Control buttons */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlayPause}
                      className="p-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-1.5 ml-2">
                      <button onClick={toggleMute} className="text-slate-400 hover:text-white cursor-pointer">
                        {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                  </div>

                  {/* Playback rate & Fullscreen */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 text-[11px]">
                      {[0.5, 1, 1.5, 2].map(rate => (
                        <button
                          key={rate}
                          onClick={() => handleRateChange(rate)}
                          className={`px-1.5 py-0.5 rounded cursor-pointer ${
                            playbackRate === rate ? 'bg-amber-500/30 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleFullscreenVideo}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center overflow-auto">
              <img
                src={item.url}
                alt={item.title}
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  maxWidth: zoomLevel === 1 ? '100%' : 'none',
                  maxHeight: zoomLevel === 1 ? '100%' : 'none',
                }}
                className="object-contain rounded-xl shadow-2xl select-none"
              />
            </div>
          )}
        </div>

        {/* Right Metadata / EXIF Sidebar */}
        {showDetails && (
          <div className="w-80 sm:w-96 border-l border-slate-800 bg-slate-950/95 p-5 flex flex-col justify-between overflow-y-auto z-20">
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  Metadata & Asset Specs
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {item.filename}
                </p>
              </div>

              {item.description && (
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </div>
              )}

              {/* Technical Specs List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/70">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-slate-500" /> Resolution:
                  </span>
                  <span className="font-mono text-slate-200 font-medium">{item.dimensions}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/70">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-slate-500" /> File Size:
                  </span>
                  <span className="font-mono text-slate-200 font-medium">
                    {item.sizeFormatted} ({item.sizeBytes.toLocaleString()} bytes)
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/70">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> Capture Date:
                  </span>
                  <span className="font-mono text-slate-200 font-medium">{item.date}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/70">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500" /> Category:
                  </span>
                  <span className="font-mono text-amber-400 uppercase text-[11px] font-semibold">{item.category}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/70">
                  <span className="text-slate-400">Aspect Ratio:</span>
                  <span className="font-mono text-slate-200 font-medium">{item.aspectRatio}</span>
                </div>
              </div>

              {/* Tags */}
              <div>
                <span className="text-xs text-slate-400 font-medium block mb-2">Tags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-slate-800 space-y-2">
              <button
                onClick={() => onDownload(item)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/10 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Asset</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Asset Direct Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
