import { SearchBar } from './SearchBar';
import { useUIStore } from '../zustand/stores';
import { Label } from './Label';
import {
  BarsSolidIcon as SidebarIcon,
  HomeOutlineIcon as HomeIcon,
  PlusSolidIcon as AddTodoIcon,
  CircleUserSolidIcon as UserIcon,
} from './Icons';

export const Navbar = () => {
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
        <SearchBar />
      </div>

      <div className='navbar-buttons-wrapper'>
        <button className='navbar-button group'>
          <AddTodoIcon className='navbar-icon' />
          <Label content='Add todo' />
        </button>
        <button className='navbar-button group'>
          <UserIcon className='navbar-icon' />
          <Label content='Open profile menu' className='-left-1' />
        </button>
      </div>
    </nav>
  );
};
