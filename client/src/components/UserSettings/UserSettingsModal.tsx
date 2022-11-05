import { useEffect, useState } from 'react';
import { useUserStore } from '../../zustand';
import { Backdrop } from '../Backdrop';
import { CircleUserSolidIcon, GearIcon } from '../Icons';

export const UserSettingsModal = ({ close }: { close: () => void }) => {
  const [renderedElement, setRenderedElement] = useState<string>('account');

  return (
    <Backdrop close={close} className='z-[2000] flex-center bg-black/50'>
      <div className='z-[2001] overflow-hidden -translate-y-10 max-w-5xl w-full h-[760px] rounded-md bg-white flex'>
        <div className='w-1/4 pl-3 flex flex-col h-full bg-gray-100/50'>
          <h1 className='text-xl flex items-center font-bold h-14 mb-8'>
            Settings
          </h1>

          <div className='hidden md:flex flex-col gap-2 text-[#404040]'>
            <span
              onClick={() => setRenderedElement('account')}
              className={`${
                renderedElement === 'account' ? 'bg-gray-500/10' : ''
              } text-md flex items-center gap-3 cursor-pointer hover:bg-gray-500/10 py-2 pl-2 rounded-md`}
            >
              <CircleUserSolidIcon className='fill-gray-500 w-5 h-5' />
              Account
            </span>

            <span
              onClick={() => setRenderedElement('general')}
              className={`${
                renderedElement === 'general' ? 'bg-gray-500/10' : ''
              } text-md flex items-center gap-3 cursor-pointer hover:bg-gray-500/10 py-2 pl-2 rounded-md`}
            >
              <GearIcon className='fill-gray-500 w-5 h-5' />
              General
            </span>
          </div>
        </div>

        {renderedElement === 'account' && <AccountSettings />}

        {renderedElement === 'general' && <GeneralSettings />}
      </div>
    </Backdrop>
  );
};

export const AccountSettings = () => {
  const { email, fullName } = useUserStore();
  const [image, setImage] = useState<Blob | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const fullNameSplitted = fullName.split(' ');
  const firstName = fullNameSplitted[0];
  const lastName = fullNameSplitted[fullNameSplitted.length - 1];
  const firstLetterOfFirstName = fullNameSplitted[0][0];
  const firstLetterOfLastName =
    fullNameSplitted[fullNameSplitted.length - 1][0];

  useEffect(() => {
    if (!image) return;

    setImageURL(URL.createObjectURL(image));
  }, [image]);

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files ? e.target.files[0] : null;

    if (!file) return;

    if (file.size >= 1e7) console.log('File size greater than 10mb.');

    setImage(file);
  };

  const deleteImage = () => {
    setImage(null);
    setImageURL(null);
  };

  return (
    <div className='w-full h-full'>
      <div className='text-xl pl-6 flex justify-between items-center font-bold h-14 border-b-[1px] border-b-gray-300'>
        <h2>Account</h2>

        <span className='relative'>
          <span className='w-5 h-[1px] bg-gray-300 rotate-45' />
          <span className='w-5 h-[1px] bg-gray-300 -rotate-45' />
        </span>
      </div>

      <form className='p-6 text-[17px] flex flex-col gap-3 overflow-y-auto'>
        <div className='flex flex-col gap-1 w-full'>
          <span className='font-bold'>Photo</span>

          <div className='flex items-center gap-4'>
            {imageURL ? (
              <div className='flex-center overflow-hidden h-20 w-20'>
                <img
                  src={imageURL}
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
                Upload photo
              </label>
              <span className='text-[13px] font-light text-[#505050]'>
                Pick a photo up to 10MB.
              </span>
              <input
                id='upload-image'
                type='file'
                accept='image/*'
                onChange={(e) => changeImage(e)}
              />
            </span>

            {imageURL && (
              <span className='flex gap-1 flex-col'>
                <button
                  onClick={deleteImage}
                  className='rounded-md border-[1px] border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 px-3 py-2 w-fit cursor-pointer font-bold'
                >
                  Remove photo
                </button>
                <span className='h-[19.5px]' />
              </span>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='text font-bold'>
            Name
          </label>
          <input
            type='text'
            value={fullName}
            onChange={(e) => {}}
            className='px-2 py-1 w-1/2 outline-none rounded-md border-[1px] border-gray-400/20 focus:border-gray-400/40'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='text font-bold'>
            Email
          </label>
          <p className='py-1'>{email}</p>
          <button
            onClick={(e) => e.preventDefault()}
            className='px-3 py-2 w-fit cursor-pointer rounded-md font-bold text-[#505050] hover:text-[#303030] bg-gray-300/40 hover:bg-gray-300/60'
          >
            Change email
          </button>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='text font-bold'>
            Password
          </label>
          <button
            onClick={(e) => e.preventDefault()}
            className='px-3 py-2 w-fit cursor-pointer rounded-md font-bold text-[#505050] hover:text-[#303030] bg-gray-300/40 hover:bg-gray-300/60'
          >
            Change password
          </button>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='text font-bold'>
            Delete account
          </label>
          <p className='text-[13px]'>
            This will immediately delete all of your data including tasks,
            projects, comments, and more. This can’t be undone.
          </p>
          <button
            onClick={(e) => e.preventDefault()}
            className='rounded-md border-[1px] border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 px-3 py-2 w-fit cursor-pointer font-bold'
          >
            Delete account
          </button>
        </div>
      </form>
    </div>
  );
};

export const GeneralSettings = () => {
  // const { email, fullName } = useUserStore();

  return (
    <div className='w-full h-full'>
      <h2 className='text-xl pl-6 flex items-center font-bold h-14 border-b-[1px] border-b-gray-300'>
        General
      </h2>
    </div>
  );
};
