import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import getDetails from "./login.json";
import { TextField, Button } from "@mui/material";

let checkUser = getDetails;

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correctionEmail, setCorrectionEmail] = useState(false);
  const [correctionPassword, setCorrectionPassword] = useState(false);

  let checking = (event) => {
    event.preventDefault();
    checkUser.forEach((val) => {
      if (val.email === email && val.password === password) {
        navigate("./form");
        localStorage.setItem("login", JSON.stringify(true));
      }
      if (val.email !== email || email === "") {
        setCorrectionEmail(true);
      }
      if (val.password !== password || password === "") {
        setCorrectionPassword(true);
      }
    });
  };
  return (
    <div>
      <h1 className="w-50 text-center">login</h1>
      <form>
        <div>
          <div style={{ padding: "10px" }}>
            <TextField
              label="E-mail"
              variant="outlined"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {correctionEmail && <p>email is worng</p>}
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              onChange={(e) => setPassword(parseInt(e.target.value))}
            />
            {correctionPassword && <p>password is worng</p>}
          </div>
        </div>
        <div style={{ padding: "10px" }}>
          <Button
            className="ps-3 pe-3 pt-2 pb-2"
            onClick={(e) => checking(e)}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
