'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { ContentItem } from '../types/content';

interface WatchHistoryContextType {
  history: ContentItem[];
  addToHistory: (item: ContentItem) => void;
}

const WatchHistoryContext = createContext<WatchHistoryContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'watchHistory';

export const WatchHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<ContentItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        console.error('Failed to parse watch history');
      }
    }
  }, []);

  const addToHistory = useCallback((item: ContentItem) => {
    setHistory((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      const updated = exists
        ? prev.map((i) => (i.id === item.id ? item : i))
        : [item, ...prev.slice(0, 19)];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <WatchHistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </WatchHistoryContext.Provider>
  );
};

export const useWatchHistory = () => {
  const context = useContext(WatchHistoryContext);
  if (!context) {
    throw new Error('useWatchHistory must be used within WatchHistoryProvider');
  }
  return context;
};
