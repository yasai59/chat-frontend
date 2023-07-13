import { Navigate, Route, Routes } from "react-router-dom";
import { Account } from "../auth/Account";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/account" element={<Account />} />
      <Route path="/*" element={<Navigate to="/account" />} />
    </Routes>
  );
};
