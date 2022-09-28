import styled from '@emotion/styled';
import { TaskListProps } from '../../@types/task';

interface ColumnContainerProps {
  isColumnEmpty: boolean;
}

const ColumnContainer = styled.div<ColumnContainerProps>`
  margin: 8px;
  /* border: 1px solid lightgrey; */
  /* border: ${(props) => props.isColumnEmpty && '1px solid lightgrey'}; */
  border-radius: 8px;
  width: 400px;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;

const StyledTaskList = styled.div<TaskListProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => props.isDraggingOver && 'skyblue'};
  flex-grow: 1;
  min-height: 100px;
`;

export { ColumnContainer, Title, StyledTaskList };
