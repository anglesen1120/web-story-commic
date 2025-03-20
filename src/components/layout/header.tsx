"use client";

import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { GENRES, TOPMENU_MANGAS } from '@/data/mock-data';
import { FaSearch, FaCaretDown } from 'react-icons/fa';
import { useState } from 'react';

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950 border-b border-navy-800 shadow-md">
      <div className="vui-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">
              <span className="text-primary">Vui</span>Truyen
            </span>
            <span className="text-xs text-navy-400 bg-navy-800 px-1 rounded">v2</span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-5">
            {/* Genres Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-white hover:text-primary gap-1 py-2">
                Thể loại <FaCaretDown className="h-3 w-3" />
              </button>

              {/* Added a gap div to ensure continuous hover area */}
              <div className="absolute top-full left-0 w-full h-2" />

              <div className="absolute left-0 top-[calc(100%+8px)] w-56 bg-navy-900 border border-navy-700 rounded-md p-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="grid grid-cols-2 gap-1">
                  {GENRES.slice(0, 10).map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/tim-truyen/${genre.slug}`}
                      className="text-gray-300 hover:text-white text-sm py-1 px-2 rounded hover:bg-primary/90 transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}

                  <Link
                    href="/tim-truyen/tat-ca"
                    className="col-span-2 text-center text-primary hover:text-white hover:bg-primary/90 text-sm py-1 mt-1 rounded transition-colors"
                  >
                    Tất cả thể loại
                  </Link>
                </div>
              </div>
            </div>

            {/* History */}
            <Link href="/lich-su" className="text-white hover:text-primary py-2">
              Lịch sử
            </Link>

            {/* Top manga */}
            <div className="relative group">
              <button className="flex items-center text-white hover:text-primary gap-1 py-2">
                Top đề xuất <FaCaretDown className="h-3 w-3" />
              </button>

              {/* Added a gap div to ensure continuous hover area */}
              <div className="absolute top-full left-0 w-full h-2" />

              <div className="absolute left-0 top-[calc(100%+8px)] w-40 bg-navy-900 border border-navy-700 rounded-md p-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                {TOPMENU_MANGAS.map((topmenu) => (
                  <Link 
                    key={topmenu.id}
                    href={`/top/${topmenu.slug}`}
                    className="block text-gray-300 hover:text-white text-sm py-1 px-2 rounded hover:bg-primary/90 transition-colors">
                    {topmenu.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest Manga */}
            <Link href="/truyen-moi-nhat" className="text-white hover:text-primary py-2">
              Truyện mới
            </Link>

            {/* Japanese Manga */}
            <Link href="/truyen-nhat" className="text-white hover:text-primary py-2">
              Truyện Nhật
            </Link>
          </nav>

          {/* Search and Login */}
          <div className="flex items-center space-x-2">
            <div className="relative w-full max-w-[200px] lg:max-w-xs">
              <Input
                type="search"
                placeholder="Nhập tên truyện bạn cần tìm..."
                className="bg-navy-900 border-navy-700 text-sm h-9 pl-8 pr-4 w-full text-white"
              />
              <FaSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-navy-800"
            >
              Lọc
            </Button>
            <Link href="/auth/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-200 hover:text-white hover:bg-primary py-1 px-3 h-auto"
              >
                Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
