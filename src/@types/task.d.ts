export interface ITask {
  id?: string;
  conteudo: string;
  titulo: string;
  lista: string;
  editMode?: boolean;
}

export interface IColumn {
  id: string;
  titulo: string;
  taskIds: string[];
  cadAddNewTask: boolean;
}

export interface ITaskLayout {
  tasks: ITask[];
  columns: IColumn[];
  columnOrder: string[];
}

export type KanbanContextType = {
  tasks: ITask[];
  columns: IColumn[];
  onDragEnd: (props: any) => void;
  createTask: (props: any) => void;
  deleteTask: (props: any) => void;
  updateTask: (props: any) => void;
  // columnOrder:
  // saveTodo: (todo: ITodo) => void;
  // updateTodo: (id: number) => void;
};
