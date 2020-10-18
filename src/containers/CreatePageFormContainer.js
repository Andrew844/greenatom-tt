import React, {useCallback, useState} from "react";
import {Loader} from "../Components/Loader";

export const CreatePageFormContainer = ({onSaveCatHandler, loading, cat}) => {
  const [form, setForm] = useState(cat ? cat : {});

  const onChangeFormHandler = useCallback(e => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  }, [form]);

  const getBase64 = useCallback(e => {
    const filesSelected = e.target.files;

    if (filesSelected.length > 0) {
      const fileToLoad = filesSelected[0];
      const fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        setForm({
          ...form,
          img: fileLoadedEvent.target.result
        });
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  }, [form]);

  return (
    <form>
      {
        form.img
          ? <img src={form.img} alt=""/>
          : ""
      }
      <div className="form-group">
        <input type="file"
               className="form-control-file"
               id="inputFileToLoad"
               onChange={getBase64}/>
      </div>
      <div className="form-group">
        <label htmlFor="name">Кличка</label>
        <input type="text"
               className="form-control"
               id="name"
               onChange={onChangeFormHandler}
               defaultValue={form.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Описание</label>
        <input type="text"
               className="form-control"
               id="description"
               onChange={onChangeFormHandler}
               defaultValue={form.description}
        />
      </div>
      {
        loading
          ? <Loader/>
          : <button className="btn btn-primary"
                    onClick={() => onSaveCatHandler({
                      ...form
                    })}
          >Сохранить</button>
      }
    </form>
  );
};