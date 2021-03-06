import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginatedContent from "../components/PaginatedContent";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [number, setNumber] = useState();
  const [skip, setSkip] = useState(0);
  const [comicFav, setComicFav] = useState([]);

  let tab = [];
  for (let i = 1; i <= Math.ceil(number / 100); i++) {
    tab.push(i);
  }

  const handleSave = async () => {
    await localStorage.setItem("comics", JSON.stringify(data));
    let comic = JSON.parse(localStorage.getItem("comics"));
    setComicFav(comic);
  };

  const handleChange = async (event) => {
    if (event.target.value !== "") {
      const value = event.target.value;
      const response = await axios.get(
        `https://marvel-ts.herokuapp.com/research?value=${value}`
      );
      setData(response.data.data.data.results);
      setNumber(response.data.data.data.total);
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
    let comic = JSON.parse(localStorage.getItem("comics"));
    setComicFav(comic);
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
            <p className="text">Nombre de comics : {number}</p>
          </div>
          <div className="heroes_box">
            {data.map((comics, index) => {
              return (
                <div key={index} className="box_comics">
                  <div className="comic_box">
                    <img
                      src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                      alt="hero"
                    ></img>
                    <div
                      className="circle2"
                      onClick={async () => {
                        if (
                          data[index].status === false ||
                          !data[index].status
                        ) {
                          // const copy = [...comicFav];
                          // copy.push({ fav: comics });
                          // setComicFav(copy);
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
                    <div className="comic_description">
                      <h2>{comics.title}</h2>
                      <p>{comics.description}</p>
                    </div>
                  </div>
                </div>
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
export default Comics;
