import { SearchBar } from './SearchBar';
import { useUIStore, useUserStore } from '../zustand';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useDimensions } from '../hooks/useDimensions';
import useWindowSize from '../hooks/useWindowSize';
import { AnimatePresence } from 'framer-motion';
import { AddTodoModal } from './AddTodoModal';
import { useToggle } from '../hooks/useToggle';
import { UserSettingsModal } from './UserSettings/UserSettingsModal';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const { fullName, email, photoURL } = useUserStore();
  const [buttonClicked, setButtonClicked] = useState('');
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [labelShowById, setLabelShowById] = useState<string | null>(null);

  const fullNameSplitted = fullName.split(' ');
  const firstName = fullNameSplitted[0];
  const lastName = fullNameSplitted[fullNameSplitted.length - 1];
  const firstLetterOfFirstName = fullNameSplitted[0][0];
  const firstLetterOfLastName =
    fullNameSplitted[fullNameSplitted.length - 1][0];

  const onClickNavbarButton = (buttonClicked: string) =>
    setButtonClicked(buttonClicked);

  const [sidebarIconSizes, sidebarIconRef] = useDimensions();
  const [homeIconSizes, homeIconRef] = useDimensions();
  const [addTodoIconSizes, addTodoIconRef] = useDimensions();
  const [userIconSizes, userIconRef] = useDimensions();

  const { width } = useWindowSize();

  const closeSidebar = () => {
    if (isSidebarOpen && (isMobile || width < 768)) toggleSidebar();
  };
  const goToPage = (path: string) => {
    closeSidebar();
    navigate(path);
  };

  const openAddTodoModal = () => {
    toggleAddTodoModal();
    closeSidebar();
  };

  const isScreenMinorThanMedium = width < 768 || isMobile;

  const [isAddTodoModalOpen, toggleAddTodoModal] = useToggle(false);

  const [isUserSettingsModalOpen, setUserSettingsModal] = useState(false);

  const openUserSettingsModal = () => {
    setUserSettingsModal(true);
    setButtonClicked('');
    setLabelShowById(null);
  };
  const closeUserSettingsModal = () => setUserSettingsModal(false);

  const { t } = useTranslation();

  return (
    <>
      <AnimatePresence>
        {isAddTodoModalOpen && (
          <AddTodoModal closeAddTodoModal={toggleAddTodoModal} />
        )}

        {isUserSettingsModalOpen && (
          <UserSettingsModal close={closeUserSettingsModal} />
        )}
      </AnimatePresence>

      <nav className='z-[50] fixed w-screen h-12 bg-blue-600 flex justify-between items-center px-2 md:px-10'>
        <div className='navbar-buttons-wrapper'>
          {/* sidebar icon */}
          <button
            ref={sidebarIconRef}
            onClick={toggleSidebar}
            onMouseEnter={() => setLabelShowById('sidebar-icon')}
            onMouseLeave={() => setLabelShowById(null)}
            className='group navbar-button group'
          >
            <SidebarIcon className='navbar-icon' />

            {labelShowById === 'sidebar-icon' && (
              <Label
                style={{
                  left:
                    sidebarIconSizes.left +
                    sidebarIconSizes.width / 2 +
                    (isScreenMinorThanMedium ? 24 : 0),
                  top: sidebarIconSizes.top + 48,
                }}
                content={
                  isSidebarOpen
                    ? `${t('Navbar.closeMenu')}`
                    : `${t('Navbar.openMenu')}`
                }
                className=''
              />
            )}
          </button>

          {/* home icon */}
          <button
            ref={homeIconRef}
            onClick={() => goToPage('/inbox')}
            onMouseEnter={() => setLabelShowById('home-icon')}
            onMouseLeave={() => setLabelShowById(null)}
            className='group navbar-button group'
          >
            <HomeIcon className='navbar-icon w-[20px] h-[20px]' />

            {labelShowById === 'home-icon' && (
              <Label
                style={{
                  left: homeIconSizes.left + homeIconSizes.width / 2,
                  top: homeIconSizes.top + 48,
                }}
                content={t('Navbar.goToHome')}
              />
            )}
          </button>

          {/* search bar */}
          <SearchBar />
        </div>

        {/* add todo icon */}
        <div className='navbar-buttons-wrapper'>
          <button
            ref={addTodoIconRef}
            onClick={openAddTodoModal}
            onMouseEnter={() => setLabelShowById('add-todo-icon')}
            onMouseLeave={() => setLabelShowById(null)}
            className='group navbar-button group'
          >
            <AddTodoIcon className='navbar-icon' />

            {labelShowById === 'add-todo-icon' && (
              <Label
                style={{
                  left: addTodoIconSizes.left + addTodoIconSizes.width / 2,
                  top: addTodoIconSizes.top + 48,
                }}
                content={t('Navbar.addTodo')}
                className=''
              />
            )}
          </button>

          {/* user icon */}
          <button
            ref={userIconRef}
            className={`${
              photoURL ? '' : 'p-2'
            } group relative outline-none rounded-md`}
            onClick={() => {
              onClickNavbarButton('user-icon');
              closeSidebar();
            }}
            onMouseEnter={() => setLabelShowById('user-icon')}
            onMouseLeave={() => setLabelShowById(null)}
            onBlur={() => onClickNavbarButton('')}
          >
            {photoURL ? (
              <img
                src={photoURL}
                alt='User'
                className='w-[36px] h-auto clip-circle'
              />
            ) : (
              <UserIcon className='group navbar-icon' />
            )}

            {buttonClicked !== 'user-icon' &&
              labelShowById === 'user-icon' &&
              !isUserSettingsModalOpen && (
                <Label
                  style={{
                    left:
                      userIconSizes.left +
                      userIconSizes.width / 2 +
                      (isScreenMinorThanMedium ? -38 : -10),
                    top: userIconSizes.top + 48,
                  }}
                  content={t('Navbar.openProfileMenu')}
                  className='-left-1'
                />
              )}

            {/* dropdow user icon */}
            {buttonClicked === 'user-icon' && !isUserSettingsModalOpen && (
              <DropdownButtons className='right-0 w-64'>
                {/* <Link to='settings' state={{ background: location }}> */}
                <div
                  onClick={openUserSettingsModal}
                  className='dropdown-buttons-option-container'
                >
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
                    <span className='dropdown-buttons-option-text'>
                      {t('Navbar.settings')}
                    </span>
                  </div>
                </div>

                {/* </Link> */}
                <hr className='my-1' />
                <div className='dropdown-buttons-option-container'>
                  <div className='dropdown-buttons-option'>
                    <LogoutIcon className='fill-gray-600' />
                    <span className='dropdown-buttons-option-text'>
                      {t('Navbar.logout')}
                    </span>
                  </div>
                </div>
              </DropdownButtons>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
