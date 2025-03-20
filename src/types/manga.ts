export interface Manga {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  description: string;
  author: string;
  status: 'completed' | 'ongoing' | 'dropped' | 'upcoming';
  genres: string[];
  rating: number;
  totalRatings: number;
  views: number;
  lastUpdated: string;
  chapters: MangaChapter[];
}

export interface MangaChapter {
  id: string;
  number: number;
  title: string;
  slug: string;
  releaseDate: string;
  pages?: string[];
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export type MangaStatus = 'completed' | 'ongoing' | 'dropped' | 'upcoming';

export type SortOption = 'latest-updated' | 'newly-added' | 'release-date' | 'trending' | 'name-asc' | 'most-viewed' | 'most-liked';

export interface MangaFilter {
  search?: string;
  status?: MangaStatus;
  genres?: string[];
  minChapters?: number;
  sort?: SortOption;
}

