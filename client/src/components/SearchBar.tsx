import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
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

interface ISearchInput {
  value: string;
  results: {
    projects: IProject[];
    sections: ISection[];
    labels: ILabel[];
    todos: ITodo[];
  };
  recentSearches: string[];
  recentylViewed: (IProject | ISection | ILabel | ITodo)[];
}

export const SearchBar = ({ onClick }: { onClick: () => void }) => {
  const { projects, sections, labels, todos } = useTodosStore();
  const { searchedInputs, setSearchedInputs } = useUIStore();

  const navigate = useNavigate();

  const [isSearchBarOpen, toggleSearchBar] = useToggle(false);
  const [inputs, setInputs] = useState<ISearchInput>({
    value: '',
    recentSearches: [],
    results: {
      projects: [],
      sections: [],
      labels: [],
      todos: [],
    },
    recentylViewed: [],
  });

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
        projects: filterDataByText(projects, value),
        sections: filterDataByText(sections, value),
        labels: filterDataByText(labels, value),
        todos: filterDataByText(todos, value),
      },
    }));
  };

  const onBlurSearchBarValue = () =>
    setInputs((state) => ({
      ...state,
      value: '',
      results: {
        projects: [],
        sections: [],
        labels: [],
        todos: [],
      },
    }));

  const searchValueAsRegExp = new RegExp('(' + inputs.value + ')', 'm');

  const bolderize = (str: string, regExp: RegExp) =>
    str.replace(regExp, '<strong>$1</strong>');

  const resultsBoldProjects = inputs.results.projects.map((project) =>
    bolderize(project.title, searchValueAsRegExp)
  );
  const resultsBoldSections = inputs.results.sections.map((project) =>
    bolderize(project.title, searchValueAsRegExp)
  );
  const resultsBoldLabels = inputs.results.labels.map((project) =>
    bolderize(project.title, searchValueAsRegExp)
  );
  const resultsBoldTodos = inputs.results.todos.map((project) =>
    bolderize(project.title, searchValueAsRegExp)
  );

  const onClickSearchItem = (
    path: string,
    data: IProject | ISection | ILabel | ITodo
  ) => {
    setSearchedInputs({
      recentSearches: [inputs.value, ...searchedInputs.recentSearches],
      recentylViewed: [data, ...searchedInputs.recentylViewed],
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
          variants={searchBar}
          initial={false}
          animate={isSearchBarOpen ? 'animate' : 'initial'}
          type='text'
          placeholder='Search'
          value={inputs.value}
          onChange={onChangeSearchBarValue}
          onBlur={onBlurSearchBarValue}
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

                {inputs.results.projects.length === 0 &&
                  inputs.results.sections.length === 0 &&
                  inputs.results.labels.length === 0 &&
                  inputs.results.todos.length === 0 &&
                  inputs.value && (
                    <span className='dropdown-searchbar-no-results'>
                      No results
                    </span>
                  )}

                {inputs.results.projects.slice(0, 3).map((project, i) => (
                  <li
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

                {inputs.results.sections.slice(0, 3).map((section, i) => (
                  <li
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

                {inputs.results.labels.slice(0, 3).map((label, i) => (
                  <li
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

                {inputs.results.todos.slice(0, 3).map((todo, i) => (
                  <li
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

                  {searchedInputs.recentSearches.slice(0, 5).map((search) => (
                    <li className='py-2 px-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer w-full'>
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

                  {searchedInputs.recentylViewed.slice(0, 5).map((recent) => (
                    <li className='py-2 px-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer w-full'>
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
