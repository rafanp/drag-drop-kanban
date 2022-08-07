import { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Column } from './Column';
import { KanbanContext } from '../../contexts/kanban/provider';
import { ITask, KanbanContextType } from '../../@types/task';
import { columnOrder } from './config';
import { Box } from '@mui/material';

const DragDropContainer = () => {
  const { tasks, columns, onDragEnd } = useContext(
    KanbanContext
  ) as KanbanContextType;

  // if (!state) return <h1>Loading</h1>;

  return (
    <div>
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result)}>
        <Box display="flex">
          {columnOrder.map((columnId: string) => {
            if (columns === undefined) return [];

            const column = columns.find((x) => x.id === columnId);

            if (column === undefined) return <></>;

            let selectedTasks: ITask[] = [];

            for (const taskId of column!.taskIds) {
              const foundTask = tasks.find((x) => x.id === taskId);
              if (foundTask) selectedTasks.push(foundTask);
            }

            return (
              <Column key={column!.id} column={column} tasks={selectedTasks} />
            );
          })}
        </Box>
      </DragDropContext>
    </div>
  );
};

export default DragDropContainer;
