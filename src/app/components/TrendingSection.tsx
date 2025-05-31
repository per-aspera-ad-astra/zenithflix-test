'use client';

import { useCallback, useState } from 'react';
import { useTrendingContent } from '../hooks/useTrendingContent';
import { ContentCard } from './ContentCard';
import { SkeletonCard } from './SkeletonCard';
import { ContentModal } from './ContentModal';
import GridContainer from './GridContainer';
import { ErrorAlert } from './ErrorAlert';
import { ContentItem } from '../types/content';

export const TrendingSection = () => {
  const { data, loading, error } = useTrendingContent();
  const [selected, setSelected] = useState<ContentItem | null>(null);

  const handleClick = useCallback((item: ContentItem) => {
    setSelected(item);
  }, []);

  return (
    <section className='my-8'>
      <h2 className='text-2xl font-semibold mb-4'>Trending Now</h2>
      {error && <ErrorAlert message={error} />}
      <GridContainer>
        {loading
          ? Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)
          : data.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                onClick={() => handleClick(item)}
              />
            ))}
      </GridContainer>
      {selected && (
        <ContentModal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
};
