import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import BasicCard from '../UI/Card';

interface ContainerProps {
  isDragDisabled: boolean;
  isDragging: boolean;
  ref: any;
}

const Container = styled.div<ContainerProps>`
  margin-bottom: 8px;
`;

interface TaskProps {
  task: { id: string; content: string };
  index: number;
  onChangeColumn: any;
  onDelete: any;
}

export const Task: React.FC<TaskProps> = (props) => {
  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      isDragDisabled={false}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={false}
        >
          <BasicCard
            task={props.task}
            onChangeColumn={props.onChangeColumn}
            onDelete={props.onDelete}
          />
        </Container>
      )}
    </Draggable>
  );
};
