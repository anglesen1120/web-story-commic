import Link from 'next/link';
import { FaReddit, FaDiscord } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800 py-8 mt-8">
      <div className="vui-container">
        {/* Logo and Social Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <Link href="/" className="flex items-center space-x-2 mb-4 sm:mb-0">
            <span className="text-2xl font-bold text-white">
              <span className="text-primary">Vui</span>Truyen
            </span>
            <span className="text-xs text-navy-400 bg-navy-800 px-1 rounded">v2</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="https://www.reddit.com/" className="text-gray-400 hover:text-white transition-colors">
              <FaReddit className="h-6 w-6" />
            </Link>
            <Link href="https://discord.com/" className="text-gray-400 hover:text-white transition-colors">
              <FaDiscord className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Copyright and Links */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2024 thế giới truyện tranh</p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center mt-4 gap-4">
          <Link href="/lien-he" className="text-gray-400 hover:text-white text-sm transition-colors">
            Liên hệ chúng tôi
          </Link>
          <Link href="/chinh-sach" className="text-gray-400 hover:text-white text-sm transition-colors">
            Chính sách bảo mật
          </Link>
          <Link href="/yeu-cau" className="text-gray-400 hover:text-white text-sm transition-colors">
            Yêu cầu truyện hoặc tính năng mới
          </Link>
        </div>

        {/* Site Links */}
        <div className="flex flex-wrap justify-center mt-8 text-xs gap-2">
          <Link href="/" className="text-gray-600 hover:text-gray-400 px-2 py-1 rounded bg-navy-900 transition-colors">
            Truyện tranh
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-400 px-2 py-1 rounded bg-navy-900 transition-colors">
            Truyen tranh online
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-400 px-2 py-1 rounded bg-navy-900 transition-colors">
            Đọc truyện tranh
          </Link>
          <Link href="/truyen-moi-nhat" className="text-gray-600 hover:text-gray-400 px-2 py-1 rounded bg-navy-900 transition-colors">
            Truyện tranh hot
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-400 px-2 py-1 rounded bg-navy-900 transition-colors">
            Truyện tranh hay
          </Link>
          <Link href="/tim-truyen/ngon-tinh" className="text-gray-600 hover:text-gray-400 px-2 py-1 rounded bg-navy-900 transition-colors">
            Truyện ngôn tình
          </Link>
          <Link href="/tim-truyen/manhwa" className="text-gray-600 hover:text-gray-400 px-2 py-1 rounded bg-navy-900 transition-colors">
            Manhwa
          </Link>
          <Link href="/tim-truyen/manga" className="text-gray-600 hover:text-gray-400 px-2 py-1 rounded bg-navy-900 transition-colors">
            Manga
          </Link>
          <Link href="/tim-truyen/manhua" className="text-gray-600 hover:text-gray-400 px-2 py-1 rounded bg-navy-900 transition-colors">
            Manhua
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-gray-600 text-xs mt-6 px-4">
          Chúng tôi không lưu trữ bất kỳ tập nào trên máy chủ của chúng tôi, chúng tôi chỉ liên kết với phương tiện được lưu trữ trên dịch vụ của bên thứ 3.
          <span className="block mt-1">Dành cho <span className="text-red-500">❤</span> những người yêu thích truyện tranh</span>
        </div>
      </div>
    </footer>
  );
}
