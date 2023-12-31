import { Button, Form } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import { useContext, useRef } from "react";
import { validateEmail } from "../helpers/data-validators";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const Login = () => {
  const userContext = useContext(UserContext);
  // campos del formulario
  const { formState, onInputChange } = useForm({
    email: "",
    contra: "",
  });
  // hook para sacar al usuario al hacer login
  const navigate = useNavigate();

  // campo para mostrar los errores
  const errorElement = useRef();
  const mostrarError = (mensaje) => {
    errorElement.current.innerText = mensaje;
    errorElement.current.style.display = "block";
  };

  // manejamos el login
  const handleSubmit = (evt, formState) => {
    evt.preventDefault();
    // recogemos los campos del formulario
    const { email, contra } = formState;
    if (email === "" || contra === "")
      return mostrarError("Todos los campos son obligatorios");
    // validamos el formato del email
    if (!validateEmail(email)) {
      mostrarError("El email no es valido");
      return;
    }
    // hacemos la peticion al servidor
    fetch(config.loginRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: email,
        password: contra,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error("email/contraseña no encontrados");
        // recogemos el token con el usuario y lo guardamos en el contexto
        userContext.login(data.token, data.usuario);
        navigate("/");
      })
      .catch((err) => {
        mostrarError(err);
      });
  };

  return (
    // Formulario basico de login con react-bootstrap
    <Form onSubmit={(evt) => handleSubmit(evt, formState)}>
      <h2>Inicio de sesion</h2>
      <p className="error" ref={errorElement}></p>
      <Form.Group controlId="formLoginEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="ejemplo@ejemplo.com"
          name="email"
          value={formState.email}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formLoginPassword" className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Introduce tu contraseña"
          name="contra"
          value={formState.contra}
          onChange={onInputChange}
        />
      </Form.Group>
      <Button type="submit" variant="outline-primary">
        Iniciar sesion
      </Button>
    </Form>
  );
};
