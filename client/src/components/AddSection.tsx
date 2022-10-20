import { nanoid } from 'nanoid';
import { useRef, useState } from 'react';
import { onKeyUpEnter } from '../helpers/functions';
import { useUserStore } from '../zustand';

interface IAddSectionProps {
  // title: string;
  index?: number;
  close: () => void;
}

export const AddSection = ({ close }: IAddSectionProps) => {
  const { createSection } = useUserStore();
  const [inputs, setInputs] = useState({
    title: '',
  });

  const createNewSection = () => {
    createSection({
      id: nanoid(),
      title: inputs.title,
      todos: [],
    });
  };

  const sectionTitleInputRef = useRef<HTMLInputElement>(null);
  const createNewSectionOnKeyEnterInputSectionTitle = onKeyUpEnter(
    createNewSection,
    sectionTitleInputRef
  );

  return (
    <div className='w-full flex flex-col gap-2'>
      <input
        ref={sectionTitleInputRef}
        id='project-name'
        type='text'
        value={inputs.title}
        maxLength={120}
        onChange={(e) => setInputs({ title: e.target.value })}
        onKeyUp={createNewSectionOnKeyEnterInputSectionTitle}
        className='outline-none text-sm h-7 rounded-[3px] py-1 px-2 border-gray-300 focus:border-gray-400 border-[1px] duration-150 transition-all'
      />

      <div className='flex gap-2'>
        <button
          onClick={createNewSection}
          className={`${
            !inputs.title
              ? 'cursor-not-allowed bg-blue-400'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-center w-fit select-none p-2 outline-none rounded-sm font-medium text-sm h-fit text-white hover:text-gray-200`}
        >
          Add section
        </button>

        <div className='flex gap-2'>
          <button
            onClick={close}
            className='text-center select-none p-2 outline-none rounded-sm font-medium text-sm h-fit w-fit bg-gray-200 hover:bg-gray-300 hover:text-700 text-gray-600'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
