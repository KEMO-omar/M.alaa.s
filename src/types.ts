export type MediaCategory = 'all' | 'photos' | 'artworks' | 'videos' | 'favorites';

export interface MediaItem {
  id: string;
  title: string;
  filename: string;
  url: string;
  type: 'image' | 'video';
  category: 'photos' | 'artworks' | 'videos';
  dimensions: string;
  aspectRatio: string;
  sizeBytes: number;
  sizeFormatted: string;
  date: string;
  tags: string[];
  description?: string;
}

export type ViewMode = 'grid' | 'masonry' | 'editorial';
export type SortOption = 'newest' | 'oldest' | 'largest' | 'smallest' | 'name';
