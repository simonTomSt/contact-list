import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PersonInfo } from './PersonInfo';

import type { Contact } from '../../types';

describe('PersonInfo', () => {
  const onClickMock = jest.fn();
  const dataMock: Contact = {
    id: '1',
    firstNameLastName: 'Janush Kovalsky',
    jobTitle: 'blacksmith',
    emailAddress: 'kovalsky@test.com',
  };

  it('should render received data', () => {
    render(
      <PersonInfo data={dataMock} selected={false} onClick={onClickMock} />
    );

    expect(screen.getByText(/janush kovalsky/i)).toBeInTheDocument();
    expect(screen.getByText(/blacksmith/i)).toBeInTheDocument();
    expect(screen.getByText(/kovalsky@test.com/i)).toBeInTheDocument();
  });

  it('should call `onClick` after click', () => {
    render(
      <PersonInfo data={dataMock} selected={false} onClick={onClickMock} />
    );

    userEvent.click(screen.getByText(/janush kovalsky/i));

    expect(onClickMock).toHaveBeenCalled();
  });
});
