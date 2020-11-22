import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginatedContent from "../components/PaginatedContent";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [number, setNumber] = useState();
  const [skip, setSkip] = useState(0);
  const [heroFav, setHeroFav] = useState([
    JSON.parse(localStorage.getItem("héros")),
  ]);
  const handleSave = async () => {
    await localStorage.setItem("héros", JSON.stringify(data));
    let hero = JSON.parse(localStorage.getItem("héros"));
    setHeroFav(hero);
  };

  // console.log(heroFav);
  // console.log(skip);
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
    let hero = JSON.parse(localStorage.getItem("héros"));
    setHeroFav(hero);
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  return (
    <>
      {isLoading ? (
        <div className="container">
          <div className="loading_box">
            <span className="loading">
              Recherche des gemmes de l'infini en cours...
            </span>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="box_search">
            <div className="search_bar">
              <span className="recherche">Recherche :</span>
              <input type="text" onChange={handleChange}></input>
            </div>

            <p className="text">Nombre de héros : {number}</p>
          </div>

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
                      onClick={async () => {
                        if (
                          data[index].status === false ||
                          !data[index].status
                        ) {
                          // const copy = [...heroFav];
                          // copy.push({ fav: heroes });
                          // setHeroFav(copy);

                          const another = [...data];
                          another[index].status = true;
                          setData(another);
                          handleSave();
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
          <div>
            <PaginatedContent number={number} setSkip={setSkip} />
          </div>
        </div>
      )}
    </>
  );
};
export default Characters;
