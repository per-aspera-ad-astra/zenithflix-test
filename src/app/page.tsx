import { TrendingSection } from './components/TrendingSection';
import { WatchHistorySection } from './components/WatchHistorySection';

export default function Home() {
  return (
    <main className='min-h-screen bg-black text-white px-6 py-6 md:py-10'>
      <h1 className='text-2xl font-bold mb-6'>Logo</h1>
      <TrendingSection />
      <WatchHistorySection />
    </main>
  );
}
