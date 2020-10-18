import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Navbar} from "./Components/Navbar/Navbar";
import {NavPages} from "./Components/Navbar/NavPages";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <NavPages/>
      </Router>
    </div>
  );
}

export default App;
