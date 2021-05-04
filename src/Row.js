import instance from "./axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer'
// =============================
const base_url = "https://image.tmdb.org/t/p/original";
const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl] = useState('')
  useEffect(() => {
    async function fetchData() {
      const req = await instance.get(fetchURL);
      setMovies(req.data.results);
      return req;
    }
    fetchData();
  }, [fetchURL]);
  const handleClick = (movie) => {
    if(trailerUrl){
      setTrailerUrl('')
    }
    else {
      movieTrailer(movie?.title ||
        movie?.name ||
        movie?.original_name ||
        movie?.original_title )
      .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search)
        setTrailerUrl(urlParams.get('v'))
      })
      .catch(err => alert('Không tìm thấy thông tin của phim này!'))
    }
  }
  const opts = {
    height:"390",
    width:"100%",
    playerVars:{
      autoplay:1,
    }
  }
  const handleModal = () => {
    setTrailerUrl('')
  }
  return (
    <div className="row" style={{ color: isLargeRow ? "#e50914" : "#fff" }}>
      <h2>{title}</h2>
      <div className="row__posters">
        <>
          {movies.map((movie) => (
            <img
              onClick={() => handleClick(movie)}
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.poster_path}
            />
          ))}
        </>
      </div>
      {
        trailerUrl && <div className="modal" onClick={handleModal}>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div> 
      }

    </div>
  );
};

export default Row;
