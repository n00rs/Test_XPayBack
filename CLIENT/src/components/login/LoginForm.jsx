import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { loginSchema } from "../../validations/validation";
import Spinner from "../spinner/Spinner";
import { authContext, urlContext } from "../../context/context";
import "../signup/Signup.scss";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUserExist } = useContext(authContext);
  const { API_URL } = useContext(urlContext);

  const initialState = {
    strUserEmail: "",
    strPassWord: "",
  };
  const [userData, setUserData] = useState(initialState);

  const [isLoading, setIsLoading] = useState(false);

  const { strUserEmail, strPassWord } = userData;

  const getValues = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginValidate = await loginSchema.validate(userData, {
        abortEarly: false,
      });
      if (loginValidate) {
        setIsLoading(true);

        const url = API_URL.userLogin;
        const loginApi = await axios.post(url, loginValidate);
        if (loginApi.data.body?.strMessage === "LOGIN_SUCCESS") {
          setIsLoading(false);
          setUserData(initialState);
          navigate("/");
          setUserExist(true);
          setDataLocal(loginApi.data.body);
        } else {
          setIsLoading(false);
          setUserData(initialState);
          toast.error("opps something wrong please login again");
        }
      }
    } catch (err) {
      if (err.errors) err.errors.map((error) => toast.error(error));
      if (err.name === "AxiosError") {
        setIsLoading(false);
        toast.error(err.response.data);
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <Container className="p-5 mt-5">
      <div className="login-box mt-5 p-5">
        <div className="login-box-formbox">
          <div className="login-box-signup">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
          <div className="login-box-login">
            <h1>Welcome </h1>
            <p></p>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="strUserEmail"> E-Mail</label>
                <input
                  type="email"
                  name="strUserEmail"
                  className="input-email"
                  onChange={getValues}
                  value={strUserEmail}
                />
              </div>
              <div>
                <label htmlFor="strPassWord"> Password</label>
                <input
                  type="password"
                  name="strPassWord"
                  className="input-password"
                  onChange={getValues}
                  value={strPassWord}
                />
              </div>
              <div>
                <input type="submit" value="Login to account" className="BTN" />
              </div>
            </form>
          </div>
        </div>

        <div className="login-box-quotebox">
          <div className="quote-container">
            <div className="quote">"</div>
            <div className="quote-small">"Lorem ipsum dolor</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
function setDataLocal(objData) {
  const { strAccToken, strRefrToken, strUserEmail, strId, strName } = objData;
  localStorage.setItem("strAccToken", strAccToken);
  localStorage.setItem("strRefrToken", strRefrToken);
  localStorage.setItem("strId", strId);
  localStorage.setItem("strUserEmail", strUserEmail);
  localStorage.setItem("strName", strName);
}
