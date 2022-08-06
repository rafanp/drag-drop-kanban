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

const initialData: TaskLayout = {
  tasks: [
    // { id: 'task-1', conteudo: 'Take out the garbage', titulo: 'Titulo' },
    // { id: 'task-2', conteudo: 'Watch my favorite show', titulo: 'Titulo' },
    // { id: 'task-3', conteudo: 'Charge my phone', titulo: 'Titulo' },
    // { id: 'task-4', conteudo: 'Cook dinner', titulo: 'Titulo' },
  ],
  columns: [
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
    // {
    //   id: 'ToDo',
    //   titulo: 'Todo',
    //   cadAddNewTask: true,
    //   taskIds: ['task-1', 'task-2'],
    // },
    // {
    //   id: 'Doing',
    //   titulo: 'Doing',
    //   cadAddNewTask: false,
    //   taskIds: ['task-3'],
    // },
    // {
    //   id: 'Done',
    //   titulo: 'Done',
    //   cadAddNewTask: false,
    //   taskIds: ['task-4'],
    // },
  ],
  // Facilitate reordering of the columns
  columnOrder: ['ToDo', 'Doing', 'Done'],
};

export default initialData;
