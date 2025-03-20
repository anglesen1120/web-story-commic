import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FEATURED_MANGAS, TRENDING_MANGAS } from '@/data/mock-data';
import { FaFilter, FaSearch, FaSortAmountDown } from 'react-icons/fa';
import { MangaGrid } from '@/components/manga/manga-grid';

export default function AllMangaPage() {
  // Combine all mangas for display
  const allMangas = [...FEATURED_MANGAS, ...TRENDING_MANGAS];

  // Get unique genres from all mangas
  const genres = Array.from(
    new Set(allMangas.flatMap(manga => manga.genres))
  ).sort();

  return (
    <div className="vui-container py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Tìm truyện</h1>

      {/* Filters */}
      <div className="bg-navy-900/30 rounded-md mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Tìm kiếm truyện..."
                className="w-full bg-navy-800 border border-navy-700 rounded-md py-2 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <select
              className="w-full bg-navy-800 border border-navy-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="">Tình trạng</option>
              <option value="ongoing">Đang cập nhật</option>
              <option value="completed">Hoàn thành</option>
              <option value="dropped">Tạm dừng</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              className="w-full bg-navy-800 border border-navy-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="latest">Mới cập nhật</option>
              <option value="name_asc">Tên A-Z</option>
              <option value="name_desc">Tên Z-A</option>
              <option value="view">Lượt xem</option>
              <option value="rating">Đánh giá</option>
            </select>
          </div>
        </div>

        {/* Genre filters */}
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <FaFilter className="mr-2 text-gray-400" />
            <h3 className="text-white font-medium">Thể loại</h3>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {genres.slice(0, 12).map((genre, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="border-navy-700 text-gray-300 hover:bg-navy-800 hover:text-white"
              >
                {genre}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="border-navy-700 text-primary">
              Xem thêm
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Kết quả ({allMangas.length})</h2>
          <div className="flex items-center text-sm text-gray-400">
            <FaSortAmountDown className="mr-1" />
            <span>Sắp xếp: Mới cập nhật</span>
          </div>
        </div>

        <MangaGrid mangas={allMangas} columns={7} />
      </div>
    </div>
  );
}
