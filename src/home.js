import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "./context";
import "../src/sass/style.scss";
import { TextField, Button } from "@mui/material";

const Home = () => {
  const { state, dispatch } = useContext(context);
  const [newuser, setNewUser] = useState(state.arr);
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  let filter = () => {
    setShow(!show);
    if (show === true) {
      let userFilter = newuser.filter((val) => {
        return val.isComplete === true;
      });
      setNewUser(userFilter);
    }
  };
  let editDetails = (data, index) => {
    let editUser = newuser.filter((value, i) => {
      return index === i && value.id === data.id
        ? (value.isComplete = !value.isComplete)
        : value;
    });
    console.log("editUser", editUser);
    let uploadEdit = state.arr.map((value) => {
      return value.id === data.id ? data : value;
    });
    dispatch({ type: "edit", payload: uploadEdit });
    setNewUser(editUser);
  };
  let reUse = (val) => {
    navigate(`/form?id=${val.id}`);
  };
  let deleteUser = (data) => {
    let remove = state.arr.filter((value) => {
      return data.id !== value.id ? value : "";
    });
    setNewUser(remove);
    dispatch({ type: "delete", payload: remove });
  };
  let search = (event) => {
    let getSearch = event.target.value;
    let sendOff = state.arr.filter((val) => {
      if (getSearch.toLowerCase() === val.name.toLowerCase()) {
        return val;
      } else if (getSearch.toLowerCase() === "") {
        return val;
      }
    });
    setNewUser(sendOff);
  };
  return (
    <div style={{ padding: "10px" }}>
      <Link
        to="/form"
        style={{
          textDecoration: "none",
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "5px 10px",
          color: "blue",
          margin: "10px",
          display: "inline-block",
        }}
      >
        Form
      </Link>
      <TextField type="text" label="search" onChange={search} />
      <div className="parent">
        <Button
          variant="contained"
          className="child"
          onClick={() => {
            return setShow(!show), setNewUser(state.arr);
          }}
        >
          All
        </Button>
        <Button variant="contained" className="child" onClick={() => filter()}>
          Complete
        </Button>
        <Button
          variant="contained"
          className="child"
          onClick={() => {
            return (
              localStorage.setItem("login", JSON.stringify(false)),
              navigate("/")
            );
          }}
        >
          Logout
        </Button>
      </div>
      {show &&
        newuser.map((val, i) => {
          return (
            <div key={i}>
              <h5>Id: {val.id}</h5>
              <h5>Name: {val.name}</h5>
              <h5>Description: {val.descripe}</h5>
              <label style={{ fontWeight: "bold" }}>IsComplete</label>
              <input
                type="checkbox"
                checked={val.isComplete}
                onChange={() => editDetails(val, i)}
              />
              <div style={{ padding: "5px 10px" }}>
                <Button
                  variant="contained"
                  style={{ display: "inline-block", margin: "10px" }}
                  onClick={() => reUse(val)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  style={{ display: "inline-block", margin: "10px" }}
                  onClick={() => deleteUser(val)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
