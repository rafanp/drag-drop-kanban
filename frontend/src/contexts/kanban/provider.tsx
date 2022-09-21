import { useContext, createContext, useState, useEffect } from 'react';

import { IColumn, ITask, KanbanContextType } from '../../@types/task';
import { initialColumns } from '../../components/DragDropContainer/config';
import { mockedTasks } from '../../mocks/populateTasks';
import api from '../../services/api';
import axios from 'axios';
import {
  getTargetColumn,
  reorderTaskInTheSameColumn,
  reorderTaskToAnotherColumn,
} from './helpers';

export const KanbanContext = createContext<KanbanContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const KanbanProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [columns, setColumns] = useState<IColumn[]>([]);

  const populateTasks = async () => {
    const response = await Promise.all(
      mockedTasks.map(async (task) => {
        const res = await api.post('/cards', task);
        return res.data;
      })
    );

    loadTasks();
    return response;
  };

  const loadTasks = async () => {
    // const response = await axios.post('/api/users/' + 'login', {
    //   email: 'rafael@gmails.com',
    //   password: '123456',
    // });

    const tasksLoaded = await api.get('/cards');
    console.log('tasksLoaded :', tasksLoaded);

    const columns = [...initialColumns];
    console.log('columns :', columns);

    tasksLoaded.data.forEach((task: any) => {
      console.log('task :', task);
      const findIndex = columns.findIndex((y) => task.list === y.id);
      console.log('findIndex :', findIndex);
      const isTaskAlreadyInColumn = columns[findIndex].taskIds.some(
        (taskId) => taskId === task._id
      );
      console.log('isTaskAlreadyInColumn :', isTaskAlreadyInColumn);
      if (!isTaskAlreadyInColumn) {
        columns[findIndex].taskIds.push(task._id);
      }
    });

    // if (!tasksLoaded.data.length) {
    //   await populateTasks();
    // }
    console.log('columns', columns);

    setTasks(tasksLoaded.data);
    setColumns(columns);
  };

  const createTask = async (task: any) => {
    const newTask = { ...task, list: 'ToDo' };

    const response = await api.post('/cards', newTask);

    const updatedColumns = [...columns];
    const columnIndex = updatedColumns.findIndex(
      (column) => column.id === 'ToDo'
    );

    updatedColumns[columnIndex].taskIds.push(response.data.id);

    setTasks([...tasks, response.data]);
    setColumns(updatedColumns);

    return response;
  };

  const deleteTask = async (data: any) => {
    const response = await api.delete(`/cards/${data.task._id}`);

    const newTasks = tasks.filter((task) => task._id !== data.task._id);
    const updatedColumns = [...columns];
    const columnIndex = updatedColumns.findIndex(
      (column) => column.id === data.column.id
    );
    updatedColumns[columnIndex].taskIds.filter(
      (taskId) => taskId !== data.task._id
    );

    setTasks(newTasks);
    setColumns(updatedColumns);

    return response;
  };

  const onChangeTaskState = (task: ITask) => {
    const index = tasks.findIndex((item) => item._id === task._id);
    if (index < 0) {
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[index] = task;

    setTasks(updatedTasks);
  };

  const saveTaskEdit = (task: ITask) => {
    const index = tasks.findIndex((item) => item._id === task._id);
    if (index < 0) {
      return;
    }

    const newValue = { ...task, ...task.editForm };
    delete newValue.editForm;

    api.put(`/cards/${task._id}`, newValue);

    onChangeTaskState(newValue);
  };

  const updateTaskColumn = async ({ draggableId, target }: any) => {
    const task = tasks.find((task) => task._id === draggableId);
    if (!task) {
      return;
    }

    task.list = target.droppableId;
    const response = await api.put(`/cards/${draggableId}`, task);
    return response.data;
  };

  const onDragTaskEnd = (result: any) => {
    const { destination, source, draggableId, buttonClick } = result;

    let target = destination;

    if (buttonClick === 'next' || buttonClick === 'back') {
      target = getTargetColumn(result);
    }

    const isTargetIsTheSamePosition =
      target.droppableId === source.droppableId &&
      target.index === source.index;

    if (!target || isTargetIsTheSamePosition) {
      return;
    }

    const start = columns.find((x) => x.id === source.droppableId);
    const finish = columns.find((x) => x.id === target.droppableId);

    if (!start || !finish) return;

    if (start === finish) {
      const newColumnsState = reorderTaskInTheSameColumn({
        start,
        source,
        target,
        columns,
        draggableId,
      });

      setColumns(newColumnsState);
      return;
    }

    const newColumnsState = reorderTaskToAnotherColumn({
      start,
      source,
      target,
      columns,
      draggableId,
      finish,
    });

    updateTaskColumn({ draggableId, target });

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
        onDragTaskEnd,
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
