import { AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle';
import { useTodosStore } from '../../zustand';
import { CreateLabelModal } from '../CreateLabelModal';
import { ChevronIcon, LabelIcon, PlusSolidIcon } from '../Icons';
import { LinkToLabelPage } from '../LinkToLabelPage';
import { ContentContainer } from './ContentContainer';

export const FiltersAndLabelsContent = () => {
  const { labels } = useTodosStore();

  const [isLabelsLinksListOpen, toggleLabelsLinksListOpen] = useToggle(false);
  const [isCreateLabelModalOpen, toggleIsCreateLabelModalOpen] =
    useToggle(false);
  const [isOutletShow, toggleIsOutletShow] = useToggle(true);

  const Heading = () => (
    <div className='flex items-center gap-2'>
      <h2 className='font-bold text-xl'>Filters & Labels</h2>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isCreateLabelModalOpen && (
          <CreateLabelModal closeModal={toggleIsCreateLabelModalOpen} />
        )}
      </AnimatePresence>

      {isOutletShow ? (
        <ContentContainer heading={<Heading />}>
          <div className='w-full px-9 md:px-0'>
            <div className='flex flex-col h-fit w-full'>
              <div className='sticky top-[76px] z-[2]'>
                <div className='relative flex justify-between items-center w-full text-sm  bg-white font-bold h-fit py-1 border-b-[1px] border-gray-300'>
                  <span className='text-gray-500'>Labels</span>

                  <span
                    onClick={toggleLabelsLinksListOpen}
                    className='group absolute -left-7 top-[1.5px] cursor-pointer w-6 h-6 rounded-sm z-[2] bg-white hover:bg-gray-200 flex items-center justify-center'
                  >
                    <ChevronIcon
                      className={`${
                        isLabelsLinksListOpen ? '' : '-rotate-90'
                      } w-[20px] h-[20px] stroke-gray-500 group-hover:stroke-gray-600 duration-150 transition-all`}
                    />
                  </span>

                  <span
                    onClick={toggleIsCreateLabelModalOpen}
                    className='group z-[1000] absolute right-0 top-0 flex-center w-6 h-6 cursor-pointer rounded-sm hover:bg-gray-200'
                  >
                    <PlusSolidIcon className='hover:bg-gray-200 hover:fill-gray-600 duration-100 transition-all fill-gray-400' />
                  </span>
                </div>
              </div>

              {isLabelsLinksListOpen && (
                <div className='flex flex-col '>
                  {labels.map((label) => (
                    // <Fragment>
                    <LinkToLabelPage
                      key={label.id}
                      showLabelPage={toggleIsOutletShow}
                      icon={<LabelIcon className={`${label.color.class}`} />}
                      label={label}
                    />
                    // </Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ContentContainer>
      ) : (
        <Outlet />
      )}
    </>
  );
};
