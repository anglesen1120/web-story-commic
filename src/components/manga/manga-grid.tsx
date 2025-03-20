import React from 'react';
import { Manga } from '@/types/manga';
import { MangaCard } from './manga-card';

interface MangaGridProps {
  mangas: Manga[];
  columns?: 2 | 3 | 4 | 5 | 6 | 7;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
  showStatus?: boolean;
}

export function MangaGrid({
  mangas,
  columns = 6,
  size = 'md',
  showRating = true,
  showStatus = true
}: MangaGridProps) {
  // Dynamic grid columns based on the columns prop
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
    7: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'
  };

  return (
    <div className={`grid ${gridClass[columns]} gap-2 sm:gap-3 md:gap-4`}>
      {mangas.map((manga) => (
        <div key={manga.id} className="flex justify-center">
          <MangaCard
            manga={manga}
            size={size}
            showRating={showRating}
            showStatus={showStatus}
          />
        </div>
      ))}
    </div>
  );
}
