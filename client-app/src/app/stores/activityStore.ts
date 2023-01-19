import { useQuery } from '@tanstack/react-query';
import { Activity } from './../models/activity';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
  activities: Activity[] = [];
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  isLoading = true;
  error: string = '';
  loading = false;

  constructor() {
    // makeObservable(this, {
    //   title: observable,
    //   setTitle: action,
    // });
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    try {
      const { isLoading, error } = useQuery(
        ['activities'],
        () => agent.Activities.list(),
        {
          onSuccess: (data) => {
            data.map((activity) => {
              activity.date = activity.date.split('T')[0];
              // this.activities.push(activity);
              this.activityRegistry.set(activity.id, activity);
            });
          },
        }
      );

      runInAction(() => {
        this.isLoading = isLoading;
        if (error instanceof Error) {
          this.error = error.message;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // setLoading = (state: boolean) => {
  //   this.isLoading = true;
  // };

  selectActivity = (id: string) => {
    // this.selectedActivity = this.activities.find((a) => a.id === id);
    this.selectedActivity = this.activityRegistry.get(id);
  };
  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };
  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;

    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        // this.activities = [...this.activities.filter(a => a.id !== activity.id),activity] // another way to filter old activity and push the new one
        // this.activities.filter((a) => a.id !== activity.id);
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = true;
      });
    }
  };
  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        if (this.selectedActivity?.id === id) {
          this.cancelSelectedActivity();
        }
        // this.activities = this.activities.filter((a) => a.id !== id);
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}