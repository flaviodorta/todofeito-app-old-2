import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { useToggle } from '../hooks/useToggle';
import {
  BarsSolidIcon as SidebarIcon,
  HomeOutlineIcon as HomeIcon,
  PlusSolidIcon as AddTodoIcon,
  ArrowGrowthIcon as CompletedTodosIcon,
  CircleUserSolidIcon as UserIcon,
  MagnifyingGlassSolidIcon as SearchIcon,
} from './Icons';

export const searchBar: Variants = {
  initial: {
    width: 180,
    transition: {
      duration: 0.1,
    },
  },
  animate: {
    width: 300,
    transition: {
      duration: 0.1,
    },
  },
};

export const Navbar = () => {
  const [isSearchBarOpen, toggleSearchBar] = useToggle(false);
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className='navbar'>
      <div className='navbar-buttons-wrapper'>
        <button className='navbar-button'>
          <SidebarIcon className='navbar-icon' />
        </button>
        <button className='navbar-button'>
          <HomeIcon className='navbar-icon w-[20px] h-[20px]' />
        </button>
        <div
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onBlur={() => setSearchInput('')}
            className={`navbar-search-bar ${
              isSearchBarOpen ? 'bg-white/100' : ''
            }`}
          />
        </div>
      </div>

      <div className='navbar-buttons-wrapper'>
        <button className='navbar-button'>
          <AddTodoIcon className='navbar-icon' />
        </button>
        <button className='navbar-button'>
          <CompletedTodosIcon className='navbar-icon' />
        </button>
        <button className='navbar-button'>
          <UserIcon className='navbar-icon' />
        </button>
      </div>
    </div>
  );
};
