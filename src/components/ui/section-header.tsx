import Link from 'next/link';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  moreLink?: string;
  moreText?: string;
  children?: ReactNode;
}

export function SectionHeader({
  title,
  moreLink,
  moreText = "Xem thêm",
  children
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
      <h2 className="text-xl font-bold text-white">
        {title}
      </h2>

      <div className="flex items-center gap-2">
        {children}

        {moreLink && (
          <Link
            href={moreLink}
            className="text-sm text-gray-400 hover:text-primary transition-colors"
          >
            {moreText}
          </Link>
        )}
      </div>
    </div>
  );
}
