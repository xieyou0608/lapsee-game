import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Alert, Button, styled } from "@mui/material";
import AdminService from "../../services/Admin.service";

const LoginForm = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 3vh;
  padding: 5vh;
  background-color: white;
  border: 1vmin solid black;
  border-radius: 2vmin;
`;

const Login = ({ setUser }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    try {
      const res = await AdminService.login(email, password);
      console.log(res);
      const user = res.data;
      console.log(user);
      localStorage.setItem("lapsee_user", JSON.stringify(user));
      setUser(user);
    } catch (e) {
      console.log(e);
      setErrorMsg(e.response.data.error.message);
    }
  };

  return (
    <LoginForm onSubmit={loginHandler}>
      <h1>管理員登入</h1>
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <TextField label="帳號" inputRef={emailRef} />
      <TextField label="密碼" inputRef={passwordRef} type="password" />
      <Button type="submit">登入</Button>
    </LoginForm>
  );
};

export default Login;
