import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import { Column } from './Column';

const Container = styled.div`
  display: flex;
`;

export default function DragAn() {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, buttonClick } = result;

    let target = destination;

    if (buttonClick === 'next' || buttonClick === 'back') {
      const columnIndex = state.columnOrder.indexOf(source.droppableId);

      const targetColumnId =
        buttonClick === 'next'
          ? state.columnOrder[columnIndex + 1]
          : state.columnOrder[columnIndex - 1];

      target = {
        droppableId: targetColumnId,
        index: state.columnOrder.length,
      };
    }

    if (!target) {
      return;
    }

    if (
      target.droppableId === source.droppableId &&
      target.index === source.index
    ) {
      return;
    }

    const start = state.columns.find((x) => x.id === source.droppableId);
    const finish = state.columns.find((x) => x.id === target.droppableId);

    if (!start || !finish) return;

    if (start === finish) {
      const newTaskIds = Array.from(start!.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(target.index, 0, draggableId);

      const newState = {
        ...state,
        columns: [
          ...state.columns.filter((x) => x.id !== start!.id),
          {
            ...state.columns.filter((x) => x.id === start!.id)[0],
            taskIds: newTaskIds,
          },
        ],
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start!.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish!.taskIds);
    finishTaskIds.splice(target.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: [
        ...state.columns.filter((x) => x.id !== start.id && x.id !== finish.id),
        newStart,
        newFinish,
      ],
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={(result: any) => onDragEnd(result)}>
      <Container>
        {state.columnOrder.map((columnId: string) => {
          if (state.columns === undefined) return [];

          const column = state.columns.find((x) => x.id === columnId);

          if (column === undefined) return <></>;

          let tasks: { id: string; content: string }[] = [];

          for (const taskId of column!.taskIds) {
            const foundTask = state.tasks.find((x) => x.id === taskId);
            if (foundTask) tasks.push(foundTask);
          }

          return (
            <Column
              key={column!.id}
              column={column}
              tasks={tasks}
              onChange={onDragEnd}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
}
