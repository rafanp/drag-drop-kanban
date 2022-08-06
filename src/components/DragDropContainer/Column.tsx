import React from 'react';
import styled from 'styled-components';
import { Task } from './Task';
import { Droppable } from 'react-beautiful-dnd';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;

interface TaskListProps {
  isDraggingOver: boolean;
  innerRef: any;
  children: any;
}

const StyledTaskList = styled.div<TaskListProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

const TaskList: React.FC<TaskListProps> = (props) => {
  return <StyledTaskList ref={props.innerRef} {...props} />;
};

interface ColumnProps {
  column: {
    titulo: string;
    cadAddNewTask: boolean;
    id: string;
  };
  tasks: { id: string; conteudo: string; titulo: string }[];
  onChange?: any;
}

export const Column: React.FC<ColumnProps> = (props) => {
  const { onChange, column } = props;

  const onChangeColumn = (result: any) => {
    const { column, index, task, buttonClick } = result;
    const query = {
      source: {
        droppableId: column.id,
        index,
      },
      draggableId: task.id,
      buttonClick,
    };
    onChange(query);
  };

  return (
    <Container>
      <Stack direction="row" spacing={1} alignItems="center">
        <Title>{props.column.titulo}</Title>
        {column.cadAddNewTask && (
          <IconButton
            aria-label="right"
            // onClick={() => props.onChangeColumn('next')}
          >
            <AddIcon />
          </IconButton>
        )}
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
                    key={task.id}
                    task={task}
                    index={index}
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
