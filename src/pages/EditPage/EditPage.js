import React, {useCallback, useEffect, useState} from "react";
import {CreatePageFormContainer} from "../../containers/CreatePageFormContainer";
import {useHistory} from "react-router-dom";
import {Loader} from "../../Components/Loader";

export const EditPage = () => {
  const history = useHistory();

  const currentCatId = history.location.pathname
    .split("/")[history.location.pathname
    .split("/").length - 1];

  const [currentCat, setCurrentCat] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/cats/${currentCatId}`)
      .then(res => res.json())
      .then(data => {
        setCurrentCat(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [currentCatId]);

  const onEditCatHandler = useCallback(editedCat => {
    fetch(`http://localhost:5000/cats/${editedCat.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedCat)
    })
      .catch(console.error);
  }, []);

  return (
    <div className="edit-page container">
      {
        isLoading
          ? <Loader/>
          : <CreatePageFormContainer cat={currentCat}
                                     onSaveCatHandler={onEditCatHandler}
          />
      }
    </div>
  );
};