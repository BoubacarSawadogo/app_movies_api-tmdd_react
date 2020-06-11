import React from "react";

const BASE_URL = "https://www.youtube.com/embed/";

const Video = ({ videoId }) => {
  console.log(videoId);

  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-esponsive-item border border-secondary "
        src={`${BASE_URL}${videoId}`}
      />
    </div>
  );
};

export default Video;
