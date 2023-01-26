import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loading } = activityStore;
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);
  if (loading || !activity) {
    return (
      <>
        <h4>Loading activity if available</h4>
        <LoadingComponent />
      </>
    );
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <GridColumn width={6}>
        <ActivityDetailedSidebar />
      </GridColumn>
    </Grid>
  );
}
export default observer(ActivityDetails);
