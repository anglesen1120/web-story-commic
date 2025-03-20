"use client";

import { useState, useEffect } from 'react';
import { MangaFilters } from '@/components/manga/manga-filters';
import { MangaGrid } from '@/components/manga/manga-grid';
import { FEATURED_MANGAS, TRENDING_MANGAS, GENRES } from '@/data/mock-data';
import { Manga, MangaFilter, SortOption } from '@/types/manga';
import { useParams } from 'next/navigation';

export default function GenreDetailPage() {
  const params = useParams();
  const genreSlug = params.slug as string;
  const genre = GENRES.find(g => g.slug === genreSlug);
  
  const [filteredMangas, setFilteredMangas] = useState<Manga[]>([]);

  useEffect(() => {
    // Filter mangas by genre on initial load
    const allMangas = [...FEATURED_MANGAS, ...TRENDING_MANGAS];
    const genreMangas = allMangas.filter(manga => 
      manga.genres.some(g => g.toLowerCase() === genre?.name.toLowerCase())
    );
    setFilteredMangas(genreMangas);
  }, [genreSlug]);

  const handleFilterChange = (filters: MangaFilter) => {
    let filtered = [...FEATURED_MANGAS, ...TRENDING_MANGAS].filter(manga => 
      manga.genres.some(g => g.toLowerCase() === genre?.name.toLowerCase())
    );

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(manga => 
        manga.title.toLowerCase().includes(searchLower) ||
        manga.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(manga =>
        manga.status === filters.status
      );
    }

    // Apply length filter
    if (filters.minChapters) {
      filtered = filtered.filter(manga =>
        manga.chapters.length >= filters.minChapters!
      );
    }

    // Apply sorting
    switch (filters.sort) {
      case 'newly-added':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'release-date':
        filtered.sort((a, b) => new Date(b.chapters[0].releaseDate).getTime() - new Date(a.chapters[0].releaseDate).getTime());
        break;
      case 'trending':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'most-viewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'most-liked':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'latest-updated'
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    }

    setFilteredMangas(filtered);
  };

  if (!genre) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-400">Không tìm thấy thể loại</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">{genre.name}</h1>
        
        <MangaFilters 
          onFilterChange={handleFilterChange}
          totalMangas={filteredMangas.length}
        />

        <div className="mt-8">
          {filteredMangas.length > 0 ? (
            <MangaGrid mangas={filteredMangas} columns={7}/>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">Không tìm thấy truyện nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 