import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useAuth from "../../../hooks/auth";
import { loginUser } from "../../../_actions/user_actions";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useAuth(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const onEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const body = {
      email,
      password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        history.push("/");
      } else {
        alert("Error");
      }
    });
  };
  return (
    <LoginContainer>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          autoFocus
          value={email}
          onChange={onEmailChange}
          style={{ fontFamily: "sans-serif" }}
        />

        <label>Password</label>
        <input
          type="password"
          autoComplete="on"
          value={password}
          onChange={onPasswordChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </LoginContainer>
  );
};

export default LoginPage;
