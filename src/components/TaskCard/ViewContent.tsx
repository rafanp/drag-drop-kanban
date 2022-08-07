import { useContext } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { KanbanContextType } from '../../@types/task';
import { KanbanContext } from '../../contexts/kanban/provider';
import Markdown from '../Markdown';
import { FlexContainer } from './styles';

const ViewContent = (props: any) => {
  const { onChangeTaskState } = useContext(KanbanContext) as KanbanContextType;

  const { task } = props;

  const onChangeEdit = () => {
    const newValue = {
      ...task,
      editForm: { titulo: task.titulo, conteudo: task.conteudo },
    };
    onChangeTaskState(newValue);
  };

  return (
    <>
      <CardContent>
        <FlexContainer>
          <Typography
            sx={{ fontSize: 16, fontWeight: 'bold' }}
            color="primary"
            gutterBottom
          >
            {props?.task?.titulo}
          </Typography>
          <IconButton aria-label="right" onClick={() => onChangeEdit()}>
            <EditIcon />
          </IconButton>
        </FlexContainer>

        <Markdown text={props.task.conteudo} />
      </CardContent>
      <CardActions>
        {props?.type !== 'new' && (
          <FlexContainer>
            <IconButton
              aria-label="left"
              onClick={() => props.onChangeColumn('back')}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => props.onDelete(props.task.id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="right"
              onClick={() => props.onChangeColumn('next')}
            >
              <ChevronRightIcon />
            </IconButton>
          </FlexContainer>
        )}
      </CardActions>
    </>
  );
};

export default ViewContent;
