import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useFetch } from './useFetch';

describe('useFetch', () => {
  test('should invoke passed callback', async () => {
    const callback = jest.fn(() => Promise.resolve([]));

    renderHook(() => useFetch(callback));

    await waitFor(() => {
      expect(callback).toHaveBeenCalled();
    });
  });

  test('should return status as success', async () => {
    const callback = jest.fn(() => Promise.resolve([]));

    const { result } = renderHook(() => useFetch(callback));

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });
  });

  test('should return status as loading', async () => {
    const callback = jest.fn(() => Promise.resolve([]));

    const { result } = renderHook(() => useFetch(callback));

    expect(result.current.status).toBe('loading');
  });

  test('should return status as error', async () => {
    const callback = jest.fn(() => Promise.reject());

    const { result } = renderHook(() => useFetch(callback));

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });
  });

  test('should update data with response', async () => {
    const contactMock = {
      id: '1',
      jobTitle: 'Fabricator',
      emailAddress: 'Ron_Giles3711@dionrab.com',
      firstNameLastName: 'Ron Giles',
    };
    const callback = jest.fn(() => Promise.resolve([contactMock]));

    const { result } = renderHook(() => useFetch(callback));

    await waitFor(() => {
      expect(result.current.data[0]).toStrictEqual(contactMock);
    });
  });
});
