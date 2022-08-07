import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SaveIcon from '@mui/icons-material/Save';
import { Grid, TextField } from '@mui/material';
import { KanbanContext } from '../../../contexts/kanban/provider';
import { KanbanContextType } from '../../../@types/task';
import Markdown from '../../Markdown';

interface TaskContent {
  id?: string;
  conteudo: string;
  titulo: string;
}
const EditContent = (props: any) => {
  const [newTaskForm, setNewTaskForm] = useState<TaskContent>({
    conteudo: '',
    titulo: '',
  });
  const { onChangeTaskState, saveTaskEdit } = useContext(
    KanbanContext
  ) as KanbanContextType;

  const { task } = props;

  const onChange = (e: any) => {
    if (props.type === 'new') {
      setNewTaskForm((previousData) => ({
        ...previousData,
        [e.target.id]: e.target.value,
      }));
    }

    const newValue = {
      ...task,
      editForm: {
        ...task.editForm,
        [e.target.id]: e.target.value,
      },
    };

    onChangeTaskState(newValue);
  };

  const onCancelEditTask = () => {
    const newValue = { ...props.task };
    delete newValue.editForm;
    onChangeTaskState(newValue);
  };

  const onClickSaveButton = () => {
    if (props.onConfirm) {
      console.log('if');
      return props.onConfirm(newTaskForm);
    }
    saveTaskEdit(task);
  };

  return (
    <>
      <CardContent>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <TextField
              id="titulo"
              placeholder="Título"
              variant="standard"
              onChange={onChange}
              value={task?.editForm?.titulo || newTaskForm.titulo}
            />
          </Grid>
          <Grid item>
            <TextField
              id="conteudo"
              placeholder="Conteúdo"
              multiline
              onChange={onChange}
              value={task?.editForm?.conteudo || newTaskForm.conteudo}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            aria-label="Clear"
            onClick={props.onCancel || onCancelEditTask}
          >
            <ClearIcon />
          </IconButton>
          <IconButton aria-label="right" onClick={() => onClickSaveButton()}>
            <SaveIcon />
          </IconButton>
        </Box>
      </CardActions>
    </>
  );
};

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
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
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
        </Box>

        <Markdown text={props.task.conteudo} />
      </CardContent>
      <CardActions>
        {props?.type !== 'new' && (
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="left"
              onClick={() => props.onChangeColumn('back')}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              //   color="primary"
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
          </Stack>
        )}
      </CardActions>
    </>
  );
};

const BasicCard = (props: any) => {
  const editable = props.type === 'new' || props.task.editForm;
  return (
    <Card sx={{ minWidth: 200 }} {...props}>
      {editable ? <EditContent {...props} /> : <ViewContent {...props} />}
    </Card>
  );
};

export default BasicCard;
