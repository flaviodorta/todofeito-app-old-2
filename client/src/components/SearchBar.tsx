import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { searchBar } from '../helpers/variants';
import { useToggle } from '../hooks/useToggle';
import { MagnifyingGlassSolidIcon as SearchIcon } from './Icons';
import { fetchCountries } from '../api';
import { useQuery } from '@tanstack/react-query';
import { useTodosStore } from '../zustand';
import { ITodo } from '../helpers/types';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';

export const SearchBar = ({ onClick }: { onClick: () => void }) => {
  const { todos } = useTodosStore();

  const [isSearchBarOpen, toggleSearchBar] = useToggle(false);
  const [searchInput, setSearchInput] = useState<{
    value: string;
    results: ITodo[];
  }>({
    value: '',
    results: [],
  });
  // const { data: countries } = useQuery(['countries'], fetchCountries);

  const filterByText = (todos: ITodo[], searchText: string) =>
    todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    );

  const onChangeSearchBarValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput({
      value: e.target.value,
      results: filterByText(todos, e.target.value),
    });

  const onBlurSearchBarValue = () =>
    setSearchInput({
      value: '',
      results: [],
    });

  const searchValueAsRegExp = new RegExp('(' + searchInput.value + ')', 'm');

  const bolderize = (str: string, regExp: RegExp) =>
    str.replace(regExp, '<strong>$1</strong>');

  const resultsBold = searchInput.results.map((todo) =>
    bolderize(todo.title, searchValueAsRegExp)
  );

  console.log(resultsBold);

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
            {searchInput.results.slice(0, 5).map((todo, i) => (
              <li className='dropdown-result'>
                <span>icon</span>
                <span
                  dangerouslySetInnerHTML={{ __html: resultsBold[i] }}
                ></span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
