import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext, urlContext } from "../../context/context";
import { toast } from "react-toastify";
import axios from "axios";
import "./Header.css";
import Spinner from "../spinner/Spinner";

const Header = () => {
  const navigate = useNavigate();
  const { userExist, setUserExist } = useContext(authContext);
  const { API_URL } = useContext(urlContext);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(!!localStorage.length && {
    strName: localStorage.getItem("strName"),
  });

  const fetchUser = async () => {
    try {
      let user = await axios.get(API_URL.userData, { withCredentials: true });
      if (user.data) {
        setUser({ strName: user.data.name });
      }
    } catch (err) {
      console.log(err.message, "in header.jsx");
    }
  };

  useEffect(() => {
    userExist && fetchUser();
  }, [userExist]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const url = API_URL.userLogout;
      localStorage.clear();
      navigate("/login");
      setUserExist(false);
      setUser("");
      const logout = await axios.delete(url, { withCredentials: true });

      if (logout.data.logout) {
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
      navigate("/login");
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <nav className="containers">
      <input id="nav-toggle" type="checkbox" />
      <div className="logo">
        Easy
        <strong style={{ color: "#153b66", fontWeight: "800" }}>
          Image Uploads
        </strong>
      </div>

      {user && (
        <div className="logo">
          welcome{" "}
          <strong style={{ color: "#153b66", fontWeight: "800" }}>
            {user.strName}
          </strong>
        </div>
      )}

      {userExist ? (
        <ul className="links">
          <li className="list">
            <Link to="/">Home</Link>
            <div className="home_underline"></div>
          </li>

          <li className="list">
            <Link to="/view_images">View Photos</Link>
            <div className="home_underline"></div>
          </li>

          <li className="list">
            <Link to="/upload_image">Upload Photo</Link>
            <div className="home_underline"></div>
          </li>

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
      ) : (
        <ul className="links">
          <li className="list">
            <Link to="/login">LOGIN</Link>
            <div className="home_underline"></div>
          </li>
          <button onClick={() => navigate("/signup")}>SIGNUP</button>
        </ul>
      )}
      <label htmlFor="nav-toggle" className="icon-burger">
        <div className="line">LOGIN</div>
        <div className="line">SIGNUP</div>
        <div className="line"></div>
      </label>
    </nav>
  );
};

export default Header;
