import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export default function HomePage() {
  return (
    <Container style={{ marginTop: '7em' }}>
      <h1>Homepage</h1>
      <h3>
        <Link to={'/activities'}>Go to Activity Dashboard</Link>
      </h3>
    </Container>
  );
}
