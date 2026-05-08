import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo } from '@/components/Logo';

describe('Logo', () => {
  it('renders both halves of a two-word site name', () => {
    render(<Logo siteName="Melik News" />);
    expect(screen.getByText('Melik')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
  });

  it('points the home link at the root path', () => {
    render(<Logo siteName="Melik News" />);
    const link = screen.getByRole('link', { name: /melik news home/i });
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders only the first word when the site name is a single token', () => {
    const { container } = render(<Logo siteName="Solo" />);
    expect(screen.getByText('Solo')).toBeInTheDocument();
    expect(container.querySelectorAll('span')).toHaveLength(1);
  });
});
