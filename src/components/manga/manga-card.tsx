import Link from 'next/link';
import { Manga } from '@/types/manga';
import { FaStar } from 'react-icons/fa';
import { Card } from '@/components/ui/card';

interface MangaCardProps {
  manga: Manga;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
  showStatus?: boolean;
}

export function MangaCard({
  manga,
  size = 'md',
  showRating = true,
  showStatus = true
}: MangaCardProps) {
  const { title, slug, coverImage, status, rating } = manga;

  // Determine classes based on size
  const cardClasses = {
    sm: 'w-32 h-48',
    md: 'w-40 h-56',
    lg: 'w-48 h-64'
  };

  const titleClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

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
    <Link href={`/truyen-tranh/${slug}`} className="group">
      <Card className="bg-transparent border-0 rounded-md overflow-hidden shadow-md transition-transform hover:scale-105">
        <div className="relative">
          <div className={`relative ${cardClasses[size]} overflow-hidden`}>
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
            />

            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90" />

            {/* Status badge */}
            {showStatus && status && (
              <div className={`absolute top-0 left-0 px-2 py-1 rounded-br text-xs font-medium
                ${getStatusColor(status)} text-white`}
              >
                {getStatusText(status)}
              </div>
            )}

            {/* Rating */}
            {showRating && (
              <div className="absolute top-1 right-1 flex items-center gap-0.5 bg-black/60 text-amber-400 px-1 py-0.5 rounded text-xs">
                <FaStar className="h-3 w-3" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-black/70">
            <h3 className={`${titleClasses[size]} font-medium text-white line-clamp-2`}>
              {title}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
