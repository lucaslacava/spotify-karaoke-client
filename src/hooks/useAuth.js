import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("https://spotify-karaoke-server.herokuapp.com/login", {
        code,
      })
      .then((res) => {
        const {
          accessToken: accessTokenData,
          refreshToken: refreshTokenData,
          expiresIn: expiresInData,
        } = res.data;
        setAccessToken(accessTokenData);
        setRefreshToken(refreshTokenData);
        setExpiresIn(expiresInData);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("https://spotify-karaoke-server.herokuapp.com/refresh", {
          refreshToken,
        })
        .then((res) => {
          console.log(res.data);
          const {
            accessToken: accessTokenData,
            expiresIn: expiresInData,
          } = res.data;
          setAccessToken(accessTokenData);
          setExpiresIn(expiresInData);
          window.history.pushState({}, null, "/");
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
