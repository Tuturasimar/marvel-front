import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3100/pick");

    setData(response.data.data.data.results);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <span>Chargement en cours...</span>
      ) : (
        <div>
          <div className="heroes_box">
            {data.map((heroes, index) => {
              return (
                <Link
                  key={index}
                  className="hero_box"
                  to={{
                    pathname: "/hero",
                    state: { id: heroes.id },
                  }}
                >
                  <p>{heroes.name}</p>
                  <p>{heroes.description}</p>
                  <img
                    src={`${heroes.thumbnail.path}.${heroes.thumbnail.extension}`}
                    alt="hero"
                  ></img>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Characters;
