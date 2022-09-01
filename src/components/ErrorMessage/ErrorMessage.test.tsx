import { render, screen } from '@testing-library/react';

import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('should render children', () => {
    render(
      <ErrorMessage>
        <p>children</p>
      </ErrorMessage>
    );

    expect(screen.getByText(/children/i)).toBeInTheDocument();
  });
});
