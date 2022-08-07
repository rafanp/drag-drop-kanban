import { useContext, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import { Column } from './Column';
import api from '../../services/api';
import { KanbanContext } from '../../contexts/kanban/provider';
import { ITask, KanbanContextType } from '../../@types/task';

const Container = styled.div`
  display: flex;
`;

const columnOrder = ['ToDo', 'Doing', 'Done'];

const DragDropContainer = () => {
  const { tasks, columns, onDragEnd, createTask, deleteTask } = useContext(
    KanbanContext
  ) as KanbanContextType;

  // if (!state) return <h1>Loading</h1>;

  return (
    <div>
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result)}>
        <Container>
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
              <Column
                key={column!.id}
                column={column}
                tasks={selectedTasks}
                // onChange={onDragEnd}
                // onConfirm={createTask}
                // onDelete={deleteTask}
              />
            );
          })}
        </Container>
      </DragDropContext>
    </div>
  );
};

export default DragDropContainer;
