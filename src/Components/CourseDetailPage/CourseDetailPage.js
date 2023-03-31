import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useToken } from '../../TokenContext';
import VideoPlayer from './VideoPlayer';
import LessonsList from './LessonsList';
import API from '../../API/api';

const setLesson = (courseId, lesson, setLessonState) => {
  localStorage.setItem(courseId, JSON.stringify(lesson));
  setLessonState(lesson);
};

function CourseDetailPage() {
  const [token] = useToken();
  const { courseId } = useParams();

  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);

  const [curLesson, setCurLesson] = useState(null);

  useEffect(() => {
    const lesson = JSON.parse(localStorage.getItem(courseId));
    setCurLesson(lesson);
  }, []);

  useEffect(() => {
    if (token)
      API.fetchCourse(token, courseId)
        .then((data) => {
          setCourse(data);
          if (!curLesson) setLesson(courseId, data.lessons[0], setCurLesson);
        })
        .catch((err) => setError(err));
  }, [token, courseId]);

  const lessons = course?.lessons;
  const urlVideo = curLesson?.link;
  const urlPoster = `${curLesson?.previewImageLink}/lesson-${curLesson?.order}.webp`;

  return !error ? (
    <Container>
      <Row>
        <Col>
          <h2>{course?.title}</h2>
          <em>
            <strong>{course?.rating}&#9733;</strong>
          </em>
          <h3>About this course</h3>
          <p>{course?.description}</p>
          <pre>
            Skills: {'\n'}
            {course?.meta?.skills?.join('\n')}
          </pre>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center mt-3">
            Lesson {curLesson?.order}: {curLesson?.title}
          </h4>
          {curLesson?.type === 'video' && (
            <VideoPlayer urlVideo={urlVideo} urlPoster={urlPoster} />
          )}
        </Col>
      </Row>
      <Row>
        <LessonsList
          lessons={lessons}
          courseId={courseId}
          setCurLesson={setCurLesson}
        />
      </Row>
    </Container>
  ) : (
    <h1>{error.message}</h1>
  );
}

export default CourseDetailPage;
