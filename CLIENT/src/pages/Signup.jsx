import { useContext, useEffect } from "react";
import SignupForm from "../components/signup/SignupForm";
import { authContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

const Signup = () => {
  const navigate = useNavigate();
  const { userExist } = useContext(authContext);

  useEffect(() => {
    userExist ? navigate("/") : navigate("/signup");
  }, []);

  return (
    <>
      <Header />
      <SignupForm />
    </>
  );
};

export default Signup;
