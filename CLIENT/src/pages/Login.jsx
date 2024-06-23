import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import { authContext } from "../context/context";
import Header from "../components/Header/Header";

const Login = () => {
  const navigate = useNavigate();
  const { userExist } = useContext(authContext);

  useEffect(() => {
    userExist ? navigate("/") : navigate("/login");
  }, []);

  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};

export default Login;
