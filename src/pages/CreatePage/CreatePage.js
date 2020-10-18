import React, {useCallback, useState} from "react";
import {CreatePageFormContainer} from "../../containers/CreatePageFormContainer";
import "./CreatePage.css";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSaveCatHandler = useCallback(async (form) => {
    if (form.img && form.description && form.name) {
      setLoading(true);
      await fetch("http://localhost:5000/cats", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          ...form,
          like: 0
        })
      })
        .catch(console.error);
      setLoading(false);
      history.push("/");
    }
  }, [history]);

  return (
    <div className="create-page container">
      <div className="row">
        <CreatePageFormContainer onSaveCatHandler={onSaveCatHandler}
                                 loading={loading}
        />
      </div>
    </div>
  );
};