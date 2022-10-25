import { useRef, useState } from 'react';
import { onKeyUpEnter } from '../helpers/functions';
import { ISection } from '../helpers/types';
import { useTodosStore, useUIStore } from '../zustand';

interface IEditSectionProps {
  section: ISection;
}

export const EditSection = ({ section }: IEditSectionProps) => {
  const { editSection } = useTodosStore();
  const { setSectionInputOpenById } = useUIStore();
  const [inputs, setInputs] = useState({
    name: section.name,
  });

  const close = () => setSectionInputOpenById(null);

  const sendEditedSection = () => {
    editSection({
      ...section,
      name: inputs.name,
    });

    close();
  };

  const sectionNameInputRef = useRef<HTMLInputElement>(null);

  const createNewSectionOnKeyEnterInputSectionName = onKeyUpEnter(
    sendEditedSection,
    sectionNameInputRef
  );

  return (
    <div className='w-full flex flex-col gap-2'>
      <input
        ref={sectionNameInputRef}
        id='project-name'
        type='text'
        value={inputs.name}
        placeholder='Name this section'
        maxLength={120}
        onChange={(e) => setInputs({ name: e.target.value })}
        onKeyUp={createNewSectionOnKeyEnterInputSectionName}
        className='placeholder:font-bold placeholder:text-gray-500 outline-none text-sm h-7 rounded-[3px] py-1 px-2 border-gray-300 focus:border-gray-400 border-[1px] duration-150 transition-all'
      />

      <div className='flex gap-2'>
        <button
          onClick={sendEditedSection}
          className={`${
            !inputs.name
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