import React, { useContext } from 'react';
import { Task } from './Task';
import { Droppable } from 'react-beautiful-dnd';

import Stack from '@mui/material/Stack';
import { ITask, KanbanContextType, TaskListProps } from '../../@types/task';
import { KanbanContext } from '../../contexts/kanban/provider';
import { Container, StyledTaskList, Title } from './styles';
import CreateTaskPopper from '../Popper/CreateNewTaskPopper';

const TaskList: React.FC<TaskListProps> = (props) => {
  return <StyledTaskList ref={props.innerRef} {...props} />;
};

interface ColumnProps {
  column: {
    title: string;
    cadAddNewTask: boolean;
    id: string;
  };
  tasks: ITask[];
}

export const Column: React.FC<ColumnProps> = (props) => {
  const { onDragTaskEnd, deleteTask } = useContext(
    KanbanContext
  ) as KanbanContextType;

  const onChangeColumn = (result: any) => {
    const { column, index, task, buttonClick } = result;
    const query = {
      source: {
        droppableId: column.id,
        index,
      },
      draggableId: task._id,
      buttonClick,
    };
    onDragTaskEnd(query);
  };

  return (
    <Container>
      <Stack direction="row" spacing={1} alignItems="center">
        <Title>{props.column.title}</Title>
        {props.column.cadAddNewTask && <CreateTaskPopper />}
      </Stack>

      <Droppable droppableId={props.column.id} type="TASK">
        {(provided, snapshot) => (
          <TaskList
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.tasks.map((task: any, index) => {
              return (
                <div>
                  <Task
                    key={task._id}
                    task={task}
                    index={index}
                    onDelete={() =>
                      deleteTask({ task, index, column: props.column })
                    }
                    onChangeColumn={(actionType: string) =>
                      onChangeColumn({
                        task,
                        index,
                        column: props.column,
                        buttonClick: actionType,
                      })
                    }
                  />
                </div>
              );
            })}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};
