import React from 'react';
import Rating from '.';
import { render, screen } from '@testing-library/react';

describe('Rating Component', () => {
  let container;
  beforeEach(() => {
    container = render(<Rating rate={4} count={120} />).container;
  });

  it('should render rating component', () => {
    if (container) {
      expect(container.firstChild).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    }
  });

  it('should count number of starts', () => {
    const startIcons = screen.queryAllByTestId('rating-svg');
    expect(startIcons.length).toBe(5);
  });

  it('first 4 starts should be dark gray and last light gray', () => {
    const startIcons = screen.queryAllByTestId('rating-svg');
    for (let i = 0; i < startIcons.length - 1; i++) {
      const element = startIcons[i];
      expect(element).toHaveClass('text-gray-800');
    }
    expect(startIcons[4]).toHaveClass('text-gray-200');
  });

  it('display count', () => {
    const link = screen.queryByRole('link');
    expect(link?.innerHTML).toMatch('120 reviews');
  });
});
