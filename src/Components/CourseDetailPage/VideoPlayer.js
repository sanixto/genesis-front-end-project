import Hls from 'hls.js';

function VideoPlayer({ urlVideo, urlPoster }) {
  const video = document.getElementById('video');
  const hls = new Hls();
  hls.loadSource(urlVideo);
  hls.attachMedia(video);

  const handlePlay = (e) => {
    const curVideo = e.target;
    if (curVideo.paused) curVideo.play();
    else curVideo.pause();
  };

  return (
    <video id="video" onClick={handlePlay} width="100%" poster={urlPoster}>
      <track kind="captions" />
    </video>
  );
}

export default VideoPlayer;
