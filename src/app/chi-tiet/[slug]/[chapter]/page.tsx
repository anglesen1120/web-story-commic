import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FEATURED_MANGAS, TRENDING_MANGAS } from '@/data/mock-data';
import { FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';

interface PageParams {
  slug: string;
  chapter: string;
}

export default function ChapterDetailPage({
  params
}: {
  params: PageParams
}) {
  const { slug, chapter } = params;

  // Find the manga by slug
  const allMangas = [...FEATURED_MANGAS, ...TRENDING_MANGAS];
  const manga = allMangas.find(manga => manga.slug === slug);

  if (!manga) {
    return (
      <div className="vui-container py-10 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Không tìm thấy truyện</h1>
        <p className="text-gray-400 mb-6">Truyện bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Button asChild>
          <Link href="/">
            <FaHome className="mr-2" /> Về trang chủ
          </Link>
        </Button>
      </div>
    );
  }

  // Find chapter data
  const chapterNumber = parseInt(chapter, 10);
  const currentChapter = manga.chapters.find(ch => ch.number === chapterNumber);

  if (!currentChapter) {
    return (
      <div className="vui-container py-10 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Không tìm thấy chương</h1>
        <p className="text-gray-400 mb-6">Chương bạn đang tìm kiếm không tồn tại.</p>
        <Button asChild>
          <Link href={`/truyen-tranh/${slug}`}>
            <FaArrowLeft className="mr-2" /> Quay lại thông tin truyện
          </Link>
        </Button>
      </div>
    );
  }

  // Get prev/next chapters
  const sortedChapters = [...manga.chapters].sort((a, b) => a.number - b.number);
  const currentIndex = sortedChapters.findIndex(ch => ch.number === chapterNumber);
  const prevChapter = currentIndex > 0 ? sortedChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < sortedChapters.length - 1 ? sortedChapters[currentIndex + 1] : null;

  // Mock chapter images (in a real app, these would come from an API)
  const chapterImages = [
    "https://ext.same-assets.com/3167536680/1016355726.jpeg",
    "https://ext.same-assets.com/3899293950/296035607.jpeg",
    "https://ext.same-assets.com/1092647398/304132172.jpeg",
    "https://ext.same-assets.com/2699410431/3923526963.jpeg",
    "https://ext.same-assets.com/2517301229/4014540019.jpeg",
  ];

  return (
    <div className="vui-container py-4">
      {/* Chapter Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-2 sm:space-y-0">
        <h1 className="text-lg sm:text-xl font-bold text-white">
          {manga.title} - Chapter {chapterNumber}
        </h1>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!prevChapter}
            asChild={!!prevChapter}
          >
            {prevChapter ? (
              <Link href={`/chi-tiet/${slug}/${prevChapter.number}`}>
                <FaArrowLeft className="mr-1" /> Chap trước
              </Link>
            ) : (
              <span><FaArrowLeft className="mr-1" /> Chap trước</span>
            )}
          </Button>

          <Button asChild variant="outline" size="sm">
            <Link href={`/truyen-tranh/${slug}`}>
              <FaHome className="mr-1" /> Thông tin truyện
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={!nextChapter}
            asChild={!!nextChapter}
          >
            {nextChapter ? (
              <Link href={`/chi-tiet/${slug}/${nextChapter.number}`}>
                Chap sau <FaArrowRight className="ml-1" />
              </Link>
            ) : (
              <span>Chap sau <FaArrowRight className="ml-1" /></span>
            )}
          </Button>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="max-w-3xl mx-auto bg-navy-900/30 p-4 rounded-md">
        <div className="space-y-4">
          {chapterImages.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={image}
                alt={`Page ${index + 1}`}
                className="max-w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          variant="outline"
          size="sm"
          disabled={!prevChapter}
          asChild={!!prevChapter}
        >
          {prevChapter ? (
            <Link href={`/chi-tiet/${slug}/${prevChapter.number}`}>
              <FaArrowLeft className="mr-1" /> Chap trước
            </Link>
          ) : (
            <span><FaArrowLeft className="mr-1" /> Chap trước</span>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={!nextChapter}
          asChild={!!nextChapter}
        >
          {nextChapter ? (
            <Link href={`/chi-tiet/${slug}/${nextChapter.number}`}>
              Chap sau <FaArrowRight className="ml-1" />
            </Link>
          ) : (
            <span>Chap sau <FaArrowRight className="ml-1" /></span>
          )}
        </Button>
      </div>
    </div>
  );
}
