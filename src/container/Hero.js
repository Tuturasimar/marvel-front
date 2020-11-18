import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hero, setHero] = useState();
  const location = useLocation();
  console.log(location);

  const id = location.state.id;

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3100/hero?id=${id}`);

    setHero(response.data.data.data.results[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  console.log(hero);

  return (
    <>
      {isLoading ? (
        <span>Chargement en cours...</span>
      ) : (
        <div>
          <div>
            <h1>{hero.name}</h1>
            <p>{hero.description}</p>
            <img
              src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
              alt="hero"
            ></img>

            <div>
              {hero.stories.items.map((comics, index) => {
                return (
                  <div key={index}>
                    <p>{comics.name}</p>
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
