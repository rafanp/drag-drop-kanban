import styled from '@emotion/styled';
import { TaskListProps } from '../../@types/task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
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
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

export { Container, Title, StyledTaskList };
