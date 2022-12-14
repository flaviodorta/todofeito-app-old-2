import { ClipboardCheckSolidIcon } from './Icons';

export const Login = () => {
  return (
    <div className='h-full w-full grid grid-cols-2'>
      <div className='bg-blue-600 flex justify-center items-center'>
        <div className='flex gap-2 items-center -translate-y-12'>
          <ClipboardCheckSolidIcon className='fill-white h-[96px] w-[96px]' />
          <span className='text-white text-[96px] font-bold'>Todofeito</span>
        </div>
      </div>
      <div className='flex items-center justify-center w-full'>
        <form className='relative -top-32 flex flex-col gap-4 items-center w-4/6'>
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor='email' className='text-xl'>
              Email
            </label>
            <input
              type='email'
              placeholder='Email'
              className='p-2 outline-none placeholder:text-gray-500 border-gray-300 rounded-[3px] border-[1px] w-full'
            />
          </div>

          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor='email' className='text-xl'>
              Password
            </label>
            <input
              type='password'
              placeholder='Password'
              className='p-2 outline-none placeholder:text-gray-500 border-gray-300 rounded-[3px] border-[1px] w-full'
            />
          </div>

          <div className='flex w-full justify-center'>
            <button className='outline-none hover:underline text-blue-600'>
              Forgot password?
            </button>
          </div>

          <button className='bg-blue-600 w-full text-white rounded-[4px] text-[20px] py-2 px-4'>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
