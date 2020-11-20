import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [number, setNumber] = useState();
  const [skip, setSkip] = useState(0);
  const [heroFav, setHeroFav] = useState([]);
  let tab = [];
  for (let i = 1; i <= Math.ceil(number / 100); i++) {
    tab.push(i);
  }

  const handleChange = async (event) => {
    if (event.target.value !== "") {
      const value = event.target.value;
      const response = await axios.get(
        `https://marvel-ts.herokuapp.com/search?value=${value}`
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
      `https://marvel-ts.herokuapp.com/pick?skip=${skip}`
    );
    setNumber(response.data.data.data.total);
    setData(response.data.data.data.results);
    setIsLoading(false);
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, [skip]);

  return (
    <>
      {isLoading ? (
        <span>Chargement en cours...</span>
      ) : (
        <div className="container">
          <div className="search_bar">
            <span className="recherche">Recherche :</span>
            <input type="text" onChange={handleChange}></input>
          </div>

          <p>Nombre de héros : {number}</p>
          <div className="heroes_box">
            {data.map((heroes, index) => {
              return (
                <>
                  <div className="hero_box" key={index}>
                    <Link className="link" to={`/hero/${heroes.id}`}>
                      <p>{heroes.name}</p>

                      <img
                        src={`${heroes.thumbnail.path}.${heroes.thumbnail.extension}`}
                        alt="hero"
                      ></img>
                    </Link>
                    <div
                      className="circle"
                      onClick={() => {
                        if (
                          data[index].status === false ||
                          !data[index].status
                        ) {
                          const copy = [...heroFav];
                          copy.push({ fav: heroes });
                          setHeroFav(copy);
                          const another = [...data];
                          another[index].status = true;
                          setData(another);
                        } else {
                          const copy = [...data];
                          copy[index].status = false;
                          setData(copy);
                        }
                      }}
                    >
                      {data[index].status ? (
                        <FontAwesomeIcon
                          icon="heart"
                          style={{ color: "red" }}
                        />
                      ) : (
                        <FontAwesomeIcon icon="heart" />
                      )}
                    </div>
                  </div>
                </>
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
export default Characters;
