import { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { KanbanContext } from '../../contexts/kanban/provider';
import { KanbanContextType } from '../../@types/task';

import ColumnsContainer from './ColumnsContainer';

const DragDropContainer = () => {
  const { onDragTaskEnd } = useContext(KanbanContext) as KanbanContextType;

  return (
    <div>
      <DragDropContext onDragEnd={(result: any) => onDragTaskEnd(result)}>
        <ColumnsContainer />
      </DragDropContext>
    </div>
  );
};

export default DragDropContainer;
