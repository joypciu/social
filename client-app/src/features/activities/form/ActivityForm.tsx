import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';

interface Props {
  activity: undefined | Activity;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}
export default function ActivityForm({
  activity: selectedActivity,
  closeForm,
  createOrEdit,
}: Props) {
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    city: '',
    date: new Date(),
    venue: '',
  };
  const [activity, setActivity] = useState(initialState);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // event.preventDefault();
    createOrEdit(activity);
  }
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input
          placeholder='Title'
          value={activity.title}
          name='title'
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          value={activity.description}
          name='description'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Category'
          value={activity.category}
          name='category'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Date'
          value={activity.date}
          name='date'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          value={activity.city}
          name='city'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Venue'
          value={activity.venue}
          name='venue'
          onChange={handleInputChange}
        />
        <Button floated='right' positive type='submit' content='submit' />
        <Button
          onClick={closeForm}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
}
