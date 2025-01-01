import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

interface BackgroundVideoProps {
  localVideoUrl?: string;
  youtubeId?: string;
  fallbackImageUrl: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  localVideoUrl,
  youtubeId,
  fallbackImageUrl,
}) => {
  const [useYoutube, setUseYoutube] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Si nous avons une vidéo locale, essayons de la charger d'abord
    if (localVideoUrl) {
      const video = document.createElement('video');
      video.src = localVideoUrl;
      video.onloadeddata = () => {
        setIsVideoLoaded(true);
      };
      video.onerror = () => {
        console.log('Erreur de chargement de la vidéo locale, passage à YouTube');
        setUseYoutube(true);
      };
    } else if (youtubeId) {
      setUseYoutube(true);
    }
  }, [localVideoUrl, youtubeId]);

  const youtubeOpts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      mute: 1,
      playlist: youtubeId, // Nécessaire pour la lecture en boucle
    },
  };

  return (
    <div className="background-video-container">
      {!useYoutube && localVideoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`background-video ${isVideoLoaded ? 'loaded' : ''}`}
          poster={fallbackImageUrl}
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={localVideoUrl} type="video/mp4" />
        </video>
      )}

      {useYoutube && youtubeId && (
        <div className={`youtube-container ${isVideoLoaded ? 'loaded' : ''}`}>
          <YouTube
            videoId={youtubeId}
            opts={youtubeOpts}
            className="youtube-video"
            onReady={() => setIsVideoLoaded(true)}
          />
        </div>
      )}

      <div className="video-overlay" />
    </div>
  );
};
