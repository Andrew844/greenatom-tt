import React, {useCallback, useEffect, useState} from "react";
import {CatsList} from "../../Components/CatsList/CatsList";
import {Loader} from "../../Components/Loader";

export const HomePage = () => {
  const [cats, setCats] = useState([]);

  const fetchCats = useCallback(() => {
    fetch("http://localhost:5000/cats")
      .then(res => res.json())
      .then(data => setCats(data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  return (
    <div className="home container">
      {
        cats.length
          ? <CatsList cats={cats}/>
          : <Loader/>
      }
    </div>
  );
};