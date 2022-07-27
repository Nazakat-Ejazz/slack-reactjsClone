import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => console.log({ result }))
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2111/2111615.png"
          alt=""
        />
        <h1>Sign In to Slack2.0</h1>
        <p>new.slack.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 50px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > img {
    object-fit: cover;
    height: 100px;
    margin-bottom: 40px;
  }

  > Button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
