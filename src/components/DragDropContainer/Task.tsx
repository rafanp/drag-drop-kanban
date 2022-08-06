import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

interface ContainerProps {
  isDragDisabled: boolean;
  isDragging: boolean;
  ref: any;
}

const Container = styled.div<ContainerProps>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
      ? 'lightgreen'
      : 'white'};
`;

interface TaskProps {
  task: { id: string; content: string };
  index: number;
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
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
};
