import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {}

export default function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity } = activityStore;
  if (!activity) {
    return <h5>No actvity to display</h5>;
  }
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date.toString()}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button
            onClick={() => activityStore.openForm(activity.id)}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => activityStore.cancelSelectedActivity()}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
