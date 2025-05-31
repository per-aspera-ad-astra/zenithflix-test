import { useEffect, useState } from 'react';
import { ContentItem } from '../types/content';

export const useTrendingContent = () => {
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/content.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load trending content');
        }
        return res.json();
      })
      .then((json) => {
        setData(json.categories.trending);
        setError(null);
      })
      .catch(() => {
        setData([]);
        setError('Failed to load trending content. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};
