import { useContext, useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import SaveIcon from '@mui/icons-material/Save';
import { Grid, TextField } from '@mui/material';
import { KanbanContext } from '../../contexts/kanban/provider';
import { KanbanContextType } from '../../@types/task';
import { FlexContainer } from './styles';

interface TaskContent {
  id?: string;
  content: string;
  title: string;
}

const EditContent = (props: any) => {
  const [newTaskForm, setNewTaskForm] = useState<TaskContent>({
    content: '',
    title: '',
  });
  const [errors, setErrors] = useState({ content: false, title: false });
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

  const validateFormsField = (form: TaskContent) => {
    const errors = {
      content: !form.content,
      title: !form.title,
    };

    if (errors.content || errors.title) {
      setErrors(errors);
    }

    return errors.content || errors.title;
  };

  const onCancelEditTask = () => {
    const newValue = { ...props.task };
    delete newValue.editForm;
    onChangeTaskState(newValue);
  };

  const onClickSaveButton = () => {
    if (props.onConfirm) {
      if (validateFormsField(newTaskForm)) {
        return;
      }

      return props.onConfirm(newTaskForm);
    }

    if (validateFormsField(task.editForm)) {
      return;
    }

    saveTaskEdit(task);
  };

  return (
    <>
      <CardContent>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <TextField
              id="title"
              placeholder="Title"
              variant="standard"
              onChange={onChange}
              value={task?.editForm?.title || newTaskForm.title}
              fullWidth
              error={errors.title}
              helperText={errors.title && 'Required field'}
            />
          </Grid>
          <Grid item>
            <TextField
              id="content"
              placeholder="Content"
              multiline
              onChange={onChange}
              value={task?.editForm?.content || newTaskForm.content}
              fullWidth
              rows={8}
              error={errors.content}
              helperText={errors.content && 'Required field'}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <FlexContainer>
          <IconButton
            aria-label="Clear"
            onClick={props.onCancel || onCancelEditTask}
          >
            <ClearIcon />
          </IconButton>
          <IconButton aria-label="right" onClick={() => onClickSaveButton()}>
            <SaveIcon />
          </IconButton>
        </FlexContainer>
      </CardActions>
    </>
  );
};

export default EditContent;
