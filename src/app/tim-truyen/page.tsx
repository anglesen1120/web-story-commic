"use client";

import Link from 'next/link';
import { GENRES } from '@/data/mock-data';
import { FEATURED_MANGAS, TRENDING_MANGAS } from '@/data/mock-data';
import { MangaFilters } from '@/components/manga/manga-filters';
import { MangaGrid } from '@/components/manga/manga-grid';
import { useState } from 'react';
import { Manga, MangaFilter } from '@/types/manga';

export default function SearchPage() {
  const [filteredMangas, setFilteredMangas] = useState<Manga[]>([...FEATURED_MANGAS, ...TRENDING_MANGAS]);

  const handleFilterChange = (filters: MangaFilter) => {
    let filtered = [...FEATURED_MANGAS, ...TRENDING_MANGAS];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(manga => 
        manga.title.toLowerCase().includes(searchLower) ||
        manga.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply genre filter
    if (filters.genres && filters.genres.length > 0) {
      filtered = filtered.filter(manga =>
        filters.genres!.some(genre => 
          manga.genres.some(g => g.toLowerCase() === genre.toLowerCase())
        )
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Tìm truyện</h1>

        {/* Genre Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Thể loại</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {GENRES.map((genre) => (
              <Link
                key={genre.id}
                href={`/tim-truyen/${genre.slug}`}
                className="bg-[#1a1a2e] hover:bg-[#16213e] text-white p-4 rounded-lg transition-colors duration-200"
              >
                <div className="font-medium">{genre.name}</div>
                <div className="text-sm text-gray-400 mt-1">
                  {filteredMangas.filter(manga => 
                    manga.genres.some(g => g.toLowerCase() === genre.name.toLowerCase())
                  ).length} truyện
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Filters and Manga Grid */}
        <div className="mt-8">
          <MangaFilters 
            onFilterChange={handleFilterChange}
            totalMangas={filteredMangas.length}
          />

          <div className="mt-8">
            {filteredMangas.length > 0 ? (
              <MangaGrid mangas={filteredMangas} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">Không tìm thấy truyện nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 