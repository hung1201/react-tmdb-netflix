import React, { useEffect, useState } from "react";
import instance from "./axios";
import requests from "./requests";
import "./Banner.css";
const base_url = "https://image.tmdb.org/t/p/original";
const Banner = () => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    async function fetchData() {
      const req = await instance.get(requests.fetchTrending);
      setMovie(
        req.data.results[Math.floor(Math.random() * req.data.results.length)]
      );
      return req;
    }
    fetchData();
  }, []);
  console.log(movie);
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}>
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title ||
            movie?.name ||
            movie?.original_name ||
            movie?.original_title}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h2 className="banner__description">{movie?.overview}</h2>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
