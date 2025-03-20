import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaTrash } from 'react-icons/fa';

interface HistoryItemProps {
  manga: {
    id: string;
    title: string;
    slug: string;
    coverImage: string;
    lastChapterRead: {
      number: number;
      title?: string;
    };
    lastReadAt: Date;
  };
  onDelete: (id: string) => void;
}

export function HistoryItem({ manga, onDelete }: HistoryItemProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes} phút trước`;
    } else if (hours < 24) {
      return `${hours} giờ trước`;
    } else {
      return `${days} ngày trước`;
    }
  };

  return (
    <div className="bg-navy-900 border border-navy-800 rounded-md overflow-hidden hover:bg-navy-800/50 transition-colors group">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Manga Cover */}
          <Link 
            href={`/truyen-tranh/${manga.slug}`}
            className="relative w-[85px] h-[120px] shrink-0"
          >
            <img
              src={manga.coverImage}
              alt={manga.title}
              className="absolute inset-0 w-full h-full object-cover object-center rounded"
            />
          </Link>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Link 
              href={`/truyen-tranh/${manga.slug}`}
              className="block font-medium text-white hover:text-primary transition-colors mb-2 line-clamp-2"
            >
              {manga.title}
            </Link>

            <div className="space-y-1">
              <Link
                href={`/chi-tiet/${manga.slug}/${manga.lastChapterRead.number}`}
                className="block text-sm text-gray-400 hover:text-primary transition-colors"
              >
                Đọc tiếp Chapter {manga.lastChapterRead.number}
              </Link>

              <div className="text-xs text-gray-500">
                {formatDate(manga.lastReadAt)}
              </div>
            </div>
          </div>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-red-400 hover:bg-red-500/10"
            onClick={() => onDelete(manga.id)}
          >
            <FaTrash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 