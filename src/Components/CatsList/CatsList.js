import React, {useCallback, useState} from "react";
import {CatCard} from "../CatCard/CatCard";
import {useHistory} from "react-router-dom";

export const CatsList = ({cats}) => {
  const [catsArr, setCatsArr] = useState(cats);
  const history = useHistory();

  const onFingerClickHandler = useCallback((cat, sign) => {
    const newCat = {
      ...cat,
      like: sign === "+" ? cat.like + 1 : cat.like - 1
    };

    fetch(`http://localhost:5000/cats/${cat._id ? cat._id : cat.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(newCat)
    })
      .then(res => res.json())
      .then(data => {
        const editedCat = catsArr.find(({id}) => id === data.id);
        const editedCatIdx = catsArr.indexOf(editedCat);

        setCatsArr([
          ...catsArr.slice(0, editedCatIdx),
          data,
          ...catsArr.slice(editedCatIdx + 1)
        ]);
      })
      .catch(console.error);
  }, [catsArr]);

  const onCardClickHandler = useCallback(id => {
    history.push(`/show/${id}`);
  }, [history]);

  return (
    <div className="row">
      {
        catsArr.map(cat => <CatCard cat={cat}
                                    onFingerClickHandler={onFingerClickHandler}
                                    onCardClickHandler={onCardClickHandler}
                                    key={cat._id ? cat._id : cat.id}
        />)
      }
    </div>
  );
};