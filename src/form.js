import React, { useEffect, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { context } from "./context";
import { TextField, Button } from "@mui/material";

const Form = () => {
  let [params] = useSearchParams();
  const { state, dispatch } = useContext(context);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [descripe, setDescripe] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [detail, setDetail] = useState(state.arr || []);
  let submit = (e) => {
    e.preventDefault();
    if (parseInt(params.get("id"))) {
      let newObj = {
        id: id,
        name: name,
        descripe: descripe,
        isComplete: isComplete,
      };
      let updateUserArray = state.arr.map((value) => {
        return value.id === parseInt(params.get("id")) ? newObj : value;
      });
      dispatch({ type: "updateDetails", payload: updateUserArray });
    } else {
      let newObj = {
        id: id,
        name: name,
        descripe: descripe,
        isComplete: isComplete,
      };
      setDetail([...detail, newObj]);
    }
    setId("");
    setName("");
    setDescripe("");
    setIsComplete(false);
  };

  useEffect(() => {
    if (parseInt(params.get("id")) !== undefined) {
      let updateUser = state.arr.filter((value) => {
        return parseInt(value.id) === parseInt(params.get("id"));
      });
      updateUser.map((val) => {
        return (
          setId(val.id),
          setName(val.name),
          setDescripe(val.descripe),
          setIsComplete(val.isComplete)
        );
      });
    }
  }, [params]);

  useEffect(() => {
    dispatch({ type: "updateDetails", payload: detail });
  }, [detail]);

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <form>
          <div style={{ padding: "10px" }}>
            <TextField
              label="S.no"
              variant="outlined"
              type="text"
              value={id}
              onChange={(e) => setId(parseInt(e.target.value))}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              label="Description"
              variant="outlined"
              type="text"
              value={descripe}
              onChange={(e) => setDescripe(e.target.value)}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <input
              type="checkbox"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.target.checked)}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <Button variant="contained" onClick={submit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
      <Link
        to="/home"
        style={{
          textDecoration: "none",
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "5px 10px",
          color: "blue",
        }}
      >
        Home
      </Link>
    </div>
  );
};

export default Form;
