import Link from 'next/link';
import { Manga } from '@/types/manga';
import { Card } from '@/components/ui/card';
import { FaClock } from 'react-icons/fa';

interface LatestUpdatesProps {
  mangas: Manga[];
}

export function LatestUpdates({ mangas }: LatestUpdatesProps) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">
            Truyện mới cập nhật
          </h2>

          {/* New Update Tag moved inline with title */}
          <div className="flex items-center px-2 py-1 bg-red-600 text-white text-xs rounded">
            <span className="animate-pulse mr-1">●</span> 3 mới
          </div>
        </div>

        <Link href="/truyen-moi-nhat" className="text-sm text-gray-400 hover:text-primary transition-colors">
          Xem thêm
        </Link>
      </div>

      {/* Grid with 4 columns for full view - removed the background container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mangas.slice(0, 8).map((manga) => (
          <UpdatedMangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </section>
  );
}

interface UpdatedMangaCardProps {
  manga: Manga;
}

function UpdatedMangaCard({ manga }: UpdatedMangaCardProps) {
  const { title, slug, coverImage, chapters, lastUpdated } = manga;

  // Get the most recent chapters (top 2)
  const recentChapters = chapters.slice(0, 2);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    return `${Math.floor(diffDays / 30)} tháng trước`;
  };

  return (
    <Card className="bg-navy-900/50 border border-navy-800 rounded-md overflow-hidden hover:bg-navy-800/50 transition-colors">
      <div className="flex p-2">
        {/* Manga Cover */}
        <Link href={`/truyen-tranh/${slug}`} className="relative w-16 h-20 shrink-0">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover object-center rounded-sm"
          />
        </Link>

        {/* Content */}
        <div className="pl-2 flex-1">
          <Link href={`/truyen-tranh/${slug}`} className="font-medium text-white hover:text-primary transition-colors line-clamp-1 text-sm">
            {title}
          </Link>

          <div className="mt-1">
            {recentChapters.map((chapter) => (
              <div key={chapter.id} className="flex justify-between items-center text-xs py-0.5">
                <Link
                  href={`/chi-tiet/${slug}/${chapter.number}`}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Chapter {chapter.number}
                </Link>

                <div className="flex items-center text-gray-500 text-xs">
                  <FaClock className="mr-1 h-2 w-2" />
                  <span>{formatDate(chapter.releaseDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
