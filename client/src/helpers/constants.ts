import { IProject } from './types';
import { t } from 'i18next';
import '../i18n';

export const labelColors = [
  'fill-red-500',
  'fill-orange-500',
  'fill-yellow-500',
  'fill-blue-500',
  'fill-gray-400',
];

export const labelHoverColors = [
  'group-hover:fill-red-600',
  'group-hover:fill-orange-600',
  'group-hover:fill-yellow-600',
  'group-hover:fill-blue-600',
  'group-hover:fill-gray-500',
];

export const language =
  typeof window !== 'undefined' ? window.navigator.language : 'default';

export const selectBgColors = {
  [`${t('colors.stone')}`]: 'bg-stone-600',
  [`${t('colors.red')}`]: 'bg-red-600',
  [`${t('colors.orange')}`]: 'bg-orange-600',
  [`${t('colors.amber')}`]: 'bg-amber-600',
  [`${t('colors.yellow')}`]: 'bg-yellow-600',
  [`${t('colors.lime')}`]: 'bg-lime-600',
  [`${t('colors.green')}`]: 'bg-green-600',
  [`${t('colors.emerald')}`]: 'bg-emerald-600',
  [`${t('colors.teal')}`]: 'bg-teal-600',
  [`${t('colors.cyan')}`]: 'bg-cyan-600',
  [`${t('colors.sky')}`]: 'bg-sky-600',
  [`${t('colors.blue')}`]: 'bg-blue-600',
  [`${t('colors.indigo')}`]: 'bg-indigo-600',
  [`${t('colors.violet')}`]: 'bg-violet-600',
  [`${t('colors.purple')}`]: 'bg-purple-600',
  [`${t('colors.fuchsia')}`]: 'bg-fuchsia-600',
  [`${t('colors.pink')}`]: 'bg-pink-600',
  [`${t('colors.rose')}`]: 'bg-rose-600',
};

export const selectFillColors = {
  [`${t('colors.stone')}`]: 'fill-stone-600',
  [`${t('colors.red')}`]: 'fill-red-600',
  [`${t('colors.orange')}`]: 'fill-orange-600',
  [`${t('colors.amber')}`]: 'fill-amber-600',
  [`${t('colors.yellow')}`]: 'fill-yellow-600',
  [`${t('colors.lime')}`]: 'fill-lime-600',
  [`${t('colors.green')}`]: 'fill-green-600',
  [`${t('colors.emerald')}`]: 'fill-emerald-600',
  [`${t('colors.teal')}`]: 'fill-teal-600',
  [`${t('colors.cyan')}`]: 'fill-cyan-600',
  [`${t('colors.sky')}`]: 'fill-sky-600',
  [`${t('colors.blue')}`]: 'fill-blue-600',
  [`${t('colors.indigo')}`]: 'fill-indigo-600',
  [`${t('colors.violet')}`]: 'fill-violet-600',
  [`${t('colors.purple')}`]: 'fill-purple-600',
  [`${t('colors.fuchsia')}`]: 'fill-fuchsia-600',
  [`${t('colors.pink')}`]: 'fill-pink-600',
  [`${t('colors.rose')}`]: 'fill-rose-600',
};

// export const selectBgColors = {
//   stone: 'bg-stone-600',
//   red: 'bg-red-600',
//   orange: 'bg-orange-600',
//   amber: 'bg-amber-600',
//   yellow: 'bg-yellow-600',
//   lime: 'bg-lime-600',
//   green: 'bg-green-600',
//   emerald: 'bg-emerald-600',
//   teal: 'bg-teal-600',
//   cyan: 'bg-cyan-600',
//   sky: 'bg-sky-600',
//   blue: 'bg-blue-600',
//   indigo: 'bg-indigo-600',
//   violet: 'bg-violet-600',
//   purple: 'bg-purple-600',
//   fuchsia: 'bg-fuchsia-600',
//   pink: 'bg-pink-600',
//   rose: 'bg-rose-600',
// };

// export const selectFillColors = {
//   stone: 'fill-stone-600',
//   red: 'fill-red-600',
//   orange: 'fill-orange-600',
//   amber: 'fill-amber-600',
//   yellow: 'fill-yellow-600',
//   lime: 'fill-lime-600',
//   green: 'fill-green-600',
//   emerald: 'fill-emerald-600',
//   teal: 'fill-teal-600',
//   cyan: 'fill-cyan-600',
//   sky: 'fill-sky-600',
//   blue: 'fill-blue-600',
//   indigo: 'fill-indigo-600',
//   violet: 'fill-violet-600',
//   purple: 'fill-purple-600',
//   fuchsia: 'fill-fuchsia-600',
//   pink: 'fill-pink-600',
//   rose: 'fill-rose-600',
// };

export const inboxProject: IProject = {
  id: 'inbox',
  type: 'project',
  title: 'Inbox',
  color: {
    name: 'Blue',
    class: 'fill-blue-600',
  },
};
