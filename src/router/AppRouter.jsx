import { Routes, Route } from "react-router-dom";
import { Login } from "../auth/Login";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
