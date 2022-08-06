import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import { Column } from './Column';
import api from '../../services/api';

const Container = styled.div`
  display: flex;
`;

interface TaskLayout {
  tasks: { id: string; conteudo: string; titulo: string }[];
  columns: {
    id: string;
    titulo: string;
    taskIds: string[];
    cadAddNewTask: boolean;
  }[];
  columnOrder: string[];
}

export default function DragDropContainer() {
  const [state, setState] = useState<TaskLayout>(initialData);

  const loadTasks = async () => {
    const tasksLoaded = await api.get('/cards');
    console.log('tasksLoaded :', tasksLoaded);

    const columns = [...initialData.columns];

    tasksLoaded.data.forEach((x: any) => {
      const findIndex = columns.findIndex((y) => x.lista === y.id);
      columns[findIndex].taskIds.push(x.id);
    });

    const newState = {
      tasks: tasksLoaded.data,
      columns,
      columnOrder: initialData.columnOrder,
    };
    console.log('newState :', newState);

    setState(newState);
    // api
    //   .get('/cards')
    //   .then((response) => console.log('responsee', response))
    //   .catch((err) => {
    //     console.error('ops! ocorreu um erro' + err);
    //   });
  };

  useEffect(() => {
    loadTasks();
  }, []);

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

  const createNewTask = async (task: any) => {
    const newTask = { ...task, lista: 'ToDo' };

    const result = await api.post('/cards', newTask);

    const columns = [...state.columns];
    const columnIndex = columns.findIndex((column) => column.id === 'ToDo');

    columns[columnIndex].taskIds.push(result.data.id);

    const newState = {
      ...state,
      tasks: [...state.tasks, result.data],
      columns: columns,
    };

    setState(newState);
    return result;
  };

  const deleteTask = async (data: any) => {
    const result = await api.delete(`/cards/${data.task.id}`);

    const newTasks = state.tasks.filter((task) => task.id !== data.task.id);
    const columns = [...state.columns];
    const columnIndex = columns.findIndex(
      (column) => column.id === data.column.id
    );
    columns[columnIndex].taskIds.filter((taskId) => taskId !== data.task.id);

    const newState = {
      ...state,
      tasks: newTasks,
      columns,
    };

    setState(newState);
    return result;
  };
  // if (!state) return <h1>Loading</h1>;

  return (
    <div>
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result)}>
        <Container>
          {state.columnOrder.map((columnId: string) => {
            if (state.columns === undefined) return [];

            const column = state.columns.find((x) => x.id === columnId);

            if (column === undefined) return <></>;

            let tasks: { id: string; conteudo: string; titulo: string }[] = [];

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
                onConfirm={createNewTask}
                onDelete={deleteTask}
                // addNewTask={}
              />
            );
          })}
        </Container>
      </DragDropContext>
    </div>
  );
}
