interface TaskLayout {
  tasks: { id: string; content: string }[];
  columns: { id: string; title: string; taskIds: string[] }[];
  columnOrder: string[];
}

const initialData: TaskLayout = {
  tasks: [
    { id: 'task-1', content: 'Take out the garbage' },
    { id: 'task-2', content: 'Watch my favorite show' },
    { id: 'task-3', content: 'Charge my phone' },
    { id: 'task-4', content: 'Cook dinner' },
  ],
  columns: [
    {
      id: 'column-1',
      title: 'Todo',
      taskIds: ['task-1', 'task-2'],
    },
    {
      id: 'column-2',
      title: 'Doing',
      taskIds: ['task-3'],
    },
    {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-4'],
    },
  ],
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
