import { ListGroup } from 'react-bootstrap';

function LessonsList({ lessons, courseId, setCurLesson }) {
  const handleListClick = (lesson) => {
    if (lesson?.status === 'unlocked') {
      localStorage.setItem(courseId, JSON.stringify(lesson));
      setCurLesson(lesson);
    }
  };

  return (
    <ListGroup>
      <h4 className="mt-3">Lessons: {lessons?.length}</h4>
      {lessons?.map((lesson) => (
        <ListGroup.Item
          as="li"
          key={lesson.id}
          action={lesson?.status === 'unlocked'}
          className={`my-2 ${
            lesson?.status === 'locked' && 'opacity-50 locked-lesson'
          }`}
          onClick={() => handleListClick(lesson)}
        >
          <span>
            Lesson {lesson?.order}: {lesson?.title}
          </span>
          {lesson?.status === 'locked' && (
            <strong className="hidden"> Locked</strong>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default LessonsList;
