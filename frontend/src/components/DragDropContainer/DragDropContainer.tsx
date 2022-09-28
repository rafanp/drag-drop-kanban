import { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { KanbanContext } from '../../contexts/kanban/provider';
import { KanbanContextType } from '../../@types/task';

import ColumnsContainer from './ColumnsContainer';
import styled from '@emotion/styled';

const DragDropContainer = () => {
  const { onDragTaskEnd } = useContext(KanbanContext) as KanbanContextType;

  return (
    <Container>
      <DragDropContext onDragEnd={(result: any) => onDragTaskEnd(result)}>
        <ColumnsContainer />
      </DragDropContext>
    </Container>
  );
};

export default DragDropContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* background: $(theme) => theme.palette.text.secondary; */
  background-color: #f5f7fb;
`;
