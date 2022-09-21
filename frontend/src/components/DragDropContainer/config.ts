import { IColumn } from '../../@types/task';

const columnOrder = ['ToDo', 'Doing', 'Done'];

const initialColumns: IColumn[] = [
  {
    id: 'ToDo',
    title: 'Todo',
    cadAddNewTask: true,
    taskIds: [],
  },
  {
    id: 'Doing',
    title: 'Doing',
    cadAddNewTask: false,
    taskIds: [],
  },
  {
    id: 'Done',
    title: 'Done',
    cadAddNewTask: false,
    taskIds: [],
  },
];

export { columnOrder, initialColumns };
