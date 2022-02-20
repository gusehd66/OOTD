import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useAuth from "../../../hooks/auth";
import { registerUser } from "../../../_actions/user_actions";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log("render");
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
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
    </div>
  );
};

export default RegisterPage;
