import React from "react";
import ReactPlayer from "react-player";

type VideoPlayerProps = {
  url: string;
  controls?: boolean;
  width?: string;
  height?: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, controls = true }) => {
  const isDirectVideo = /\.(mp4|mov|webm)(\?.*)?$/.test(url);

  if (isDirectVideo) {
    return (
      <video
        src={url}
        controls={controls}
        controlsList="nodownload"
        style={{ borderRadius: "8px", width: "100%" }}
      />
    );
  }

  // Sinon, fallback vers ReactPlayer (ex: YouTube)
  return (
    <div className="w-full min-h-[400px] aspect-video rounded-lg overflow-hidden">
      <ReactPlayer url={url} controls={controls} width="100%" height="100%" />
    </div>
  );
};

export default VideoPlayer;
