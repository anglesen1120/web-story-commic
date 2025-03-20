'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Manga } from '@/types/manga';

interface TrendingSessionProps {
  mangas: Manga[];
}

export function TrendingSession({ mangas }: TrendingSessionProps) {
  const [activeTab, setActiveTab] = useState<'hot' | 'week' | 'month'>('hot');

  // Filter mangas based on active tab
  const getFilteredMangas = () => {
    switch(activeTab) {
      case 'hot':
        return mangas;
      case 'week':
        return [...mangas].sort((a, b) => b.views - a.views);
      case 'month':
        return [...mangas].sort((a, b) => b.rating - a.rating);
      default:
        return mangas;
    }
  };

  const handleTabClick = (tab: 'hot' | 'week' | 'month') => {
    setActiveTab(tab);
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          Xu hướng
        </h2>

        <Link href="/xu-huong" className="text-sm text-gray-400 hover:text-primary transition-colors">
          Xem thêm
        </Link>
      </div>

      <div className="flex gap-2 mb-6 border-b border-navy-800">
        <button
          onClick={() => handleTabClick('hot')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'hot'
              ? 'bg-primary text-white rounded-t-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Top truyện hot
        </button>
        <button
          onClick={() => handleTabClick('week')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'week'
              ? 'bg-primary text-white rounded-t-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Top tuần
        </button>
        <button
          onClick={() => handleTabClick('month')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'month'
              ? 'bg-primary text-white rounded-t-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Top tháng
        </button>
      </div>

      {/* 6 columns in 1 row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {getFilteredMangas().slice(0, 6).map((manga) => (
          <TrendingCard key={manga.id} manga={manga} />
        ))}
      </div>
    </section>
  );
}

function TrendingCard({ manga }: { manga: Manga }) {
  const { title, slug, coverImage, status, rating } = manga;

  // Status text
  const getStatusText = (status: string) => {
    switch(status) {
      case 'completed': return 'Hoàn thành';
      case 'ongoing': return 'Đang cập nhật';
      case 'dropped': return 'Tạm dừng';
      default: return 'Sắp ra mắt';
    }
  };

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-700';
      case 'ongoing': return 'bg-blue-600';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className="relative">
      <Link href={`/truyen-tranh/${slug}`} className="block group">
        <div className="relative w-full pt-[140%] overflow-hidden"> {/* Aspect ratio */}
          <img
            src={coverImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
          />

          {/* Status badge */}
          <div className="absolute top-0 left-0 px-2 py-1 text-xs font-medium text-white rounded-br-md"
            style={{ backgroundColor: '#3366cc' }}>
            {getStatusText(status)}
          </div>

          {/* Rating badge */}
          <div className="absolute top-0 right-0 px-2 py-1 text-xs font-medium text-white rounded-bl-md"
            style={{ backgroundColor: '#9b4de0' }}>
            {rating.toFixed(1)}
          </div>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

          {/* Title at bottom */}
          <h3 className="absolute bottom-0 left-0 right-0 px-3 py-2 text-sm font-medium text-white truncate text-center">
            {title}
          </h3>
        </div>
      </Link>
    </div>
  );
}
