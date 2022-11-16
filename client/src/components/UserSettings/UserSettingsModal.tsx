import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '../../zustand';
import { Backdrop } from '../Backdrop';
import {
  ArrowLeftLongSolidIcon,
  CircleUserSolidIcon,
  GearSolidIcon,
} from '../Icons';
import Select from 'react-select';
import { motion } from 'framer-motion';
import { useEventListener } from '../../hooks/useEventListener';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const UserSettingsModal = ({ close }: { close: () => void }) => {
  const isScreenMinorThanMedium = useRef(
    typeof window !== 'undefined' && document.body.clientWidth < 768
  );

  useEventListener('resize', () => {
    isScreenMinorThanMedium.current =
      typeof window !== 'undefined' && document.body.clientWidth < 768;
  });

  const initialRenderedElement = useRef(
    !isScreenMinorThanMedium.current ? 'account' : ''
  );

  const [renderedElement, setRenderedElement] = useState<string>(
    initialRenderedElement.current
  );

  const [hasInputsChanged, setHasInputsChanged] = useState(false);

  const returnToMenu = () => setRenderedElement('');

  const { t } = useTranslation();

  return (
    <Backdrop close={close} className='z-[2000] flex-center bg-black/50'>
      <div className='z-[2001] min-w-[300px] rounded-t-3xl h-4/5 md:h-full md:rounded-2xl fixed bottom-0 md:top-24 lg:mx-0 overflow-hidden max-w-5xl w-full max-h-[760px] bg-white flex'>
        <motion.div
          initial={false}
          animate={
            isScreenMinorThanMedium.current
              ? !renderedElement
                ? { left: 0 }
                : {
                    left: '-100%',
                  }
              : {
                  left: 0,
                }
          }
          transition={
            isScreenMinorThanMedium.current
              ? !renderedElement
                ? {
                    bounce: 0,
                    duration: 0.325,
                  }
                : {
                    bounce: 0,
                    duration: 0.325,
                  }
              : { duration: 0 }
          }
          className={`${
            isScreenMinorThanMedium.current
              ? !renderedElement
                ? 'z-[2]'
                : 'z-[1]'
              : ''
          } absolute w-full md:static left-0 md:w-1/4 px-5 flex flex-col h-full bg-white`}
        >
          <h1 className='text-xl flex items-center font-bold h-14 mb-8'>
            {t('UserSettingsModal.settings')}
          </h1>

          <div className='flex flex-col gap-2 text-[#404040]'>
            <span
              onClick={() => setRenderedElement('account')}
              className={`${
                renderedElement === 'account' ? 'bg-gray-400/20' : ''
              } text-[17px] flex items-center gap-3 cursor-pointer hover:bg-gray-400/10 py-2 px-3 rounded-md`}
            >
              <CircleUserSolidIcon className='fill-gray-500 w-6 h-6' />
              {t('UserSettingsModal.account')}
            </span>

            <span
              onClick={() => setRenderedElement('general')}
              className={`${
                renderedElement === 'general' ? 'bg-gray-400/20' : ''
              } text-[17px] flex items-center gap-3 cursor-pointer hover:bg-gray-500/10 py-2 px-3 rounded-md`}
            >
              <GearSolidIcon className='fill-gray-500 w-6 h-6' />
              {t('UserSettingsModal.general')}
            </span>
          </div>
        </motion.div>

        <AccountSettings
          isOpen={renderedElement === 'account'}
          hasInputsChanged={hasInputsChanged}
          setHasInputsChanged={setHasInputsChanged}
          close={close}
          returnToMenu={returnToMenu}
          className={`${
            !isScreenMinorThanMedium.current
              ? renderedElement === 'account'
                ? 'block'
                : 'hidden'
              : ''
          }`}
        />

        <GeneralSettings
          isOpen={renderedElement === 'general'}
          hasInputsChanged={hasInputsChanged}
          setHasInputsChanged={setHasInputsChanged}
          close={close}
          returnToMenu={returnToMenu}
          className={`${
            !isScreenMinorThanMedium.current
              ? renderedElement === 'general'
                ? 'block'
                : 'hidden'
              : ''
          }`}
        />
      </div>
    </Backdrop>
  );
};

export const AccountSettings = ({
  hasInputsChanged,
  isOpen,
  className,
  setHasInputsChanged,
  close,
  returnToMenu,
}: {
  hasInputsChanged: boolean;
  isOpen: boolean;
  className: string;
  setHasInputsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
  returnToMenu: () => void;
}) => {
  const { email, fullName, photoURL, setFullName, setPhotoURL } =
    useUserStore();
  const [inputs, setInputs] = useState({
    fullName,
  });

  const fullNameSplitted = fullName.split(' ');
  const firstLetterOfFirstName = fullNameSplitted[0][0];
  const firstLetterOfLastName =
    fullNameSplitted[fullNameSplitted.length - 1][0];

  const changePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files ? e.target.files[0] : null;

    if (!file) return;

    if (file.size >= 1e7) console.warn('File size greater than 10mb.');

    setPhotoURL(URL.createObjectURL(file));
  };

  const cancelChanges = () => {
    setInputs({
      fullName,
    });
  };

  const deletePhoto = () => setPhotoURL(null);

  const updateChanges = () => {
    setFullName(inputs.fullName);
    setHasInputsChanged(false);
  };

  useEffect(() => {
    if (fullName !== inputs.fullName) setHasInputsChanged(true);
    if (fullName === inputs.fullName) setHasInputsChanged(false);
  }, [inputs]);

  const isScreenMinorThanMedium = useRef(
    typeof window !== 'undefined' && document.body.clientWidth < 768
  );

  useEventListener('resize', () => {
    isScreenMinorThanMedium.current =
      typeof window !== 'undefined' && document.body.clientWidth < 768;
  });

  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <motion.div
      initial={false}
      animate={
        isScreenMinorThanMedium.current
          ? isOpen
            ? {
                right: 0,
              }
            : { right: '-100%' }
          : {
              right: 0,
            }
      }
      transition={
        isScreenMinorThanMedium.current
          ? isOpen
            ? {
                bounce: 0,
                duration: 0.325,
              }
            : {
                bounce: 0,
                duration: 0.325,
              }
          : {
              duration: 0,
            }
      }
      className={`
        ${className}
        ${isScreenMinorThanMedium.current ? (isOpen ? 'z-[2]' : 'z-[1]') : ''}
        relative w-full md:static bg-white right-0 h-full flex flex-col justify-between
      `}
    >
      <div className='text-xl pl-6 px-3 py-2 flex gap-2 items-center font-bold h-14 border-b-[1px] border-b-gray-300'>
        {isScreenMinorThanMedium.current && (
          <span
            onClick={returnToMenu}
            className='group flex-center hover:bg-gray-400/20 rounded-md h-8 w-8'
          >
            <ArrowLeftLongSolidIcon className='fill-gray-400' />
          </span>
        )}

        <h2>{t('UserSettingsModal.account')}</h2>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(-1);
            // close();
          }}
          className='group ml-auto flex-center hover:bg-gray-400/20 rounded-md relative h-8 w-8'
        >
          <span className='w-5 h-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 bg-gray-500 group-hover:bg-gray-600 rotate-45' />
          <span className='w-5 h-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 bg-gray-500 group-hover:bg-gray-600 -rotate-45' />
        </button>
      </div>

      <form className='p-6 text-[17px] flex flex-col gap-3 h-full overflow-y-scroll'>
        <div className='flex flex-col gap-1 w-full'>
          <span className='font-bold'>{t('UserSettingsModal.photo')}</span>

          <div className='flex items-center gap-4'>
            {photoURL ? (
              <div className='flex-center overflow-hidden h-20 w-20'>
                <img
                  src={photoURL}
                  alt='User'
                  className='w-20 h-auto clip-circle'
                />
              </div>
            ) : (
              <span className='w-20 h-20 flex items-center justify-center rounded-full border-purple-700 border-4 text-purple-700 text-4xl font-bold tracking-tighter'>
                {firstLetterOfFirstName} {firstLetterOfLastName}
              </span>
            )}

            <span className='flex gap-1 flex-col'>
              <label
                htmlFor='upload-image'
                className='px-3 py-2 w-fit cursor-pointer rounded-md font-bold text-[#505050] hover:text-[#303030] bg-gray-300/40 hover:bg-gray-300/60'
              >
                {t('UserSettingsModal.uploadPhoto')}
              </label>
              <span className='text-[13px] font-light text-[#505050]'>
                {t('UserSettingsModal.pickAPhotoUpTo10MB')}
              </span>
              <input
                id='upload-image'
                type='file'
                accept='image/*'
                onChange={(e) => changePhoto(e)}
              />
            </span>

            {photoURL && (
              <span className='flex gap-1 flex-col'>
                <button
                  onClick={deletePhoto}
                  className='rounded-md border-[1px] border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 px-3 py-2 w-fit cursor-pointer font-bold'
                >
                  {t('UserSettingsModal.removePhoto')}
                </button>
                <span className='h-[19.5px]' />
              </span>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='text font-bold'>
            {t('UserSettingsModal.name')}
          </label>

          <input
            type='text'
            value={inputs.fullName}
            onChange={(e) => setInputs({ fullName: e.target.value })}
            className='px-2 py-1 w-1/2 outline-none rounded-md border-[1px] border-gray-400/20 focus:border-gray-400/40'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='text font-bold'>
            {t('UserSettingsModal.email')}
          </label>

          <p className='py-1'>{email}</p>

          <button
            onClick={(e) => e.preventDefault()}
            className='px-3 py-2 w-fit cursor-pointer rounded-md font-bold text-[#505050] hover:text-[#303030] bg-gray-300/40 hover:bg-gray-300/60'
          >
            {t('UserSettingsModal.changeEmail')}
          </button>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='text font-bold'>
            {t('UserSettingsModal.password')}
          </label>

          <button
            onClick={(e) => e.preventDefault()}
            className='px-3 py-2 w-fit cursor-pointer rounded-md font-bold text-[#505050] hover:text-[#303030] bg-gray-300/40 hover:bg-gray-300/60'
          >
            {t('UserSettingsModal.changePassword')}
          </button>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='text font-bold'>
            {t('UserSettingsModal.deleteAccount')}
          </label>

          <p className='text-[13px]'>
            {t('UserSettingsModal.deleteAccountWarning')}
          </p>

          <button
            onClick={(e) => e.preventDefault()}
            className='rounded-md border-[1px] border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 px-3 py-2 w-fit cursor-pointer font-bold'
          >
            {t('UserSettingsModal.deleteAccount')}
          </button>
        </div>
      </form>

      {hasInputsChanged && (
        <div className='w-full h-fit relative flex items-center gap-4 py-4 pr-4 justify-end bg-white border-t-[1px] border-t-gray-300'>
          <button
            onClick={cancelChanges}
            className='text-center select-none py-2 px-3 outline-none rounded-sm font-medium text-sm h-fit w-fit bg-gray-200 hover:bg-gray-300 hover:text-700 text-gray-600'
          >
            {t('UserSettingsModal.cancel')}
          </button>

          <button
            onClick={updateChanges}
            className='bg-blue-600 hover:bg-blue-700 text-center select-none py-2 px-3 outline-none rounded-sm font-medium text-sm h-fit w-fit text-white hover:text-gray-200'
          >
            {t('UserSettingsModal.update')}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export const GeneralSettings = ({
  hasInputsChanged,
  isOpen,
  className,
  setHasInputsChanged,
  close,
  returnToMenu,
}: {
  isOpen: boolean;
  hasInputsChanged: boolean;
  className: string;
  setHasInputsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
  returnToMenu: () => void;
}) => {
  const { language, homeView, setLanguage, setHomeView } = useUserStore();

  const [inputs, setInputs] = useState({
    language,
    homeView,
  });

  const updateChanges = () => {
    setLanguage(inputs.language);
    setHomeView(inputs.homeView);
    setHasInputsChanged(false);
  };

  const cancelChanges = () => {
    setInputs({
      language,
      homeView,
    });
  };

  useEffect(() => {
    if (language !== inputs.language || homeView !== inputs.homeView)
      setHasInputsChanged(true);
    if (language === inputs.language && homeView === inputs.homeView)
      setHasInputsChanged(false);
  }, [inputs]);

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Portguês' },
  ];

  const homeViews = [
    { value: 'inbox', label: 'Inbox' },
    { value: 'today', label: 'Today' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'labels', label: 'Labels' },
  ];

  const isScreenMinorThanMedium = useRef(
    typeof window !== 'undefined' && document.body.clientWidth < 768
  );

  useEventListener('resize', () => {
    isScreenMinorThanMedium.current =
      typeof window !== 'undefined' && document.body.clientWidth < 768;
  });

  const { t } = useTranslation();

  return (
    <motion.div
      initial={false}
      animate={
        isScreenMinorThanMedium.current
          ? isOpen
            ? {
                right: 0,
              }
            : { right: '-100%' }
          : {
              right: 0,
            }
      }
      transition={
        isScreenMinorThanMedium.current
          ? isOpen
            ? {
                bounce: 0,
                duration: 0.325,
              }
            : {
                bounce: 0,
                duration: 0.325,
              }
          : {
              duration: 0,
            }
      }
      className={`
        ${className} 
        ${isScreenMinorThanMedium.current ? (isOpen ? 'z-[2]' : 'z-[1]') : ''}
        absolute w-full md:static bg-white right-0 flex flex-col justify-between h-full
      `}
    >
      <div>
        <div className='text-xl pl-6 px-3 py-2 flex gap-2 items-center font-bold h-14 border-b-[1px] border-b-gray-300'>
          {isScreenMinorThanMedium.current && (
            <span
              onClick={returnToMenu}
              className='group flex-center hover:bg-gray-400/20 rounded-md h-8 w-8'
            >
              <ArrowLeftLongSolidIcon className='fill-gray-400' />
            </span>
          )}
          <h2>{t('UserSettingsModal.general')}</h2>

          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className='group ml-auto flex-center hover:bg-gray-400/20 rounded-md relative h-8 w-8'
          >
            <span className='w-5 h-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 bg-gray-500 group-hover:bg-gray-600 rotate-45' />
            <span className='w-5 h-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 bg-gray-500 group-hover:bg-gray-600 -rotate-45' />
          </button>
        </div>

        <form className='h-[80%] p-6 text-[17px] flex flex-col gap-3 overflow-y-auto'>
          <div className='flex flex-col gap-1 w-full md:w-1/2'>
            <label htmlFor='name' className='text font-bold'>
              {t('UserSettingsModal.language')}
            </label>

            <Select
              value={languages.find((e) => e.value === language)}
              options={languages}
              onChange={(e) =>
                e
                  ? setInputs((state) => ({ ...state, language: e.value }))
                  : undefined
              }
            />
          </div>

          <div className='flex flex-col gap-1 w-full md:w-1/2'>
            <label htmlFor='name' className='text font-bold'>
              {t('UserSettingsModal.homeView')}
            </label>

            <Select
              value={homeViews.find((e) => e.value === homeView)}
              options={homeViews}
              onChange={(e) =>
                e
                  ? setInputs((state) => ({ ...state, homeView: e.value }))
                  : undefined
              }
            />
          </div>
        </form>
      </div>

      {hasInputsChanged && (
        <div className='w-full relative flex items-center gap-4 py-4 pr-4 justify-end bg-white border-t-[1px] border-t-gray-300'>
          <button
            onClick={cancelChanges}
            className='text-center select-none py-2 px-3 outline-none rounded-sm font-medium text-sm h-fit w-fit bg-gray-200 hover:bg-gray-300 hover:text-700 text-gray-600'
          >
            {t('UserSettingsModal.cancel')}
          </button>

          <button
            onClick={updateChanges}
            className='bg-blue-600 hover:bg-blue-700 text-center select-none py-2 px-3 outline-none rounded-sm font-medium text-sm h-fit w-fit text-white hover:text-gray-200'
          >
            {t('UserSettingsModal.update')}
          </button>
        </div>
      )}

      {/* {hasInputsChanged && (
        <div className='flex items-center gap-4 py-4 pr-4 justify-end border-t-[1px] border-t-gray-300'>
          <button
            onClick={cancelChanges}
            className='text-center select-none py-2 px-3 outline-none rounded-sm font-medium text-sm h-fit w-fit bg-gray-200 hover:bg-gray-300 hover:text-700 text-gray-600'
          >
            Cancel
          </button>

          <button
            onClick={updateChanges}
            className='bg-blue-600 hover:bg-blue-700 text-center select-none py-2 px-3 outline-none rounded-sm font-medium text-sm h-fit w-fit text-white hover:text-gray-200'
          >
            Update
          </button>
        </div>
      )} */}
    </motion.div>
  );
};
