import { motion } from 'framer-motion';
import { useState } from 'react';
import { searchBar } from '../helpers/variants';
import { useToggle } from '../hooks/useToggle';
import { useUIStore } from '../zustand/stores';
import {
  BarsSolidIcon as SidebarIcon,
  HomeOutlineIcon as HomeIcon,
  PlusSolidIcon as AddTodoIcon,
  ArrowGrowthIcon as CompletedTodosIcon,
  CircleUserSolidIcon as UserIcon,
  MagnifyingGlassSolidIcon as SearchIcon,
} from './Icons';

const Label = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return (
    <div
      className={`${className} group-hover:opacity-100 whitespace-nowrap bg-gray-900 text-xs text-white rounded-md px-3 py-2 opacity-0 absolute left-1/2 -bottom-12 -translate-x-1/2`}
    >
      {content}
    </div>
  );
};

export const Navbar = () => {
  const [isSearchBarOpen, toggleSearchBar] = useToggle(false);
  const [searchInput, setSearchInput] = useState('');
  const { isMenuOpen, toggleMenu } = useUIStore((state) => state);

  return (
    <nav className='navbar'>
      <div className='navbar-buttons-wrapper'>
        <button onClick={toggleMenu} className='navbar-button group'>
          <SidebarIcon className='navbar-icon' />
          <Label content={isMenuOpen ? 'Close menu' : 'Open menu'} />
        </button>
        <button className='navbar-button group'>
          <HomeIcon className='navbar-icon w-[20px] h-[20px]' />
          <Label content='Go to home' />
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
        <button className='navbar-button group'>
          <AddTodoIcon className='navbar-icon' />
          <Label content='Add todo' />
        </button>
        <button className='navbar-button group'>
          <CompletedTodosIcon className='navbar-icon' />
          <Label content='Open productivity' />
        </button>
        <button className='navbar-button group'>
          <UserIcon className='navbar-icon' />
          <Label content='Open profile menu' className='-left-1' />
        </button>
      </div>
    </nav>
  );
};
