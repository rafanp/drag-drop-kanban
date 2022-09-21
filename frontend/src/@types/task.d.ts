export interface ITask {
  _id?: string;
  content: string;
  title: string;
  list: string;
  editForm?: { content: string; title: string };
}

export interface IColumn {
  id: string;
  title: string;
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
  onDragTaskEnd: (props: any) => void;
  createTask: (props: any) => void;
  deleteTask: (props: any) => void;
  onChangeTaskState: (props: any) => void;
  saveTaskEdit: (props: any) => void;
};
