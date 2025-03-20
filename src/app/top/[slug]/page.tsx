"use client";

import { useState, useEffect } from 'react';
import { MangaFilters } from '@/components/manga/manga-filters';
import { MangaGrid } from '@/components/manga/manga-grid';
import { FEATURED_MANGAS, TRENDING_MANGAS, TOPMENU_MANGAS } from '@/data/mock-data';
import { Manga, MangaFilter } from '@/types/manga';
import { useParams } from 'next/navigation';

export default function TopMenuPage() {
  const params = useParams();
  const menuSlug = params.slug as string;
  const menuItem = TOPMENU_MANGAS.find(item => item.slug === menuSlug);
  
  const [filteredMangas, setFilteredMangas] = useState<Manga[]>([]);

  useEffect(() => {
    // Filter mangas based on the menu type
    const allMangas = [...FEATURED_MANGAS, ...TRENDING_MANGAS];
    let filtered = [...allMangas];

    switch (menuSlug) {
      case 'top-ngay':
        // Sort by views in the last 24 hours
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'top-tuan':
        // Sort by views in the last 7 days
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'top-thang':
        // Sort by views in the last 30 days
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'yeu-thich':
        // Sort by rating
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered = [];
    }

    setFilteredMangas(filtered);
  }, [menuSlug]);

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

  if (!menuItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-400">Không tìm thấy danh mục</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">{menuItem.name}</h1>
        
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
  );
} 