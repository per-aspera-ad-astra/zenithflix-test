'use client';

import { useCallback, useEffect, useRef } from 'react';
import { ContentItem } from '../types/content';
import { useWatchHistory } from '../hooks/WatchHistoryContext';

interface Props {
  item: ContentItem;
  onClose: () => void;
}

export const ContentModal = ({ item, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { addToHistory } = useWatchHistory();

  const handleClose = useCallback(() => {
    addToHistory({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      year: item.year,
      rating: item.rating,
      progress: item.progress ?? 65,
      genre: item.genre,
      description: item.description,
      duration: item.duration,
      cast: item.cast,
    });
    onClose();
  }, [addToHistory, item, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      tabIndex={-1}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'
    >
      <div
        ref={modalRef}
        className='bg-zinc-800 px-6 py-8 md:px-8 rounded-xl w-[90%] max-w-lg relative text-white outline-none'
      >
        <button
          onClick={handleClose}
          aria-label='Close modal'
          className='absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer'
        >
          ✕
        </button>
        <img
          src={item.thumbnail}
          alt={item.title}
          className='w-full aspect-3/2 object-cover rounded-md mb-4'
        />
        <h2 id='modal-title' className='text-xl font-bold mb-2'>
          {item.title}
        </h2>
        <p className='text-sm text-gray-400 mb-2'>
          {item.year} • {item.duration} mins • {item.rating}/10
        </p>
        <p className='text-sm'>{item.description}</p>
      </div>
    </div>
  );
};
