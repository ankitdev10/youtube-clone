import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import {  useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};

`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 10px;
`;

const Links = styled.div`
  margin-left: 40px;
`;

const LinkItem = styled.span`
  margin-left: 20px;
`;

const Error = styled.span`
color: red;
font-size: 14px;
margin-top: 8px;
`

const Login = () => {
  const name = useRef();
  const password = useRef();
  const email = useRef();
  const signupPassword = useRef();
  const signupName = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      setErr("")
      const res = await axios.post("/auth/signin", {
        name: name.current.value,
        password: password.current.value,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
      setErr(error.response.data.message)
      console.log(error.response.data.message)

    }
  };

  console.log(err);

  const signUp = async (e) => {
    e.preventDefault();
    const res = await axios.post("/auth/signup", {
      name: signupName.current.value,
      email: email.current.value,
      password: signupPassword.current.value,
    });
  };

  const signinWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
          });
          navigate("/")
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue using CloneTube</SubTitle>
        <Input ref={name} placeholder="username" />
        <Input ref={password} type="password" placeholder="password" />
        <Button onClick={signIn}>Sign in</Button>

        <Title>or</Title>
        <Button onClick={signinWithGoogle}>SIgn in with google</Button>
        <Title>or</Title>

        <Input ref={signupName} placeholder="Username" />

        <Input ref={email} type="email" placeholder="Email" />
        <Input ref={signupPassword} type="password" placeholder="password" />
        <Button onClick={signUp}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <LinkItem>Help</LinkItem>
          <LinkItem>Privacy</LinkItem>
          <LinkItem>Terms</LinkItem>
        </Links>
      </More>
      {err.length >2 && (
        <Error>{err}⛔</Error>
      )}
    </Container>
  );
};

export default Login;
