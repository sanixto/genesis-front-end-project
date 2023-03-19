import Hls from 'hls.js';
import Spinner from 'react-bootstrap/Spinner';

function VideoPlayer({ urlVideo, urlPoster }) {
  const video = document.getElementById('video');
  const hls = new Hls();
  hls.loadSource(urlVideo);
  hls.attachMedia(video);

  const handlePlay = (e) => {
    const curVideo = e.target;
    if (!curVideo.readyState) return;
    if (curVideo.paused) curVideo.play();
    else curVideo.pause();
    // alert(curVideo.readyState)
  };

  const handleWaiting = () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
  };

  const handlePlaying = () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
  };

  return (
    <>
      <video
        id="video"
        onClick={handlePlay}
        width="100%"
        poster={urlPoster}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
      >
        <track kind="captions" />
      </video>
      <Spinner
        id="spinner"
        animation="border"
        role="status"
        className="position-relative start-50 bottom-50"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
}

export default VideoPlayer;
