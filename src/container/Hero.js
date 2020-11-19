import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hero, setHero] = useState();
  const [comics, setComics] = useState();
  const { id } = useParams();
  console.log(id);
  const fetchData = async () => {
    const response = await axios.get(
      `https://marvel-ts.herokuapp.com/hero?id=${id}`
    );

    const request = await axios.get(
      `https://marvel-ts.herokuapp.com/hero?id=${id}/comics`
    );
    setComics(request.data.data.data.results);
    setHero(response.data.data.data.results[0]);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  console.log(hero);
  if (!id) {
    return <Redirect to="/"></Redirect>;
  } else {
  }
  return (
    <>
      {isLoading ? (
        <span>Chargement en cours...</span>
      ) : (
        <div className="container">
          <div className="hero_global">
            <div className="hero_description">
              <div className="sticky">
                <img
                  src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                  alt="hero"
                ></img>
                <h1>{hero.name}</h1>
                <p>{hero.description}</p>
              </div>
            </div>

            <div className="hero_comics">
              {comics.map((comic, index) => {
                console.log(comic);
                return (
                  <div className="comics_hero" key={index}>
                    <p>{comic.title}</p>
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt="comic"
                    ></img>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
