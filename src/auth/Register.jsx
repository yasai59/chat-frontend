import { Button, Form } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import { useContext, useRef } from "react";
import { validateEmail } from "../helpers/data-validators";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const Register = () => {
  const userContext = useContext(UserContext);
  // campos del formulario
  const { formState, onInputChange } = useForm({
    email: "",
    contra: "",
    verContra: "",
    usuario: "",
  });
  // hook para sacar al usuario al hacer login
  const navigate = useNavigate();
  // campo para mostrar los errores
  const errorElement = useRef();
  const mostrarError = (mensaje) => {
    errorElement.current.innerText = mensaje;
    errorElement.current.style.display = "block";
  };

  // manejamos el registro
  const handleSubmit = (evt, formState) => {
    evt.preventDefault();
    // recogemos los campos del formulario
    const { email, contra, usuario, verContra } = formState;
    if (email === "" || contra === "" || usuario === "")
      return mostrarError("Todos los campos son obligatorios");
    // validamos el formato del email
    if (!validateEmail(email)) {
      mostrarError("El email no es valido");
      return;
    }
    // validamos que la contraseña y la verificacion sean iguales
    if (contra !== verContra) {
      mostrarError("Las contraseñas no coinciden");
      return;
    }
    // hacemos la peticion al servidor
    fetch(config.registerRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: usuario,
        correo: email,
        password: contra,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.errors[0].msg);
        // recogemos el token con el usuario y se lo pasamos al contexto
        userContext.login(data.token, data.usuario);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        mostrarError(err);
      });
  };

  return (
    <Form onSubmit={(evt) => handleSubmit(evt, formState)}>
      <h2>Registro</h2>
      <p className="error" ref={errorElement}></p>
      <Form.Group controlId="formRegisterEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="ejemplo@ejemplo.com"
          name="email"
          value={formState.email}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formRegisterUsername" className="mb-3">
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="Este sera tu nombre de usuario"
          name="usuario"
          value={formState.usuario}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formRegisterPassword" className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Introduce tu contraseña"
          name="contra"
          value={formState.contra}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formRegisterVerPassword" className="mb-3">
        <Form.Label>Verificación</Form.Label>
        <Form.Control
          type="password"
          placeholder="Verifica tu contraseña"
          name="verContra"
          value={formState.verContra}
          onChange={onInputChange}
        />
      </Form.Group>
      <Button type="submit" variant="outline-primary">
        Registrate
      </Button>
    </Form>
  );
};
