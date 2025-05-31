import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentModal } from '../components/ContentModal';
import { ContentItem } from '../types/content';
import { WatchHistoryProvider } from '../hooks/WatchHistoryContext';

const mockItem: ContentItem = {
  id: 1,
  title: 'Inception',
  year: 2010,
  rating: 8.8,
  thumbnail: 'https://example.com/image.jpg',
  description: 'A mind-bending thriller.',
  duration: 148,
  genre: ['Sci-Fi', 'Thriller'],
  cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
  progress: 10,
};

const renderWithProvider = (onClose = jest.fn()) =>
  render(
    <WatchHistoryProvider>
      <ContentModal item={mockItem} onClose={onClose} />
    </WatchHistoryProvider>
  );

describe('ContentModal', () => {
  it('renders content data correctly', () => {
    renderWithProvider();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText(/2010.*8.8/)).toBeInTheDocument();
    expect(screen.getByText('A mind-bending thriller.')).toBeInTheDocument();
    expect(screen.getByAltText('Inception')).toBeInTheDocument();
  });

  it('calls onClose when ✕ button is clicked', async () => {
    const onClose = jest.fn();
    renderWithProvider(onClose);

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking outside the modal', () => {
    const onClose = jest.fn();
    renderWithProvider(onClose);

    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = jest.fn();
    renderWithProvider(onClose);

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
