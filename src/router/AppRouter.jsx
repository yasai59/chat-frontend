import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { PublicRoutes } from "./PublicRoutes";
import { VerificarUsuario } from "../auth/VerificarUsuario";

export const AppRouter = () => {
  const userContext = useContext(UserContext);
  const autenticado = userContext.token && userContext.user;

  return (
    <Routes>
      <Route path="/verificar" element={<VerificarUsuario />} />
      {autenticado ? (
        <>
          <Route path="/app/*" element={<PrivateRoutes />} />
          <Route path="/*" element={<Navigate to="/app" />} />
        </>
      ) : (
        <Route path="/*" element={<PublicRoutes />} />
      )}
    </Routes>
  );
};
