"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Manga } from '@/types/manga';
import { Button } from '@/components/ui/button';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface FeaturedMangaProps {
  mangas: Manga[];
}

export function FeaturedManga({ mangas }: FeaturedMangaProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.min(mangas.length, 5); // Show max 5 topics

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'completed': return 'Hoàn thành';
      case 'ongoing': return 'Đang cập nhật';
      case 'dropped': return 'Tạm dừng';
      default: return 'Sắp ra mắt';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-700';
      case 'ongoing': return 'bg-blue-600';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className="mb-6 relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mangas.slice(0, totalSlides).map((manga) => (
            <div key={manga.id} className="w-full flex-shrink-0">
              <div className="bg-gradient-to-r from-navy-900 to-purple-900/20 rounded-md overflow-hidden h-[320px]">
                <div className="relative flex md:flex-row h-full">
                  {/* Manga Cover - Left Side */}
                  <div className="relative w-[225px] shrink-0 h-full group overflow-hidden">
                    <img
                      src={manga.coverImage}
                      alt={manga.title}
                      className="w-full h-full object-cover object-center transition-all duration-300 group-hover:opacity-50 group-hover:scale-110"
                      style={{ height: '320px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-75" />
                    <div className={`absolute top-0 left-0 px-2 py-1 m-2 rounded text-xs font-medium ${getStatusColor(manga.status)} text-white`}>
                      {getStatusText(manga.status)}
                    </div>
                  </div>

                  {/* Content - Right Side */}
                  <div className="p-6 flex flex-col flex-1 justify-between h-full">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {manga.title}
                      </h2>
                      {manga.author && (
                        <div className="text-sm text-gray-400 mb-3">
                          {manga.author}
                        </div>
                      )}
                      <p className="text-gray-300 mb-4 line-clamp-3 md:line-clamp-4 text-sm md:text-base">
                        {manga.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/truyen-tranh/${manga.slug}`}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        Đọc ngay <FaArrowRight className="h-4 w-4" />
                      </Link>
                      {manga.chapters && manga.chapters.length > 0 && (
                        <Link
                          href={`/chi-tiet/${manga.slug}/${manga.chapters[0].number}`}
                          className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                          Chapter {manga.chapters[manga.chapters.length - 1].number}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-navy-900/80 hover:bg-navy-800 text-white rounded-full"
        onClick={prevSlide}
      >
        <FaChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-navy-900/80 hover:bg-navy-800 text-white rounded-full"
        onClick={nextSlide}
      >
        <FaChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-navy-700'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
