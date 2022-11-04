import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { searchBar } from '../helpers/variants';
import { useToggle } from '../hooks/useToggle';
import {
  CircleIcon,
  ClockRegularIcon,
  InboxSolidIcon,
  LabelIcon,
  MagnifyingGlassSolidIcon as SearchIcon,
  SectionSolidIcon,
  SquareCheckRegularIcon,
} from './Icons';
import { useQuery } from '@tanstack/react-query';
import { useTodosStore, useUIStore } from '../zustand';
import { ILabel, IProject, ISection, ITodo } from '../helpers/types';
import { useNavigate } from 'react-router-dom';
import { getDatasByIds, onKeyUpEnter } from '../helpers/functions';

interface ISearchInput {
  value: string;
  results: {
    projectsIds: string[];
    sectionsIds: string[];
    labelsIds: string[];
    todosIds: string[];
  };
  // recentSearches: string[];
  // recentylViewed: (IProject | ISection | ILabel | ITodo)[];
}

export const SearchBar = ({ onClick }: { onClick: () => void }) => {
  const { projects, sections, labels, todos } = useTodosStore();
  const { searchedInputs, setSearchedInputs } = useUIStore();

  const navigate = useNavigate();

  const defaultInputValues = {
    value: '',
    results: {
      projectsIds: [],
      sectionsIds: [],
      labelsIds: [],
      todosIds: [],
    },
  };

  const [isSearchBarOpen, toggleSearchBar] = useToggle(false);
  const [inputs, setInputs] = useState<ISearchInput>(defaultInputValues);

  function filterDataByText<T extends ITodo | IProject | ILabel | ISection>(
    datas: T[],
    searchText: string
  ) {
    return datas.filter((data) =>
      data.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  const onChangeSearchBarValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputs((state) => ({
      ...state,
      value: value,
      results: {
        projectsIds: filterDataByText(projects, value).map((data) => data.id),
        sectionsIds: filterDataByText(sections, value).map((data) => data.id),
        labelsIds: filterDataByText(labels, value).map((data) => data.id),
        todosIds: filterDataByText(todos, value).map((data) => data.id),
      },
    }));
  };

  const onBlurSearchBarValue = () =>
    setInputs((state) => ({
      ...state,
      value: '',
      results: {
        projectsIds: [],
        sectionsIds: [],
        labelsIds: [],
        todosIds: [],
      },
    }));

  const searchedProjects = getDatasByIds(projects, inputs.results.projectsIds);
  const searchedSections = getDatasByIds(sections, inputs.results.sectionsIds);
  const searchedLabels = getDatasByIds(labels, inputs.results.labelsIds);
  const searchedTodos = getDatasByIds(todos, inputs.results.todosIds);
  const recentlyViewed = [...projects, ...sections, ...labels, ...todos].filter(
    (data) => searchedInputs.recentlyViewedIds.some((id) => id === data.id)
  );

  const searchValueAsRegExp = new RegExp('(' + inputs.value + ')', 'm');

  const bolderize = (str: string, regExp: RegExp) =>
    str.replace(regExp, '<strong>$1</strong>');

  const resultsBoldProjects = searchedProjects.map((project) =>
    bolderize(project.title, searchValueAsRegExp)
  );
  const resultsBoldSections = searchedSections.map((project) =>
    bolderize(project.title, searchValueAsRegExp)
  );
  const resultsBoldLabels = searchedLabels.map((project) =>
    bolderize(project.title, searchValueAsRegExp)
  );
  const resultsBoldTodos = searchedTodos.map((project) =>
    bolderize(project.title, searchValueAsRegExp)
  );

  const searchBarRef = useRef<HTMLInputElement>(null!);

  const searchOnPressEnter = onKeyUpEnter(() => {
    setInputs(defaultInputValues);

    setSearchedInputs({
      results: inputs.results,
      recentSearches: [inputs.value, ...searchedInputs.recentSearches],
      recentlyViewedIds: [...searchedInputs.recentlyViewedIds],
    });

    navigate(`/search/${inputs.value}`);
  }, searchBarRef);

  const onClickSearchItem = (
    path: string,
    data: IProject | ISection | ILabel | ITodo
  ) => {
    setSearchedInputs({
      results: inputs.results,
      recentSearches: [inputs.value, ...searchedInputs.recentSearches],
      recentlyViewedIds: [data.id, ...searchedInputs.recentlyViewedIds],
    });

    navigate(path);
  };

  const getRecentlyViewedIcon = (
    data: IProject | ISection | ILabel | ITodo
  ) => {
    if (data.type === 'project')
      return data.id !== 'inbox' ? (
        <CircleIcon className={`${(data as IProject).color.class} w-4 h-4`} />
      ) : (
        <InboxSolidIcon
          className={`${(data as IProject).color.class} w-4 h-4`}
        />
      );

    if (data.type === 'section')
      return <SectionSolidIcon className='fill-[#202020] w-4 h-4' />;

    if (data.type === 'label')
      return <LabelIcon className='fill-[#202020] w-4 h-4' />;

    if (data.type === 'todo')
      return <SquareCheckRegularIcon className='fill-[#202020] w-4 h-4' />;
  };

  return (
    <div className='relative'>
      <div
        onClick={onClick}
        onFocus={toggleSearchBar}
        onBlur={toggleSearchBar}
        className='relative group flex items-center'
      >
        <SearchIcon
          className={`navbar-search-icon ${
            isSearchBarOpen ? 'fill-gray-600' : ''
          }`}
        />
        <button
          className={`navbar-open-search-icon ${
            isSearchBarOpen ? 'opacity-100' : ''
          }`}
        >
          /
        </button>
        <motion.input
          ref={searchBarRef}
          variants={searchBar}
          initial={false}
          animate={isSearchBarOpen ? 'animate' : 'initial'}
          type='text'
          placeholder='Search'
          value={inputs.value}
          onChange={onChangeSearchBarValue}
          onBlur={onBlurSearchBarValue}
          onKeyUp={searchOnPressEnter}
          className={`navbar-search-bar ${
            isSearchBarOpen ? 'bg-white/100' : ''
          }`}
        />
      </div>

      <AnimatePresence>
        {isSearchBarOpen && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`dropdown-searchbar-container ${
              inputs.value ? 'border-[1px]' : ''
            }`}
          >
            {inputs.value ? (
              <div>
                <span className='dropdown-searchbar-title'>Results</span>

                {searchedProjects.length === 0 &&
                  searchedSections.length === 0 &&
                  searchedLabels.length === 0 &&
                  searchedTodos.length === 0 &&
                  inputs.value && (
                    <span className='dropdown-searchbar-no-results'>
                      No results
                    </span>
                  )}

                {searchedProjects.slice(0, 3).map((project, i) => (
                  <li
                    key={project.id}
                    onClick={() =>
                      onClickSearchItem(`/projects/${project.id}`, project)
                    }
                    className='py-2 px-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer w-full'
                  >
                    <span className='flex-center items-center h-full w-fit'>
                      {project.id !== 'inbox' ? (
                        <CircleIcon
                          className={`${project.color.class} w-4 h-4`}
                        />
                      ) : (
                        <InboxSolidIcon
                          className={`${project.color.class} w-4 h-4`}
                        />
                      )}
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: resultsBoldProjects[i],
                      }}
                    />
                  </li>
                ))}

                {searchedSections.slice(0, 3).map((section, i) => (
                  <li
                    key={section.id}
                    onClick={() =>
                      onClickSearchItem(
                        `/${section.project.id}/${section.id}`,
                        section
                      )
                    }
                    className='py-2 px-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer w-full'
                  >
                    <span className='flex-center items-center h-full w-fit'>
                      <SectionSolidIcon className='fill-[#202020] w-4 h-4' />
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: resultsBoldSections[i],
                      }}
                    />
                  </li>
                ))}

                {searchedLabels.slice(0, 3).map((label, i) => (
                  <li
                    key={label.id}
                    onClick={() =>
                      onClickSearchItem(`/labels/${label.id}`, label)
                    }
                    className='py-2 px-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer w-full'
                  >
                    <span className='flex-center items-center h-full w-fit'>
                      <LabelIcon className='fill-[#202020] w-4 h-4' />
                    </span>
                    <span
                      dangerouslySetInnerHTML={{ __html: resultsBoldLabels[i] }}
                    />
                  </li>
                ))}

                {searchedTodos.slice(0, 3).map((todo, i) => (
                  <li
                    key={todo.id}
                    onClick={() =>
                      onClickSearchItem(`/${todo.project.id}/`, todo)
                    }
                    className='py-2 px-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer w-full'
                  >
                    <span className='flex-center items-center h-full w-fit'>
                      <SquareCheckRegularIcon className='fill-[#202020] w-4 h-4' />
                    </span>
                    <span
                      dangerouslySetInnerHTML={{ __html: resultsBoldTodos[i] }}
                    />
                  </li>
                ))}
              </div>
            ) : (
              <div>
                <div>
                  <span className='dropdown-searchbar-title'>
                    Recente searches
                  </span>

                  {searchedInputs.recentSearches
                    .slice(0, 5)
                    .map((search, i) => (
                      <li
                        key={`${i}_${search}`}
                        className='py-2 px-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer w-full'
                      >
                        <span className='flex-center items-center h-full w-fit'>
                          <ClockRegularIcon className='fill-[#202020] w-4 h-4' />
                        </span>
                        <span>{search}</span>
                      </li>
                    ))}
                </div>

                <div>
                  <span className='dropdown-searchbar-title'>
                    Recently viewed
                  </span>

                  {recentlyViewed.slice(0, 5).map((recent) => (
                    <li
                      key={recent.id}
                      className='py-2 px-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer w-full'
                    >
                      <span className='flex-center items-center h-full w-fit'>
                        {getRecentlyViewedIcon(recent)}
                      </span>
                      <span>{recent.title}</span>
                    </li>
                  ))}
                </div>
              </div>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
