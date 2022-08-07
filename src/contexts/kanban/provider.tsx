import {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { IColumn, ITask, KanbanContextType } from '../../@types/task';
import initialData from '../../components/DragDropContainer/initial-data';
import api from '../../services/api';

export const KanbanContext = createContext<KanbanContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const columnOrder = ['ToDo', 'Doing', 'Done'];

const KanbanProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [columns, setColumns] = useState<IColumn[]>([]);

  const loadTasks = async () => {
    const tasksLoaded = await api.get('/cards');
    console.log('tasksLoaded :', tasksLoaded);

    const columns = [...initialData.columns];

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

  const updateTask = (task: ITask) => {
    const index = tasks.findIndex((item) => item.id === task.id);
    if (index < 0) {
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[index] = task;

    setTasks(updatedTasks);
    // updatedTask.editMode = true;

    // task.lista = target.droppableId;
    // api.put(`/cards/${draggableId}`, task);
  };

  const saveTaskEdit = (task: ITask) => {
    const index = tasks.findIndex((item) => item.id === task.id);
    if (index < 0) {
      return;
    }

    const newValue = { ...task, ...task.editMode };
    delete newValue.editMode;

    // const updatedTasks = [...tasks];
    // updatedTasks[index] = task;
    // console.log('updatedTasks :', updatedTasks);

    // setTasks(updatedTasks);

    api.put(`/cards/${task.id}`, newValue);

    updateTask(newValue);
    // updatedTask.editMode = true;

    // task.lista = target.droppableId;
    // api.put(`/cards/${draggableId}`, task);
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

  // const [openFamilyDialog, setOpenFamilyDialog] = useState(false);
  // const [familyForm, setFamilyForm] = useState(defaultFamily);

  // const editFamily = async (familyForm) => {
  //   setOpenFamilyDialog(true);
  //   setFamilyForm(familyForm);
  // };

  // const clearFamilyData = async () => {
  //   setFamilyForm(defaultFamily);
  // };

  // const changeFamily = async (field, data) => {
  //   setFamilyForm((prevState) => ({
  //     ...prevState,
  //     [field]: data,
  //   }));
  // };

  // const changeMember = async (index, field, data) => {
  //   const updatedForm = { ...familyForm };
  //   updatedForm.members[index] = {
  //     ...updatedForm.members[index],
  //     [field]: data,
  //   };

  //   setFamilyForm(updatedForm);
  // };

  // const addNewMemberField = async () => {
  //   setFamilyForm((prevState) => ({
  //     ...prevState,
  //     members: [...prevState.members, defaultMember],
  //   }));
  // };

  // const removeMemberField = async (index) => {
  //   const removedForm = { ...familyForm };
  //   removedForm.members.splice(index, 1);
  //   setFamilyForm(removedForm);
  // };

  //   const saveTodo = (todo: ITodo) => {
  //   const newTodo: ITodo = {
  //     id: Math.random(), // not really unique - but fine for this example
  //     title: todo.title,
  //     description: todo.description,
  //     status: false,
  //   }
  //   setTodos([...todos, newTodo])
  // }

  // const updateTodo = (id: number) => {
  //   todos.filter((todo: ITodo) => {
  //     if (todo.id === id) {
  //       todo.status = true
  //       setTodos([...todos])
  //     }
  //   })
  // }
  return (
    <KanbanContext.Provider
      value={{
        tasks,
        columns,
        onDragEnd,
        createTask,
        deleteTask,
        updateTask,
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
