import { createContext, useState } from "react";

//CONTEXT TO AUTHUSER AND ADMIN

export const authContext = createContext("");

export const AuthContext = ({ children }) => {
  //GETTING DATA FROM COOKIES

  if (!localStorage.getItem("strAccToken")) {
    // todo call refresh token api
  }
  const initialState = !!localStorage.getItem("strAccToken");

  //SETTING STATES FOR USER AND ADMIN

  const [userExist, setUserExist] = useState(initialState);

  //WRAPPING THE CONTEXT IN CHILD OF PROPERTIES (IF APP IS WRAPED IN  THEN APP BECOME THE CHILD )
  return (
    <authContext.Provider value={{ setUserExist, userExist }}>
      {children}
    </authContext.Provider>
  );
};

//URL Context
export const urlContext = createContext(null);

export const UrlContext = ({ children }) => {
  const API_URL = {
    userLogin: "/api/auth/user_login",
    userSignup: "/api/auth/user_signup",
    userLogout: "/api/auth/user_logout",
    refreshToken: "api/auth/refresh_token",
    userData: "/api/auth/get_user",
    uploadImage: "/api/image/save_image",
    getImage: "/api/image/get_image",
  };

  return (
    <urlContext.Provider value={{ API_URL }}>{children}</urlContext.Provider>
  );
};
