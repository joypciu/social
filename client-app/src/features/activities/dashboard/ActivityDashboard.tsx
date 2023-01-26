import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { ActivityFilters } from './ActivityFilters';
import ActivityList from './ActivityList';

function ActivityDashboard() {
  const { activityStore } = useStore();
  activityStore.loadActivities();

  if (activityStore.isLoading) {
    return <LoadingComponent />;
  }
  if (activityStore.error !== '') {
    return <h2>An error has occured {activityStore.error}</h2>;
  }
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
