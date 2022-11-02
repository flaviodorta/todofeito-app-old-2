import { useState } from 'react';
import { DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd';

const queryAttr = 'data-rbd-draggable-id';

const getDraggedDom = (draggableId: string) => {
  const domQuery = `[${queryAttr}='${draggableId}']`;
  const draggedDOM = document.querySelector(domQuery);

  return draggedDOM;
};

export interface IPlaceholderProps {
  height: number;
  width: number;
  x: number;
  y: number;
}

interface IUseDndPlaceholder {
  setPlaceholderProps:
    | React.Dispatch<React.SetStateAction<IPlaceholderProps>>
    | ((placeholderProps: IPlaceholderProps) => void);
}

export function useDndPlaceholder({ setPlaceholderProps }: IUseDndPlaceholder) {
  const onDragStart = (e: DragStart) => {
    const draggedDOM = getDraggedDom(e.draggableId)!;

    if (!draggedDOM) return;

    const parentDraggedDOM = draggedDOM.parentNode as HTMLElement;

    const { clientHeight, clientWidth } = draggedDOM;

    const sourceIndex = e.source.index;

    const clientY = parseFloat(
      window.getComputedStyle(parentDraggedDOM).paddingTop +
        [...parentDraggedDOM.children]
          .slice(0, sourceIndex)
          .reduce((sum, el) => {
            const style = window.getComputedStyle(el);
            const marginBottom = parseFloat(style.marginBottom);
            return sum + el.clientHeight + marginBottom;
          }, 0)
    );

    const clientX = parseFloat(
      window.getComputedStyle(draggedDOM.parentNode as HTMLElement).paddingLeft
    );

    setPlaceholderProps({
      height: clientHeight,
      width: clientWidth,
      y: clientY,
      x: clientX,
    });
  };

  const onDragUpdate = (e: DragUpdate) => {
    if (!e.destination) return;

    const draggedDOM = getDraggedDom(e.draggableId);

    if (!draggedDOM) return;

    const parentDraggedDOM = draggedDOM.parentNode as HTMLElement;

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = e.destination.index;
    const sourceIndex = e.source.index;

    const childrenArray = [...parentDraggedDOM.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updateArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    const clientY =
      parseFloat(window.getComputedStyle(parentDraggedDOM).paddingTop) +
      updateArray.slice(0, destinationIndex).reduce((sum, el) => {
        const style = window.getComputedStyle(el);
        const marginBottom = parseFloat(style.marginBottom);
        return sum + el.clientHeight + marginBottom;
      }, 0);

    const clientX = parseFloat(
      window.getComputedStyle(draggedDOM.parentNode as HTMLElement).paddingLeft
    );

    setPlaceholderProps({
      height: clientHeight,
      width: clientWidth,
      y: clientY,
      x: clientX,
    });
  };

  return { onDragStart, onDragUpdate };
}
