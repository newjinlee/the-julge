'use client';

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface SearchContextType {
  searchShopValue: string;
  setSearchShopValue: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchShopValue, setSearchShopValue] = useState<string>('');

  return <SearchContext.Provider value={{ searchShopValue, setSearchShopValue }}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
