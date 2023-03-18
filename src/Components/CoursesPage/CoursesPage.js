import Container from 'react-bootstrap/Container';
import Catalog from './Catalog';
import Pagination from './Pagination';
import { PageProvider } from './PageContext';

function CoursesPage() {
  return (
    <Container>
      <PageProvider>
        <Catalog />
        <Pagination />
      </PageProvider>
    </Container>
  );
}

export default CoursesPage;
