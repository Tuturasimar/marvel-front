import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [number, setNumber] = useState();
  const [skip, setSkip] = useState(0);

  let tab = [];
  for (let i = 1; i <= Math.ceil(number / 100); i++) {
    tab.push(i);
  }

  const handleChange = async (event) => {
    if (event.target.value !== "") {
      const value = event.target.value;
      const response = await axios.get(
        `https://marvel-ts.herokuapp.com/research?value=${value}`
      );
      setData(response.data.data.data.results);
      setNumber(response.data.data.data.total);

      console.log(response);
    } else {
      fetchData();
    }
  };

  const fetchData = async () => {
    const response = await axios.get(
      `https://marvel-ts.herokuapp.com/comics?skip=${skip}`
    );
    setNumber(response.data.data.data.total);
    setData(response.data.data.data.results);

    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [skip]);

  return (
    <>
      {isLoading ? (
        <span>Chargement en cours...</span>
      ) : (
        <div className="container">
          <div className="box_search">
            <div className="search_bar">
              <span className="recherche">Recherche :</span>
              <input type="text" onChange={handleChange}></input>
            </div>
            <p className="text">Nombre de comics : {number}</p>
          </div>
          <div className="heroes_box">
            {data.map((comics, index) => {
              console.log(comics);
              return (
                <Link
                  key={index}
                  className="hero_box"
                  to={`/comics/${comics.id}`}
                >
                  <p>{comics.title}</p>
                  <img
                    src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                    alt="hero"
                  ></img>
                </Link>
              );
            })}
          </div>
          <div className="boutons">
            {tab.map((page, index) => {
              return (
                <div className="pagination" key={index}>
                  <button
                    onClick={() => {
                      if (page === 1) {
                        setSkip(0);
                      } else {
                        setSkip(page * 100 - 100);
                      }
                    }}
                  >
                    {page}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Comics;
