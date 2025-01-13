'use client';
import { baseUrl } from "@/utils/helper";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/users/current-user`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${Cookies.get('accessToken')}`
      },
    })
      .then(response => {
        console.log(response.data.data)
        setIsAuthenticated(true);
        setLoggedInUser(response.data.data);
      })
      .catch(error => {
        setIsAuthenticated(false);
        setLoggedInUser(null);
        console.log(error);
      })
      .finally(() => {
        // loading false
      })
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
