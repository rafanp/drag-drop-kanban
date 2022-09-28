interface ILoginProps {
  email: string;
  password: string;
}

export type AuthContextType = {
  // tasks: ITask[];
  // columns: IColumn[];
  // onDragTaskEnd: (props: any) => void;
  token: string;
  onLogout: () => void;
  onLogin: (data: ILoginProps) => void;
  // deleteTask: (props: any) => void;
  // onChangeTaskState: (props: any) => void;
  // saveTaskEdit: (props: any) => void;
};
