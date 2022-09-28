import { columnOrder } from '../../components/DragDropContainer/config';

const getTargetColumn = (result: any) => {
  const { source, buttonClick } = result;

  const columnIndex = columnOrder.indexOf(source.droppableId);

  const targetColumnId =
    buttonClick === 'next'
      ? columnOrder[columnIndex + 1]
      : columnOrder[columnIndex - 1];

  return {
    droppableId: targetColumnId,
    index: columnOrder.length,
  };
};

const reorderTaskInTheSameColumn = ({
  start,
  source,
  target,
  columns,
  draggableId,
}: any) => {
  const newTaskIds = Array.from(start!.taskIds);
  newTaskIds.splice(source.index, 1);
  newTaskIds.splice(target.index, 0, draggableId);

  const newColumnsState = [
    ...columns.filter((x: any) => x.id !== start!.id),
    {
      ...columns.filter((x: any) => x.id === start!.id)[0],
      taskIds: newTaskIds,
    },
  ];

  return newColumnsState;
};

const reorderTaskToAnotherColumn = ({
  start,
  source,
  target,
  columns,
  draggableId,
  finish,
}: any) => {
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

  const newColumnsState = [
    ...columns.filter((x: any) => x.id !== start.id && x.id !== finish.id),
    newStart,
    newFinish,
  ];

  return newColumnsState;
};

export {
  getTargetColumn,
  reorderTaskInTheSameColumn,
  reorderTaskToAnotherColumn,
};
