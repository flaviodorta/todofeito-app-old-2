import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { searchBar } from '../helpers/variants';
import { useToggle } from '../hooks/useToggle';
import { MagnifyingGlassSolidIcon as SearchIcon } from './Icons';
import { fetchCountries } from '../api';
import { useQuery } from '@tanstack/react-query';

export const SearchBar = ({ onClick }: { onClick: () => void }) => {
  const [isSearchBarOpen, toggleSearchBar] = useToggle(false);
  const [searchInput, setSearchInput] = useState<{
    value: string;
    results: unknown[];
  }>({
    value: '',
    results: [],
  });
  const { data: countries } = useQuery(['countries'], fetchCountries);

  const filterDataByText = (data: string[], searchText: string) =>
    data.filter((country) =>
      country.toLowerCase().includes(searchText.toLowerCase())
    );

  const onChangeSearchBarValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput({
      value: e.target.value,
      results: filterDataByText(countries as string[], e.target.value),
    });

  const onBlurSearchBarValue = () =>
    setSearchInput({
      value: '',
      results: [],
    });

  return (
    <div className='relative'>
      <div
        onClick={onClick}
        onFocus={toggleSearchBar}
        onBlur={toggleSearchBar}
        className='relative group flex items-center'
      >
        <SearchIcon
          className={`navbar-search-icon ${
            isSearchBarOpen ? 'fill-gray-600' : ''
          }`}
        />
        <button
          className={`navbar-open-search-icon ${
            isSearchBarOpen ? 'opacity-100' : ''
          }`}
        >
          /
        </button>
        <motion.input
          variants={searchBar}
          initial={false}
          animate={isSearchBarOpen ? 'animate' : 'initial'}
          type='text'
          placeholder='Search'
          value={searchInput.value}
          onChange={onChangeSearchBarValue}
          onBlur={onBlurSearchBarValue}
          className={`navbar-search-bar ${
            isSearchBarOpen ? 'bg-white/100' : ''
          }`}
        />
      </div>

      <AnimatePresence>
        {isSearchBarOpen && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`dropdown-searchbar-container ${
              searchInput.value ? 'border-[1px]' : ''
            }`}
          >
            {searchInput.value && (
              <span className='dropdown-searchbar-title'>Results</span>
            )}
            {searchInput.results.length === 0 && searchInput.value && (
              <span className='dropdown-searchbar-no-results'>No results</span>
            )}
            {searchInput.results.slice(0, 5).map((result) => (
              <li className='dropdown-result'>{result as string}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
