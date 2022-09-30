import { SearchBar } from './SearchBar';
import { useUserStore, useUIStore } from '../zustand';
import { Label } from './Label';
import {
  BarsSolidIcon as SidebarIcon,
  HomeOutlineIcon as HomeIcon,
  PlusSolidIcon as AddTodoIcon,
  CircleUserSolidIcon as UserIcon,
  GearIcon as SettingsIcon,
  LogoutIcon,
} from './Icons';
import { useState } from 'react';
import { DropdownButtons } from './DropdownButtons';

export type INavbarButtonClicked = '' | 'user-icon';

export const Navbar = () => {
  const { isElementRendered, setRenderedElements } = useUIStore();
  const { fullName, email } = useUserStore();
  const [buttonClicked, setButtonClicked] = useState<INavbarButtonClicked>('');

  const fullNameSplitted = fullName.split(' ');
  const firstName = fullNameSplitted[0];
  const lastName = fullNameSplitted[fullNameSplitted.length - 1];
  const firstLetterOfFirstName = fullNameSplitted[0][0];
  const firstLetterOfLastName =
    fullNameSplitted[fullNameSplitted.length - 1][0];

  const onClickNavbarButton = (buttonClicked: INavbarButtonClicked) =>
    setButtonClicked(buttonClicked);

  const onClickMenuButton = () => {
    if (isElementRendered('sidebar')) {
      setRenderedElements('sidebar', false);
    } else {
      setRenderedElements('sidebar', true);
    }
  };

  const onClickAddTodoButton = () => setRenderedElements('add-todo', true);

  return (
    <nav className='navbar'>
      <div className='navbar-buttons-wrapper'>
        {/* sidebar icon */}
        <button onClick={onClickMenuButton} className='navbar-button group'>
          <SidebarIcon className='navbar-icon' />
          <Label
            content={isElementRendered('sidebar') ? 'Close menu' : 'Open menu'}
          />
        </button>

        {/* home icon */}
        <button className='navbar-button group'>
          <HomeIcon className='navbar-icon w-[20px] h-[20px]' />
          <Label content='Go to home' />
        </button>

        {/* search bar */}
        <SearchBar />
      </div>

      {/* add todo icon */}
      <div className='navbar-buttons-wrapper'>
        <button onClick={onClickAddTodoButton} className='navbar-button group'>
          <AddTodoIcon className='navbar-icon' />
          <Label content='Add todo' />
        </button>

        {/* user icon */}
        <button
          className='navbar-button group'
          onClick={() => onClickNavbarButton('user-icon')}
          onBlur={() => onClickNavbarButton('')}
        >
          <UserIcon className='navbar-icon' />
          {buttonClicked !== 'user-icon' && (
            <Label content='Open profile menu' className='-left-1' />
          )}
          {/* dropdow user icon */}
          {buttonClicked === 'user-icon' && (
            <DropdownButtons className='right-0 w-64'>
              <div className='dropdown-buttons-option-container'>
                <div className='dropdown-buttons-user-card-container'>
                  <span className='dropdown-buttons-user-card-photo'>
                    {firstLetterOfFirstName} {firstLetterOfLastName}
                  </span>
                  <div className='dropdown-buttons-user-info'>
                    <span className='text-sm font-bold'>
                      {firstName} {lastName}
                    </span>
                    <span className='text-xs font-light text-gray-900'>
                      {email}
                    </span>
                  </div>
                </div>
                <div className='dropdown-buttons-option'>
                  <SettingsIcon className='fill-gray-600' />
                  <span className='dropdown-buttons-option-text'>Settings</span>
                </div>
              </div>
              <hr className='my-1' />
              <div className='dropdown-buttons-option-container'>
                <div className='dropdown-buttons-option'>
                  <LogoutIcon className='fill-gray-600' />
                  <span className='dropdown-buttons-option-text'>Logout</span>
                </div>
              </div>
            </DropdownButtons>
          )}
        </button>
      </div>
    </nav>
  );
};
