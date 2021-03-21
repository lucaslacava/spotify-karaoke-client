import React from "react";
import { Container } from "react-bootstrap";

export const clientId = "8117b44d58db42d4827222362b23a282";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=https://spotify-karaoke.vercel.app&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function Login({ isLogged }) {
  return (
    <Container className="align-items-center">
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        {isLogged ? "Get me out" : "Login With Spotify"}
      </a>
    </Container>
  );
}
