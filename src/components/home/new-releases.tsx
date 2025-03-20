import Link from 'next/link';
import { Manga } from '@/types/manga';
import { Card } from '@/components/ui/card';

interface NewReleasesProps {
  newMangas: Manga[];
}

export function NewReleases({ newMangas }: NewReleasesProps) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          Phiên bản mới
        </h2>

        <Link href="/truyen-moi-nhat" className="text-sm text-gray-400 hover:text-primary transition-colors">
          Xem thêm
        </Link>
      </div>

      {/* 6 columns in single row for full view - matching XuHuong section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {newMangas.slice(0, 6).map((manga) => (
          <NewMangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </section>
  );
}

interface NewMangaCardProps {
  manga: Manga;
}

function NewMangaCard({ manga }: NewMangaCardProps) {
  const { title, slug, coverImage, status, rating } = manga;

  // Status badge text
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
    <Link href={`/truyen-tranh/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-md">
        {/* Cover Image - Fixed dimensions */}
        <div className="relative w-full pt-[140%]"> {/* Using padding-top for aspect ratio */}
          <img
            src={coverImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
          />

          {/* Status and Rating badges */}
          <div className="absolute top-0 left-0 right-0 flex justify-between">
            <div className="absolute top-0 left-0 px-2 py-1 text-xs font-medium text-white rounded-br-md"
              style={{ backgroundColor: '#3366cc' }}>
              {getStatusText(status)}
            </div>

            <div className="absolute top-0 right-0 px-2 py-1 text-xs font-medium text-white rounded-bl-md"
              style={{ backgroundColor: '#9b4de0' }}>
              {rating.toFixed(1)}
            </div>
          </div>

          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90" />

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <h3 className="text-sm font-medium text-white line-clamp-2 text-center">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
