import { useLocation } from "react-router-dom";
import queryString from "query-string";
import configInstance from "../config";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";

const CargarComponent = () => {
  return (
    <Card body>
      <Spinner animation="border" role="status">
        a
      </Spinner>
    </Card>
  );
};

const ErrorComponent = () => {
  return <Card body>Error en la verificacion</Card>;
};

const SuccessComponent = () => {
  return <Card body>Verificacion realizada con exito</Card>;
};

export const VerificarUsuario = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);

  const uid = query.user;

  const loadingState = Symbol();
  const errorState = Symbol();
  const successState = Symbol();

  const [result, setResult] = useState(loadingState);

  const userContext = useContext(UserContext);
  useEffect(() => {
    fetch(configInstance.endpoint + "/user/verificar/" + uid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.errors) throw new Error(data.errors[0].msg);
        setResult(successState);
        console.log(data);
        userContext.login(data.token, data.usuario);
      })
      .catch((err) => {
        setResult(errorState);
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  return (
    <>
      {result === loadingState ? (
        <CargarComponent />
      ) : result === errorState ? (
        <ErrorComponent />
      ) : (
        <SuccessComponent />
      )}
    </>
  );
};
