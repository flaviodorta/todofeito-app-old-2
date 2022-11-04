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
import { useOnClickOutside } from '../hooks/useOnClickOutside';

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

export const SearchBar = () => {
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

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [inputs, setInputs] = useState<ISearchInput>(defaultInputValues);

  const openSearchBar = () => setIsSearchBarOpen(true);
  const closeSearchBar = () => setIsSearchBarOpen(false);

  function filterDataByText<T extends ITodo | IProject | ILabel | ISection>(
    datas: T[],
    searchText: string
  ) {
    return datas.filter((data) =>
      data.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  const onChangeSearchBarValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    openSearchBar();

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
    if (!inputs.value) return;

    setInputs(defaultInputValues);

    setSearchedInputs({
      results: inputs.results,
      recentSearches: [inputs.value, ...searchedInputs.recentSearches],
      recentlyViewedIds: [...searchedInputs.recentlyViewedIds],
    });

    closeSearchBar();

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

    closeSearchBar();
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

  const clearRecentSearches = () =>
    setSearchedInputs({ ...searchedInputs, recentSearches: [] });

  const deleteRecentSearch = (index: number) => {
    const recentSearchesCopy = [...searchedInputs.recentSearches];
    recentSearchesCopy.splice(index, 1);
    setSearchedInputs({
      ...searchedInputs,
      recentSearches: recentSearchesCopy,
    });
  };

  const dropdownRef = useRef<HTMLUListElement>(null!);

  useOnClickOutside(dropdownRef, closeSearchBar);

  const isSearchBarFocused = document.activeElement === searchBarRef.current;

  return (
    <div className='relative'>
      <div
        onClick={openSearchBar}
        onFocus={openSearchBar}
        className='relative group flex items-center'
      >
        <SearchIcon
          className={`navbar-search-icon ${
            isSearchBarOpen || isSearchBarFocused ? 'fill-gray-600' : ''
          }`}
        />
        <button
          className={`navbar-open-search-icon ${
            isSearchBarOpen || isSearchBarFocused ? 'opacity-100' : ''
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
          className={`${
            isSearchBarOpen || isSearchBarFocused
              ? 'bg-white/100 placeholder:text-gray-600 focus:text-gray-900'
              : 'bg-white/20 placeholder:text-white group-hover:bg-white/100 group-hover:placeholder:text-gray-600'
          } placeholder:text-sm text-sm font-light h-6 rounded-sm outline-none pl-8 duration-150`}
        />
      </div>

      <AnimatePresence>
        {isSearchBarOpen && (
          <motion.ul
            ref={dropdownRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`absolute w-full rounded-sm top-7 shadow-2xl bg-white border-gray-200 ${
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
                  <span className='dropdown-searchbar-title flex justify-between'>
                    Recente searches
                    <span
                      onClick={clearRecentSearches}
                      className='text-sm text-gray-500 font-light cursor-pointer'
                    >
                      Clear
                    </span>
                  </span>

                  {searchedInputs.recentSearches
                    .slice(0, 5)
                    .map((search, i) => (
                      <li
                        key={`${i}_${search}`}
                        onClick={() => deleteRecentSearch(i)}
                        className='py-2 px-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer w-full'
                      >
                        <span className='flex-center items-center h-full w-fit'>
                          <ClockRegularIcon className='fill-[#202020] w-4 h-4' />
                        </span>
                        <span>{search}</span>
                        <span className='group ml-auto relative w-5 h-5 hover:bg-gray-200 rounded-sm flex-center'>
                          <span className='absolute w-2.5 h-[1px] bg-gray-400 group-hover:bg-gray-500 rotate-45 -translate-x-1/2 left-1/2 top-1/2' />
                          <span className='absolute w-2.5 h-[1px] bg-gray-400 group-hover:bg-gray-500 -rotate-45 -translate-x-1/2 left-1/2 top-1/2' />
                        </span>
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
