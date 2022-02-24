import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useAuth from "../../../hooks/auth";
import { registerUser } from "../../../_actions/user_actions";
import styled from "styled-components";

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 78vh;

  > form {
    display: flex;
    flex-direction: column;
  }

  input {
    border: solid 1px #888;
    /* box-sizing: border-box; */
    &:focus-within {
      outline: solid 2px #1b273f;
      /* outline: none; */
    }
  }

  button {
    cursor: pointer;
  }
`;

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useAuth(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const onEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onNameChange = (event) => {
    setName(event.currentTarget.value);
  };
  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    const body = {
      email,
      password,
      name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        // history("/login");
        history.push("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };
  return (
    <RegisterContainer>
      <form onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailChange} autoFocus />

        <label>Name</label>
        <input type="text" value={name} onChange={onNameChange} />

        <label>Password</label>
        <input
          type="password"
          value={password}
          autoComplete="on"
          onChange={onPasswordChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          autoComplete="on"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </RegisterContainer>
  );
};

export default RegisterPage;
