import { IColumn } from '../../@types/task';

const columnOrder = ['ToDo', 'Doing', 'Done'];

const initialColumns: IColumn[] = [
  {
    id: 'ToDo',
    titulo: 'Todo',
    cadAddNewTask: true,
    taskIds: [],
  },
  {
    id: 'Doing',
    titulo: 'Doing',
    cadAddNewTask: false,
    taskIds: [],
  },
  {
    id: 'Done',
    titulo: 'Done',
    cadAddNewTask: false,
    taskIds: [],
  },
];

export { columnOrder, initialColumns };
