import Card from '@mui/material/Card';
import EditContent from './EditContent';
import ViewContent from './ViewContent';

const TaskCard = (props: any) => {
  const editable = props.type === 'new' || props.task.editForm;
  return (
    <Card sx={{ minWidth: 360 }} {...props}>
      {editable ? <EditContent {...props} /> : <ViewContent {...props} />}
    </Card>
  );
};

export default TaskCard;
