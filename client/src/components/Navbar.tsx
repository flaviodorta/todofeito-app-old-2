import { SearchBar } from './SearchBar';
import { useUserStore } from '../zustand';
import { Label } from './Label';
import {
  BarsSolidIcon as SidebarIcon,
  HomeOutlineIcon as HomeIcon,
  PlusSolidIcon as AddTodoIcon,
  CircleUserSolidIcon as UserIcon,
  GearIcon as SettingsIcon,
  LogoutIcon,
} from './Icons';
import { useRef, useState } from 'react';
import { DropdownButtons } from './DropdownButtons';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useDimensions } from '../hooks/useDimensions';
import useWindowSize from '../hooks/useWindowSize';

export type INavbarButtonClicked = '' | 'user-icon';

interface INavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleAddTodoModal: () => void;
}

export const Navbar = (props: INavbarProps) => {
  const { fullName, email } = useUserStore();
  const [buttonClicked, setButtonClicked] = useState<INavbarButtonClicked>('');
  const { isSidebarOpen, toggleSidebar, toggleAddTodoModal } = props;
  const navigate = useNavigate();

  const fullNameSplitted = fullName.split(' ');
  const firstName = fullNameSplitted[0];
  const lastName = fullNameSplitted[fullNameSplitted.length - 1];
  const firstLetterOfFirstName = fullNameSplitted[0][0];
  const firstLetterOfLastName =
    fullNameSplitted[fullNameSplitted.length - 1][0];

  const onClickNavbarButton = (buttonClicked: INavbarButtonClicked) =>
    setButtonClicked(buttonClicked);

  const closeSidebar = () => {
    if (isSidebarOpen) toggleSidebar();
  };

  console.log('is mobile: ', isMobile);

  const [sidebarIconSizes, sidebarIconRef] = useDimensions();
  const [homeIconSizes, homeIconRef] = useDimensions();
  const [addTodoIconSizes, addTodoIconRef] = useDimensions();
  const [userIconSizes, userIconRef] = useDimensions();

  const { width } = useWindowSize();
  const goToPage = (path: string) => {
    if (isMobile || width < 768) closeSidebar();
    navigate(path);
  };

  const openAddTodoModal = () => {
    toggleAddTodoModal();
    closeSidebar();
  };

  return (
    <nav
      className={`
      ${
        isSidebarOpen && isMobile
          ? 'fixed z-[1000]'
          : !isSidebarOpen && isMobile
          ? 'fixed z-0'
          : isSidebarOpen && !isMobile
          ? 'fixed z-[1000] md:static md:z-0'
          : 'z-0'
      }
      w-screen h-12 bg-blue-600 flex justify-between items-center px-2 md:px-10`}
    >
      <div className='navbar-buttons-wrapper'>
        {/* sidebar icon */}
        <button
          ref={sidebarIconRef}
          onClick={toggleSidebar}
          className='group navbar-button group'
        >
          <SidebarIcon className='navbar-icon' />
          <Label
            style={{
              left: sidebarIconSizes.left + sidebarIconSizes.width / 2,
              top: sidebarIconSizes.top + 48,
            }}
            content={isSidebarOpen ? 'Close menu' : 'Open menu'}
            className='hidden sm:group-hover:block '
          />
        </button>

        {/* home icon */}
        <button
          ref={homeIconRef}
          onClick={() => goToPage('/inbox')}
          className='group navbar-button group'
        >
          <HomeIcon className='navbar-icon w-[20px] h-[20px]' />
          <Label
            style={{
              left: homeIconSizes.left + homeIconSizes.width / 2,
              top: homeIconSizes.top + 48,
            }}
            content='Go to home'
            className='hidden sm:group-hover:block '
          />
        </button>

        {/* search bar */}
        <SearchBar onClick={closeSidebar} />
      </div>

      {/* add todo icon */}
      <div className='navbar-buttons-wrapper'>
        <button
          ref={addTodoIconRef}
          onClick={openAddTodoModal}
          className='group navbar-button group'
        >
          <AddTodoIcon className='navbar-icon' />
          <Label
            style={{
              left: addTodoIconSizes.left + addTodoIconSizes.width / 2,
              top: addTodoIconSizes.top + 48,
            }}
            content='Add todo'
            className='hidden sm:group-hover:block'
          />
        </button>

        {/* user icon */}
        <button
          ref={userIconRef}
          className='navbar-button group'
          onClick={() => {
            onClickNavbarButton('user-icon');
            closeSidebar();
          }}
          onBlur={() => onClickNavbarButton('')}
        >
          <UserIcon className='group navbar-icon' />
          {buttonClicked !== 'user-icon' && (
            <Label
              style={{
                left: userIconSizes.left + userIconSizes.width / 2 - 10,
                top: userIconSizes.top + 48,
              }}
              content='Open profile menu'
              className='hidden sm:group-hover:block  -left-1'
            />
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
