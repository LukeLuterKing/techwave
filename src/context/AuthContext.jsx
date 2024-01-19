import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const {t} = useTranslation("global");

  const navigate = useNavigate();

  const csrf = async() => {
    await axios.get('/sanctum/csrf-cookie');
  }

  const getUser = async () => {
    try {
      console.log("Fetching user data");
      const { data } = await axios.get('/api/user');
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const login = async ({ ...data }) => {
    console.log("Logging in");
    await csrf();
    console.log("Logging in csrf");
    setErrors([]);
    try {
      console.log("Logging in login");
      await axios.post('/login', data);
      console.log("Logging in dane");
      await getUser();
      navigate("/profile");
    } catch (e) {
      if (e.response.status === 422) {
        
        if (e.response.data.errors.email && e.response.data.errors.email[0] === 'The email field is required.') {
          e.response.data.errors.email[0] = t("error.required");
      }
      if (e.response.data.errors.password && e.response.data.errors.password[0] === 'The password field is required.') {
          e.response.data.errors.password[0] = t("error.pass");
      }
      if (e.response.data.errors.email && e.response.data.errors.email[0] === 'These credentials do not match our records.') {
          e.response.data.errors.email[0] = t("error.credentials");
      }
        console.log(e.response.data.errors);
        setErrors(e.response.data.errors);

      }
    }
  };


  const register = async ({ ...data }) => {
    console.log("Registering user");
    await csrf();
    setErrors([]);
    try {
      await axios.post('/register', data);
      await getUser();
      navigate("/profile");
    } catch (e) {
      console.error("Registration error:", e);
      if (e.response.status === 422) {
        if (e.response.data.errors.name && e.response.data.errors.name[0] === 'The name field is required.') {
          e.response.data.errors.name[0] = t("error.name");}
        if (e.response.data.errors.email && e.response.data.errors.email[0] === 'The email field is required.') {
            e.response.data.errors.email[0] = t("error.required");} 
        if (e.response.data.errors.password && e.response.data.errors.password[0] === 'The password field is required.') {
            e.response.data.errors.password[0] = t("error.pass");}
        if (e.response.data.errors.email && e.response.data.errors.email[0] === 'The email has already been taken.') {
            e.response.data.errors.email[0] = t("error.email");}
          if (e.response.data.errors.password && e.response.data.errors.password[0] === 'The password field must be at least 8 characters.') {
            e.response.data.errors.password[0] = t("error.pass2");}
        if(e.response.data.errors.password && e.response.data.errors.password[0] === 'The password confirmation does not match.') {
          e.response.data.errors.password[0] = t("error.pass3");}
        
        setErrors(e.response.data.errors);
        console.log(e.response.data.errors);
      }
    }
  };

  const logout = () => {
    console.log("Logging out");
    axios.post('/logout').then(() => {
      setUser(null);
      localStorage.removeItem('user');
      navigate("/");
    }).catch(e => {
      console.error("Logout error:", e);
    });
  };

  useEffect(() => {
    console.log("Checking local storage for user data");
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, errors, getUser, login, register, logout, csrf }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}