import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Loader} from "../../Components/Loader";
import {capitalizeFirstLetterInSentence} from "../../utils/utils";
import "./ShowPage.css";

export const ShowPage = () => {
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

  const onEditBtnClickHandler = useCallback(id => {
    history.push(`/edit/${id}`);
  }, [history]);

  const onDeleteHandler = useCallback( id => {
   fetch(`http://localhost:5000/cats/${id}`, {
      method: "DELETE"
    })
     .then(() => {
       setIsLoading(true);
       history.push("/");
       window.location.reload();
       setIsLoading(false);
     })
     .catch(console.error);
  }, [history]);

  return (
    <div className="edit-page container">
      <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1"
           aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Вы действительно хотите удалить котика?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
              <button type="button" className="btn btn-danger" onClick={() => onDeleteHandler(currentCat.id)}>Удалить</button>
            </div>
          </div>
        </div>
      </div>

      <div className="action-btns">
        <button className="btn btn-danger" data-toggle="modal" data-target="#staticBackdrop">
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
        <button className="btn btn-primary" onClick={() => onEditBtnClickHandler(currentCat.id)}>
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
        </button>
      </div>
      {
        isLoading
          ? <Loader/>
          : (
            <div className="cat">
              <img src={currentCat.img} alt=""/>
              <p>{currentCat.name}</p>
              <p>{capitalizeFirstLetterInSentence(currentCat.description)}</p>
            </div>
          )
      }
    </div>
  );
};