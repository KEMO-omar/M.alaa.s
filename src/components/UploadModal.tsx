import React, { useState } from 'react';
import { X, Upload, Check, AlertCircle, FilePlus } from 'lucide-react';
import { MediaItem } from '../types';

interface UploadModalProps {
  onClose: () => void;
  onAddMedia: (item: MediaItem) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ onClose, onAddMedia }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<'photos' | 'artworks' | 'videos'>('photos');
  const [tagsInput, setTagsInput] = useState<string>('Custom, Showcase');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError(null);

      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }

      if (selectedFile.type.startsWith('video/')) {
        setCategory('videos');
      } else if (category === 'videos') {
        setCategory('photos');
      }

      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !previewUrl) {
      setError('Please select an image or video file.');
      return;
    }

    const isVideo = file.type.startsWith('video/');
    const sizeKB = Math.round(file.size / 1024);
    const sizeFormatted = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newItem: MediaItem = {
      id: `custom-${Date.now()}`,
      title: title || file.name,
      filename: file.name,
      url: previewUrl,
      type: isVideo ? 'video' : 'image',
      category: category,
      dimensions: isVideo ? 'Custom Video' : 'Custom Image',
      aspectRatio: 'Auto',
      sizeBytes: file.size,
      sizeFormatted: sizeFormatted,
      date: new Date().toISOString().split('T')[0],
      tags: tags.length > 0 ? tags : ['Upload'],
      description: 'User-uploaded media item added during active showcase session.'
    };

    onAddMedia(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <FilePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Add New Media</h3>
              <p className="text-xs text-slate-400">Append an image or video to the current showcase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          
          {/* File Picker Zone */}
          <div className="relative border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-950/50">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {previewUrl ? (
              <div className="flex flex-col items-center">
                {file?.type.startsWith('video/') ? (
                  <video src={previewUrl} className="h-32 max-w-full rounded-xl object-contain mb-2" />
                ) : (
                  <img src={previewUrl} alt="Preview" className="h-32 max-w-full rounded-xl object-contain mb-2" />
                )}
                <span className="text-xs text-amber-400 font-medium">{file?.name}</span>
                <span className="text-[11px] text-slate-500">Click to choose another file</span>
              </div>
            ) : (
              <div className="flex flex-col items-center py-4">
                <Upload className="w-8 h-8 text-amber-400 mb-2" />
                <span className="text-sm font-semibold text-slate-200">Click or drag & drop file</span>
                <span className="text-xs text-slate-500 mt-1">JPEG, PNG, WEBP, MP4, MOV</span>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Portrait at Sunset"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500/60"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500/60"
            >
              <option value="photos">Photos & Portraits</option>
              <option value="artworks">Artworks & Cover Design</option>
              <option value="videos">Video Clips</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Portrait, Summer, Outdoor"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500/60"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Add to Gallery</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
