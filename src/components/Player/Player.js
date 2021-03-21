import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
export default function Player({ accesToken, trackUri, bgColor, fontColor }) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accesToken) return null;

  return (
    <SpotifyPlayer
      token={accesToken}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      styles={{
        bgColor: bgColor,
        color: fontColor,
        trackNameColor: fontColor,
        trackArtistColor: fontColor,
        sliderColor: "#800080",
      }}
    />
  );
}
