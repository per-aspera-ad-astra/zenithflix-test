import { memo } from 'react';
import { ContentItem } from '../types/content';

interface Props {
  item: ContentItem;
  onClick: () => void;
  showProgress?: boolean;
  progress?: number;
}

export const ContentCard = memo(
  ({ item, onClick, showProgress = false, progress = 0 }: Props) => (
    <div
      role='button'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      className='flex flex-col gap-2 w-full h-[var(--card-height)] cursor-pointer rounded-xl bg-zinc-900 p-3 hover:bg-zinc-800 transition outline-none focus:ring-2 focus:ring-indigo-500'
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        className='w-full aspect-6/7 object-cover object-top rounded-md'
      />
      <h3 className='text-sm font-semibold line-clamp-2'>{item.title}</h3>
      <p className='mt-auto text-xs text-gray-400'>
        {item.year} • {item.rating}/10
      </p>
      {showProgress && (
        <div className='w-full bg-zinc-700 h-2 rounded'>
          <div
            className='bg-emerald-500 h-full rounded'
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
);
