"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { FaHistory } from "react-icons/fa";
import { HistoryItem } from "@/components/history/history-item";
import { FEATURED_MANGAS } from '@/data/mock-data'; // Using mock data for demonstration

interface ReadHistory {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  lastChapterRead: {
    number: number;
    title?: string;
  };
  lastReadAt: Date;
}

export default function HistoryPage() {
  const [readHistory, setReadHistory] = useState<ReadHistory[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('readHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        // Convert string dates back to Date objects
        const history = parsed.map((item: any) => ({
          ...item,
          lastReadAt: new Date(item.lastReadAt)
        }));
        setReadHistory(history);
      } catch (error) {
        console.error('Error loading history:', error);
        setReadHistory([]);
      }
    } else {
      // For demonstration, populate with some mock data
      const mockHistory = FEATURED_MANGAS.slice(0, 5).map(manga => ({
        id: manga.id,
        title: manga.title,
        slug: manga.slug,
        coverImage: manga.coverImage,
        lastChapterRead: {
          number: manga.chapters[0].number,
        },
        lastReadAt: new Date(manga.lastUpdated)
      }));
      setReadHistory(mockHistory);
      localStorage.setItem('readHistory', JSON.stringify(mockHistory));
    }
  }, []);

  // Delete a single history item
  const handleDelete = (id: string) => {
    const newHistory = readHistory.filter(item => item.id !== id);
    setReadHistory(newHistory);
    localStorage.setItem('readHistory', JSON.stringify(newHistory));
  };

  // Clear all history
  const handleClearAll = () => {
    setReadHistory([]);
    localStorage.removeItem('readHistory');
  };

  return (
    <div className="vui-container py-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">Lịch sử</h1>
          <span className="text-sm text-gray-400">
            {readHistory.length} truyện đã đọc
          </span>
        </div>

        {readHistory.length > 0 && (
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
            onClick={handleClearAll}
          >
            Xóa lịch sử
          </Button>
        )}
      </div>

      {/* Empty State */}
      {readHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <FaHistory className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-lg mb-2">Bạn chưa có lịch sử đọc truyện nào</p>
          <p className="text-sm">
            Các truyện bạn đã đọc sẽ xuất hiện tại đây
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {readHistory.map((manga) => (
            <HistoryItem
              key={manga.id}
              manga={manga}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
} 