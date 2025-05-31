'use client';

import { useState, useCallback } from 'react';
import { useWatchHistory } from '../hooks/WatchHistoryContext';
import { ContentCard } from './ContentCard';
import { ContentModal } from './ContentModal';
import { ContentItem } from '../types/content';
import GridContainer from './GridContainer';

export const WatchHistorySection = () => {
  const { history } = useWatchHistory();
  const [selected, setSelected] = useState<ContentItem | null>(null);

  const handleClick = useCallback((item: ContentItem) => {
    setSelected(item);
  }, []);

  if (history.length === 0) return null;

  return (
    <section className='my-8'>
      <h2 className='text-2xl font-semibold mb-4'>Watch History</h2>
      <GridContainer>
        {history.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            onClick={() => handleClick(item as ContentItem)}
            showProgress
            progress={item.progress ?? 0}
          />
        ))}
      </GridContainer>
      {selected && (
        <ContentModal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
};
