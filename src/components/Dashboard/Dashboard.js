import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Container } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { clientId } from "../Login/Login";
import { TrackSearchResult, Player } from "../";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../theme";
import { GlobalStyles } from "../../global";

const spotifyApi = new SpotifyWebApi({
  clientId,
});

export default function Dashboard({ code, theme, search, setSearch }) {
  const accessToken = useAuth(code);

  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  };

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get("https://spotify-karaoke-server.herokuapp.com/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  const renderPlayer = React.useCallback(
    () => (
      <Player
        accesToken={accessToken}
        trackUri={playingTrack?.uri}
        bgColor={theme === "light" ? lightTheme.body : darkTheme.body}
        fontColor={theme === "light" ? lightTheme.text : darkTheme.text}
      />
    ),
    [theme, accessToken, playingTrack]
  );

  useEffect(() => {
    renderPlayer();
  }, [theme, renderPlayer]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container className="d-flex flex-column py-2" style={{ height: "90vh" }}>
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.url}
              chooseTrack={chooseTrack}
            />
          ))}
          {searchResults.length === 0 && (
            <div className="text-center" style={{ whiteSpace: "pre" }}>
              {lyrics}
            </div>
          )}
        </div>
        <div>{renderPlayer()}</div>
      </Container>
    </ThemeProvider>
  );
}
