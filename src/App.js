import "./App.css";
import React, { useReducer } from "react";
import Home from "./home.js";
import Form from "./form.js";
import Login from "./login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { context } from "./context.js";
import { setUser, userDetails } from "./reducer";

function App() {
  const [state, dispatch] = useReducer(setUser, userDetails);
  // console.log("app", state);
  return (
    <context.Provider value={{ state, dispatch }}>
      {state.newUser ? (
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path={"/form"} element={<Form />} />
            <Route path={"/home"} element={<Home />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path={"*"} element={<Navigate to={"/"}></Navigate>} />
          </Routes>
        </BrowserRouter>
      )}
    </context.Provider>
  );
}

export default App;
