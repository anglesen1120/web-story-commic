"use client";

import { useState } from 'react';
import { MangaFilters } from '@/components/manga/manga-filters';
import { MangaGrid } from '@/components/manga/manga-grid';
import { FEATURED_MANGAS, TRENDING_MANGAS } from '@/data/mock-data';

export default function NewMangaPage() {
  const [filteredMangas, setFilteredMangas] = useState([...FEATURED_MANGAS, ...TRENDING_MANGAS]);
  const allMangas = [...FEATURED_MANGAS, ...TRENDING_MANGAS];

  const handleFilterChange = (filters: any) => {
    let filtered = [...allMangas];

    // Apply genre filters
    if (filters.genres.length > 0) {
      filtered = filtered.filter(manga => 
        filters.genres.some((genre: string) => manga.genres?.includes(genre))
      );
    }

    // Apply status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(manga => 
        filters.status.includes(manga.status)
      );
    }

    // Apply length filter
    if (filters.length) {
      const minChapters = parseInt(filters.length);
      filtered = filtered.filter(manga => 
        manga.chapters.length >= minChapters
      );
    }

    // Apply sorting
    switch (filters.sort) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'views':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'favorites':
        filtered.sort((a, b) => (b.favorites || 0) - (a.favorites || 0));
        break;
      default:
        break;
    }

    setFilteredMangas(filtered);
  };

  return (
    <div className="vui-container py-6">
      {/* Filters */}
      <MangaFilters 
        onFilterChange={handleFilterChange}
        totalMangas={allMangas.length}
      />

      {/* Manga Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Danh sách truyện
          </h2>
          <span className="text-sm text-gray-400">
            {filteredMangas.length} kết quả
          </span>
        </div>

        {filteredMangas.length > 0 ? (
          <MangaGrid 
            mangas={filteredMangas}
            columns={6}
            showRating={true}
            showStatus={true}
          />
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Không tìm thấy truyện nào phù hợp</p>
            <p className="text-sm">Vui lòng thử lại với bộ lọc khác</p>
          </div>
        )}
      </div>
    </div>
  );
} 