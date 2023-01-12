import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../../models/activity';
import Navbar from './Navbar';
import { v4 as uuid } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { isLoading, error } = useQuery(
    ['activities'],
    () =>
      axios
        .get<Activity[]>('http://localhost:5000/api/activities')
        .then((response) => {
          return response.data;
        }),
    {
      // onSuccess(data) {
      //   setActivities(data);
      // },
      onSettled(data, error) {
        setActivities(data!);
        if (error) {
          throw new Error('fetching not successfull');
        }
      },
    }
  );

  // let activities: Activity[] = data ?? [];

  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState(false);
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities?.find((x) => x.id === id));
  }
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }
  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id != activity.id),
          activity,
        ])
      : setActivities([...activities!, { ...activity, id: uuid() }]);

    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)]);
  }

  if (isLoading) {
    return <h2>Loading....</h2>;
  }
  if (error instanceof Error) {
    return <h2>An error has occured {error.message}</h2>;
  }

  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        {activities && (
          <ActivityDashboard
            activities={activities!}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity={handleDeleteActivity}
          />
        )}
      </Container>
    </>
  );
}

export default App;
