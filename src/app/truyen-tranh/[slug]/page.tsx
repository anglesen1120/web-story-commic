import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FEATURED_MANGAS, TRENDING_MANGAS } from '@/data/mock-data';
import { FaBookOpen, FaClock, FaStar, FaUser } from 'react-icons/fa';

interface PageParams {
  slug: string;
}

export default function MangaDetailPage({
  params
}: {
  params: PageParams
}) {
  const { slug } = params;

  // Find the manga by slug
  const allMangas = [...FEATURED_MANGAS, ...TRENDING_MANGAS];
  const manga = allMangas.find(manga => manga.slug === slug);

  if (!manga) {
    return (
      <div className="vui-container py-10 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Không tìm thấy truyện</h1>
        <p className="text-gray-400 mb-6">Truyện bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Button asChild>
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
    );
  }

  // Get first and latest chapter
  const sortedChapters = [...manga.chapters].sort((a, b) => a.number - b.number);
  const firstChapter = sortedChapters[0];
  const latestChapter = sortedChapters[sortedChapters.length - 1];

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
    <div className="vui-container py-6">
      {/* Manga Info Banner */}
      <div className="bg-navy-900/30 rounded-md overflow-hidden p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cover Image */}
          <div className="w-40 md:w-60 mx-auto md:mx-0 shrink-0">
            <div className="relative">
              <img
                src={manga.coverImage}
                alt={manga.title}
                className="w-full h-auto rounded-md shadow-md"
              />
              <div className={`absolute top-0 right-0 ${getStatusColor(manga.status)} text-white text-xs px-2 py-1 rounded-bl-md`}>
                {getStatusText(manga.status)}
              </div>
            </div>
          </div>

          {/* Manga Info */}
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
              {manga.title}
            </h1>

            {manga.author && (
              <div className="text-gray-400 text-sm mb-4">
                <FaUser className="inline-block mr-1" /> Tác giả: {manga.author}
              </div>
            )}

            <div className="mb-4 flex items-center">
              <div className="bg-primary text-white text-sm px-2 py-1 rounded flex items-center mr-3">
                <FaStar className="mr-1 text-yellow-300" /> {manga.rating.toFixed(1)}
              </div>
              <div className="text-gray-400 text-sm flex items-center">
                <FaClock className="mr-1" /> Cập nhật: {new Date(manga.lastUpdated).toLocaleDateString('vi-VN')}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-300 mb-4">{manga.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                className="border-navy-600 hover:bg-navy-800"
              >
                <Link href={`/chi-tiet/${slug}/${firstChapter.number}`}>
                  <FaBookOpen className="mr-2" /> Đọc từ đầu
                </Link>
              </Button>

              <Button
                asChild
                className="bg-primary hover:bg-purple-600 text-white"
              >
                <Link href={`/chi-tiet/${slug}/${latestChapter.number}`}>
                  <FaBookOpen className="mr-2" /> Đọc mới nhất
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Danh sách chương</h2>
        <div className="bg-navy-900/30 rounded-md overflow-hidden p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {sortedChapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chi-tiet/${slug}/${chapter.number}`}
                className="flex justify-between items-center p-2 hover:bg-navy-800 rounded-md transition-colors"
              >
                <span className="text-gray-300 hover:text-primary">
                  Chapter {chapter.number}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(chapter.releaseDate).toLocaleDateString('vi-VN')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
