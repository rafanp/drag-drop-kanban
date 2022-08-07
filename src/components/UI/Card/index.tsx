import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
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

interface TaskContent {
  id?: string;
  conteudo: string;
  titulo: string;
}
const EditContent = (props: any) => {
  const [data, setData] = useState<TaskContent>({ conteudo: '', titulo: '' });

  const onChange = (e: any) => {
    setData((previousData) => ({
      ...previousData,
      [e.target.id]: e.target.value,
    }));
  };

  //   const onClickConfirm = async (data: TaskContent) => {

  //     await props.onConfirm(data);

  //   }

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
              value={data.titulo}
            />
          </Grid>
          <Grid item>
            <TextField
              id="conteudo"
              placeholder="Conteúdo"
              multiline
              onChange={onChange}
              value={data.conteudo}
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
            onClick={props.onCancel || props.switchEditMode}
          >
            <ClearIcon />
          </IconButton>
          <IconButton aria-label="right" onClick={() => props.onConfirm(data)}>
            <SaveIcon />
          </IconButton>
        </Box>
      </CardActions>
    </>
  );
};

const ViewContent = (props: any) => {
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
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props?.task?.titulo}
          </Typography>
          <IconButton aria-label="right" onClick={() => props.switchEditMode()}>
            <EditIcon />
          </IconButton>
        </Box>

        <Typography variant="body2">{props?.task?.conteudo}</Typography>
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
  const [edit, setEdit] = useState(false);
  const editable = props.type === 'new' || edit;
  return (
    <Card sx={{ minWidth: 200 }} {...props}>
      {editable ? (
        <EditContent switchEditMode={() => setEdit(false)} {...props} />
      ) : (
        <ViewContent
          task={props.task}
          switchEditMode={() => setEdit(true)}
          {...props}
        />
      )}

      {/* <CardActions>
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
      </CardActions> */}
    </Card>
  );
};

export default BasicCard;
