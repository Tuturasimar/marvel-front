import React from "react";
import { Link } from "react-router-dom";

const Favoris = () => {
  const hero_fav = JSON.parse(localStorage.getItem("héros"));
  const comic_fav = JSON.parse(localStorage.getItem("comics"));

  return (
    <div className="container">
      <h1 className="fav">Héros favoris</h1>
      <div className="heroes_box">
        {hero_fav ? (
          hero_fav.map((hero, index) => {
            if (hero.status)
              return (
                <>
                  <div className="hero_box" key={index}>
                    <Link className="link" to={`/hero/${hero.id}`}>
                      <p>{hero.name}</p>

                      <img
                        src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                        alt="hero"
                      ></img>
                    </Link>
                  </div>
                </>
              );
          })
        ) : (
          <p style={{ paddingLeft: "30px" }}>
            Il n'y a aucun héros en favori pour le moment.
          </p>
        )}
      </div>

      <h1 className="fav">Comics favoris</h1>
      <div className="heroes_box">
        {comic_fav ? (
          comic_fav.map((comic, index) => {
            if (comic.status) {
              return (
                <>
                  <div key={index} className="box_comics">
                    <div className="comic_box">
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt="hero"
                      ></img>
                      <div className="comic_description">
                        <h2>{comic.title}</h2>
                        <p>{comic.description}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          })
        ) : (
          <p style={{ paddingLeft: "30px" }}>
            Il n'y a aucun comics en favori pour le moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Favoris;
