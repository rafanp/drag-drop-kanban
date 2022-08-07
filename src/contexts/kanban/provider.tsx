import { useContext, createContext, useState, useEffect } from 'react';

import { IColumn, ITask, KanbanContextType } from '../../@types/task';
import {
  columnOrder,
  initialColumns,
} from '../../components/DragDropContainer/config';
import api from '../../services/api';

export const KanbanContext = createContext<KanbanContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const KanbanProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [columns, setColumns] = useState<IColumn[]>([]);

  const loadTasks = async () => {
    const tasksLoaded = await api.get('/cards');

    const columns = [...initialColumns];

    tasksLoaded.data.forEach((task: any) => {
      const findIndex = columns.findIndex((y) => task.lista === y.id);
      const isTaskAlreadyInColumn = columns[findIndex].taskIds.some(
        (taskId) => taskId === task.id
      );
      if (!isTaskAlreadyInColumn) {
        columns[findIndex].taskIds.push(task.id);
      }
    });

    setTasks(tasksLoaded.data);
    setColumns(columns);
  };

  const createTask = async (task: any) => {
    const newTask = { ...task, lista: 'ToDo' };

    const result = await api.post('/cards', newTask);

    const updatedColumns = [...columns];
    const columnIndex = updatedColumns.findIndex(
      (column) => column.id === 'ToDo'
    );

    updatedColumns[columnIndex].taskIds.push(result.data.id);

    setTasks([...tasks, result.data]);
    setColumns(updatedColumns);

    return result;
  };

  const deleteTask = async (data: any) => {
    const result = await api.delete(`/cards/${data.task.id}`);

    const newTasks = tasks.filter((task) => task.id !== data.task.id);
    const updatedColumns = [...columns];
    const columnIndex = updatedColumns.findIndex(
      (column) => column.id === data.column.id
    );
    updatedColumns[columnIndex].taskIds.filter(
      (taskId) => taskId !== data.task.id
    );

    setTasks(newTasks);
    setColumns(updatedColumns);

    return result;
  };

  const onChangeTaskState = (task: ITask) => {
    const index = tasks.findIndex((item) => item.id === task.id);
    if (index < 0) {
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[index] = task;

    setTasks(updatedTasks);
  };

  const saveTaskEdit = (task: ITask) => {
    const index = tasks.findIndex((item) => item.id === task.id);
    if (index < 0) {
      return;
    }

    const newValue = { ...task, ...task.editForm };
    delete newValue.editForm;

    api.put(`/cards/${task.id}`, newValue);

    onChangeTaskState(newValue);
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, buttonClick } = result;

    let target = destination;

    if (buttonClick === 'next' || buttonClick === 'back') {
      const columnIndex = columnOrder.indexOf(source.droppableId);

      const targetColumnId =
        buttonClick === 'next'
          ? columnOrder[columnIndex + 1]
          : columnOrder[columnIndex - 1];

      target = {
        droppableId: targetColumnId,
        index: columnOrder.length,
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

    const start = columns.find((x) => x.id === source.droppableId);
    const finish = columns.find((x) => x.id === target.droppableId);

    if (!start || !finish) return;

    if (start === finish) {
      const newTaskIds = Array.from(start!.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(target.index, 0, draggableId);

      const newColumnsState = [
        ...columns.filter((x) => x.id !== start!.id),
        {
          ...columns.filter((x) => x.id === start!.id)[0],
          taskIds: newTaskIds,
        },
      ];

      setColumns(newColumnsState);
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

    // Alterar na api a task
    const task = tasks.find((task) => task.id === draggableId);
    if (!task) {
      return;
    }

    task.lista = target.droppableId;
    api.put(`/cards/${draggableId}`, task);

    const newColumnsState = [
      ...columns.filter((x) => x.id !== start.id && x.id !== finish.id),
      newStart,
      newFinish,
    ];

    setColumns(newColumnsState);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <KanbanContext.Provider
      value={{
        tasks,
        columns,
        onDragEnd,
        createTask,
        deleteTask,
        onChangeTaskState,
        saveTaskEdit,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export function useFamilies() {
  const context = useContext(KanbanContext);

  return context;
}

export default KanbanProvider;
