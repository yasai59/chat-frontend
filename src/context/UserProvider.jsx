import PropTypes from "prop-types";
import { UserContext } from "./UserContext";
import { useState } from "react";

export const UserProvider = ({ children }) => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expDate");
    date = 1;
    localStorage.setItem("expDate", new Date(date).getTime());
    setToken(null);
    setUser(null);
  };
  // recogemos token y user del localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user"));

  console.log({ token, user });
  // recogemos la fecha de expiracion del localStorage
  let date = localStorage.getItem("expDate");
  // funcion que elimina token, user y expDate del localStorage y del contexto
  // validamos que la fecha de expiracion sea mayor que la fecha actual
  if (
    !date ||
    new Date(date).getTime() > Date.now() ||
    localStorage.getItem("user") === "undefined" ||
    localStorage.getItem("token") === "undefined"
  ) {
    logout();
  }

  const login = (token, user) => {
    if (!token || !user) return;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    // la fecha de expiracion es 7 dias despues de la fecha actual
    date = new Date() + 604800000;
    localStorage.setItem("expDate", new Date(date).getTime());

    setToken(token);
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
