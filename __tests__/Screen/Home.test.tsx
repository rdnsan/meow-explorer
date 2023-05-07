import { act, renderHook } from '@testing-library/react-native';
import { useCallback } from 'react';
import 'react-native';

describe('handleSearch', () => {
  it('filters breeds correctly', () => {
    const breeds = [
      { name: 'Labrador Retriever' },
      { name: 'Golden Retriever' },
      { name: 'Poodle' },
    ];

    const setSearchText = jest.fn();
    const setSearchResults = jest.fn();

    const { result } = renderHook(() =>
      useCallback((text: string) => {
        setSearchText(text);
        const filtered = breeds.filter((breed) =>
          breed.name.toLowerCase().includes(text.toLowerCase())
        );
        setSearchResults(filtered);
      }, [])
    );

    act(() => {
      result.current('Retriever');
    });

    expect(setSearchText).toHaveBeenCalledWith('Retriever');
    expect(setSearchResults).toHaveBeenCalledWith([
      { name: 'Labrador Retriever' },
      { name: 'Golden Retriever' },
    ]);
  });
});
