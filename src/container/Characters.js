import React, { useEffect, useState } from "react";
import axios from "axios";

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
              console.log(heroes);
              return (
                <div key={index} className="hero_box">
                  <p>{heroes.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Characters;
