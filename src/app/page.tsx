import { FeaturedManga } from '@/components/home/featured-manga';
import { LatestUpdates } from '@/components/home/latest-updates';
import { NewReleases } from '@/components/home/new-releases';
import { TrendingSession } from '@/components/home/trending-session';
import { FEATURED_MANGAS, TRENDING_MANGAS } from '@/data/mock-data';

export default function HomePage() {
  // For the purpose of this demo, we'll just use our mock data
  // In a real app, you would fetch this data from an API
  const featuredMangas = [...FEATURED_MANGAS, ...TRENDING_MANGAS].slice(0, 5); // Get 5 mangas for the slider
  const trendingMangas = TRENDING_MANGAS;
  const latestUpdates = [...FEATURED_MANGAS, ...TRENDING_MANGAS].sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
  const newReleases = [...FEATURED_MANGAS.slice(1), ...TRENDING_MANGAS.slice(0, 6)];

  return (
    <div className="vui-container py-6">
      {/* Featured Manga Slider */}
      <FeaturedManga mangas={featuredMangas} />

      {/* Xu hướng section - matching the original site's styling */}
      <TrendingSession mangas={trendingMangas} />

      {/* Latest manga updates */}
      <LatestUpdates mangas={latestUpdates} />

      {/* New releases */}
      <NewReleases newMangas={newReleases} />
    </div>
  );
}
