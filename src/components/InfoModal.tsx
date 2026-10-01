import React from 'react';
import { X, GitBranch, Image, Film, HardDrive, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { MediaItem } from '../types';

interface InfoModalProps {
  media: MediaItem[];
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ media, onClose }) => {
  const totalSizeBytes = media.reduce((acc, m) => acc + m.sizeBytes, 0);
  const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">About M. Alaa Media Archive</h3>
              <p className="text-xs text-slate-400">Migrated & reconstructed from GitHub repository</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details Content */}
        <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <GitBranch className="w-4 h-4 text-amber-400" /> Source Repository:
              </span>
              <span className="font-mono text-white font-medium">KEMO-omar/M.alaa.s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Image className="w-4 h-4 text-amber-400" /> Preserved Assets:
              </span>
              <span className="text-white font-medium">{media.length} items (Photos, Artworks, Reels)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-amber-400" /> Total Footprint:
              </span>
              <span className="font-mono text-white font-medium">{totalSizeMB} MB</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Migration & Architecture:</h4>
            <p className="text-slate-400 leading-relaxed text-xs">
              This application transforms the raw media collection from the imported repository into an interactive, high-performance web gallery and multimedia viewer running on Node.js 22 + React + Vite + Tailwind CSS.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Interactive Features:</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>Rich Media Lightbox:</strong> Zoom, rotate, EXIF inspection, direct download.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>Custom Video Reel Player:</strong> Scrub, playback speed, volume, fullscreen.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>Fullscreen Slideshow:</strong> Automated photo slideshow with customizable timer.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>Multi-layout Support:</strong> Standard Grid, Masonry fluid columns, and Editorial Feed.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>Local Storage Persistence:</strong> Star your favorite captures across browser visits.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
