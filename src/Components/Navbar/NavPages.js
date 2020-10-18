import React from "react";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "../../pages/HomePage/HomePage";
import {CreatePage} from "../../pages/CreatePage/CreatePage";
import {EditPage} from "../../pages/EditPage/EditPage";
import {ShowPage} from "../../pages/ShowPage/ShowPage";

export const NavPages = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage/>
      </Route>
      <Route path="/create" exact>
        <CreatePage/>
      </Route>
      <Route path="/edit/:id">
        <EditPage/>
      </Route>
      <Route path="/show/:id">
        <ShowPage/>
      </Route>
    </Switch>
  )
}