import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useToken } from '../TokenContext';
import handlerErrors from '../handlerErrors';

const fetchCourses = (tok) => {
  const url = 'https://api.wisey.app/api/v1/core/preview-courses';

  return fetch(`${url}?${new URLSearchParams({ token: tok })}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(handlerErrors.get(response.status));
      }
      return response.json();
    })
    .then((data) => data.courses);
};

function Catalog() {
  const [token] = useToken();

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const page = 1;
  const visiblСourses = courses.slice((page - 1) * 10, page * 10);

  useEffect(() => {
    if (token)
      fetchCourses(token)
        .then((data) => setCourses(data))
        .catch((err) => setError(err));
  }, [token]);

  return !error ? (
    <Row xs={1} lg={2} className="g-4">
      {visiblСourses.map((course) => (
        <Col key={course.id}>
          <Card style={{ height: '100%' }}>
            <Card.Img
              variant="top"
              src={`${course.previewImageLink}/cover.webp`}
            />
            <Card.Body>
              <Card.Title>{course.title}</Card.Title>
              <Card.Subtitle>{course.rating}&#9733;</Card.Subtitle>
              <Card.Text>Number of lessons: {course.lessonsCount}</Card.Text>
              <Card.Footer>
                <Card.Text>Skills: {course.meta.skills?.join(', ')}</Card.Text>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  ) : (
    <h1>{error.message}</h1>
  );
}

export default Catalog;
