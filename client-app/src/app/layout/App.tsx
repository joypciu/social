import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Navbar from './Navbar';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';

function App() {
  const { activityStore } = useStore();
  activityStore.loadActivities();

  if (activityStore.isLoading) {
    return <LoadingComponent />;
  }
  if (activityStore.error !== '') {
    return <h2>An error has occured {activityStore.error}</h2>;
  }

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
