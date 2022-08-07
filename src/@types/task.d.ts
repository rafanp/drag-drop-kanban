export interface ITask {
  id?: string;
  conteudo: string;
  titulo: string;
  lista: string;
  editForm?: { conteudo: string; titulo: string };
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

export interface TaskListProps {
  isDraggingOver: boolean;
  innerRef: any;
  children: any;
}

export type KanbanContextType = {
  tasks: ITask[];
  columns: IColumn[];
  onDragEnd: (props: any) => void;
  createTask: (props: any) => void;
  deleteTask: (props: any) => void;
  onChangeTaskState: (props: any) => void;
  saveTaskEdit: (props: any) => void;
  // columnOrder:
  // saveTodo: (todo: ITodo) => void;
  // updateTodo: (id: number) => void;
};
