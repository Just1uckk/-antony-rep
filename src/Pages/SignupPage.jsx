import React, { useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from "react-toastify";
import { auth } from '../components/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { userLogined } from "../components/toolkitSlice";
import styled from 'styled-components';
import { TextField } from '@mui/material';

const SignupContainer = styled.div`
  box-sizing: border-box;
  height: auto;
  max-width: 350px;
  border-radius: 5px;
  background: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
`
const SignupBlock = styled.div`
  display: ${props => props.display ? props.display : ""};;
  margin: 15px;
`

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginedStatus = useSelector((state) => state.toolkit.logined.payload);
  const navigate = useNavigate();
  const rediredtToLoginPage = async (data) => {
    if (data.operationType === "signIn") {
      await dispatch(userLogined(data.operationType));
      console.log(userLogined);
      return navigate("/");
    } else {
      return null;
    }
  };
  const notify = (e) => toast(e);

  const checkIfLogined = () => {
    if (loginedStatus === "signIn") {
      console.log(loginedStatus, "redirecting to a main page")
      navigate("/");
    };
  };

  useEffect(checkIfLogined);

  return (
    <div style={{display:"flex", justifyContent:"center",width: "100%"}}>
    <SignupContainer>
      <SignupBlock>
    <h2>Будь ласка, зареэструйтеся.</h2>
      </SignupBlock>
      <SignupBlock>
<TextField
fullWidth
style={{backgroundColor: "white", borderRadius: 4}}
variant="filled"
        value={email}
        label="Email"
        autoComplete="current-email"
          type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>
      </SignupBlock>
      <SignupBlock>
      <TextField
      fullWidth
      style={{backgroundColor: "white", borderRadius: 4}}
      variant="filled"
        value={password}
        autoComplete="current-password"
        label="password"
          type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      </SignupBlock>
      <SignupBlock>
        <div style={{display: "flex", flexDirection: "column"}}>
      <Button
        variant="contained"
        size="large"
        onClick={async () => {
          try {
            let data = await createUserWithEmailAndPassword(auth, email, password);
            notify("welcome to the club");
            console.log(data.operationType);
            rediredtToLoginPage(data);
          } catch (error) {
            notify(error.message);
          }
        }}
      > Register </Button>
        <p style={{marginTop: "20px"}}>Якщо в вас є обліковий запис : </p>
        <NavLink to={"/login"} style={{color: "blue"}}> увійдіть </NavLink>
        </div>
      </SignupBlock>
      <ToastContainer />
    </SignupContainer>
    </div>
  )
}

export default SignupPage
