import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Header, List, Button } from 'semantic-ui-react';

function App() {
  // const [activities, setActivities] = useState([]);
  const { isLoading, data, error, isFetched } = useQuery(
    ['activities'],
    () =>
      axios
        .get('http://localhost:5000/api/activities')
        .then((response) => response.data),
    {
      refetchInterval: 360 * 100,
    }
  );
  let activities = data ?? [];
  if (isLoading) {
    return <h2>Loading....</h2>;
  }
  if (error instanceof Error) {
    return <h2>An error has occured {error.message}</h2>;
  }

  return (
    <div>
      <Header as='h2' icon='users' content='Social' />
      <List>
        {activities.length > 0 &&
          activities.map((activity: any) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
      </List>
      <Button content='click' />
    </div>
  );
}

export default App;
