import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "./context/UserContext";

export const App = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      <div>Sesion iniciada :D</div>
      <Button variant="danger" onClick={userContext.logout}>
        Cerrar sesion
      </Button>
    </>
  );
};
