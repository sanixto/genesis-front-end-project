import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import { usePage } from './PageContext';
import API from '../../API/api';

function Catalog() {
  const [token] = useToken();

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const [pageInfo, setPageInfo] = usePage();

  const visiblСourses = courses.slice(
    (pageInfo.curPage - 1) * 10,
    pageInfo.curPage * 10
  );

  useEffect(() => {
    if (token)
      API.fetchCourses(token)
        .then((data) => {
          setCourses(data);
          setPageInfo((prev) => ({
            ...prev,
            totalPages: Math.ceil(data.length / 10),
          }));
        })
        .catch((err) => setError(err));
  }, [token]);

  return !error ? (
    <Row xs={1} lg={2} className="g-4">
      {visiblСourses.map((course) => (
        <Col key={course.id}>
          <Card className="course-card">
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
            <Link to={`/${course.id}`} className="stretched-link" />
          </Card>
        </Col>
      ))}
    </Row>
  ) : (
    <h1>{error.message}</h1>
  );
}

export default Catalog;
