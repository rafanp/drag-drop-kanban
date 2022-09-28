import { useContext } from 'react';

import { Column } from './Column';
import { KanbanContext } from '../../contexts/kanban/provider';
import { ITask, KanbanContextType } from '../../@types/task';
import { columnOrder } from './config';
import { Box } from '@mui/material';
import theme from '../../theme';
import grey from '@mui/material/colors/grey';

const ColumnsContainer = () => {
  const { tasks, columns } = useContext(KanbanContext) as KanbanContextType;

  return (
    <Box
      display="flex"
      // sx={{ background: (theme) => theme.palette.common.grey }}
      // sx={{ background: grey[100] }}
    >
      {columnOrder.map((columnId: string) => {
        if (columns === undefined) return [];

        const column = columns.find((x) => x.id === columnId);

        if (column === undefined) return <></>;

        let selectedTasks: ITask[] = [];

        for (const taskId of column!.taskIds) {
          const foundTask = tasks.find((x) => x._id === taskId);
          if (foundTask) selectedTasks.push(foundTask);
        }

        return (
          <Column key={column!.id} column={column} tasks={selectedTasks} />
        );
      })}
    </Box>
  );
};

export default ColumnsContainer;
