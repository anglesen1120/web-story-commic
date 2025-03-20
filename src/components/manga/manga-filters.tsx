"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GENRES } from '@/data/mock-data';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MangaFiltersProps {
  onFilterChange: (filters: any) => void;
  totalMangas: number;
}

export function MangaFilters({ onFilterChange, totalMangas }: MangaFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [sort, setSort] = useState<string>("latest");
  const [hasInteracted, setHasInteracted] = useState(false);

  const statusOptions = [
    { value: "completed", label: "Hoàn thành" },
    { value: "ongoing", label: "Đang cập nhập" },
    { value: "dropped", label: "Tạm dừng" },
    { value: "upcoming", label: "Sắp ra mắt" },
    { value: "canceled", label: "Hủy phát hành" },
  ];

  const lengthOptions = [
    { value: "1", label: ">= 1 chapters" },
    { value: "3", label: ">= 3 chapters" },
    { value: "5", label: ">= 5 chapters" },
    { value: "10", label: ">= 10 chapters" },
    { value: "20", label: ">= 20 chapters" },
    { value: "30", label: ">= 30 chapters" },
    { value: "50", label: ">= 50 chapters" },
  ];

  const sortOptions = [
    { value: "latest", label: "Mới cập nhật" },
    { value: "newest", label: "Mới thêm" },
    { value: "release_date", label: "Ngày phát hành" },
    { value: "trending", label: "Xu hướng" },
    { value: "name", label: "Tên A-Z" },
    { value: "views", label: "Xem nhiều" },
    { value: "favorites", label: "Yêu thích nhất" },
  ];

  // Debounced filter change handler
  const debouncedFilterChange = useCallback(
    (filters: any) => {
      if (!hasInteracted) return;
      
      const timeoutId = setTimeout(() => {
        onFilterChange(filters);
      }, 300); // 300ms delay

      return () => clearTimeout(timeoutId);
    },
    [onFilterChange, hasInteracted]
  );

  // Apply filters whenever any filter value changes
  useEffect(() => {
    const cleanup = debouncedFilterChange({
      search: searchQuery,
      genres: selectedGenres,
      status: status ? [status] : [],
      length,
      sort
    });

    return cleanup;
  }, [selectedGenres, status, length, sort, debouncedFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setHasInteracted(true);
  };

  const handleSearch = () => {
    setHasInteracted(true);
    onFilterChange({
      search: searchQuery,
      genres: selectedGenres,
      status: status ? [status] : [],
      length,
      sort
    });
  };

  const handleClear = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setStatus("");
    setLength("");
    setSort("latest");
    setHasInteracted(false);
    onFilterChange({
      search: "",
      genres: [],
      status: [],
      length: "",
      sort: "latest"
    });
  };

  const handleGenreChange = (value: string) => {
    setHasInteracted(true);
    setSelectedGenres(prev => 
      prev.includes(value) 
        ? prev.filter(g => g !== value)
        : [...prev, value]
    );
  };

  const handleStatusChange = (value: string) => {
    setHasInteracted(true);
    setStatus(value);
  };

  const handleLengthChange = (value: string) => {
    setHasInteracted(true);
    setLength(value);
  };

  const handleSortChange = (value: string) => {
    setHasInteracted(true);
    setSort(value);
  };

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-navy-900 border border-navy-800 rounded-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-white">Kho truyện</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFilters}
            className="h-8 w-8 text-gray-400 hover:text-white"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <span className="text-sm text-gray-400">{totalMangas.toLocaleString()} cuốn truyện</span>
      </div>

      {isExpanded && (
        <>
          {/* Search Input */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-2">Tìm kiếm</h3>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Nhập tên truyện..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-navy-800 border-navy-700 text-white placeholder:text-gray-400 focus:border-primary"
              />
              <Button 
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
              <Button 
                onClick={handleClear}
                variant="outline"
                className="border-navy-700 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Genre Selection */}
            <div className="space-y-2">
              <h3 className="text-white font-medium">Chọn thể loại</h3>
              <Select onValueChange={handleGenreChange}>
                <SelectTrigger className="w-full bg-navy-800 border-navy-700">
                  <SelectValue placeholder="Chọn thể loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Thể loại</SelectLabel>
                    {GENRES.map((genre) => (
                      <SelectItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
              <h3 className="text-white font-medium">Trạng thái</h3>
              <Select onValueChange={handleStatusChange} value={status}>
                <SelectTrigger className="w-full bg-navy-800 border-navy-700">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Trạng thái</SelectLabel>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Length Selection */}
            <div className="space-y-2">
              <h3 className="text-white font-medium">Độ dài</h3>
              <Select onValueChange={handleLengthChange} value={length}>
                <SelectTrigger className="w-full bg-navy-800 border-navy-700">
                  <SelectValue placeholder="Chọn độ dài" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Số chương</SelectLabel>
                    {lengthOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Selection */}
            <div className="space-y-2">
              <h3 className="text-white font-medium">Sắp xếp</h3>
              <Select onValueChange={handleSortChange} value={sort}>
                <SelectTrigger className="w-full bg-navy-800 border-navy-700">
                  <SelectValue placeholder="Chọn sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sắp xếp theo</SelectLabel>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 