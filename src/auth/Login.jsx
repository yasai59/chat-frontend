import "./login.css";
import { useForm } from "../hooks/useForm";
import { Button, Input } from "semantic-ui-react";
import { useRef } from "react";
import { validateEmail } from "../helpers/data-validators";
import config from "../config";

export const Login = () => {
  const { formState, onInputChange } = useForm({
    email: "",
    contra: "",
  });

  const errorElement = useRef();
  const mostrarError = (mensaje) => {
    errorElement.current.innerText = mensaje;
    errorElement.current.style.display = "block";
  };

  const handleSubmit = (evt, formState) => {
    evt.preventDefault();

    const { email, contra } = formState;
    if (email === "" || contra === "")
      return mostrarError("Todos los campos son obligatorios");

    if (!validateEmail(email)) {
      mostrarError("El email no es valido");
      return;
    }

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
        console.log(data);
        if (!res.ok) throw new Error("email/contraseña no encontrados");
        mostrarError("Inicio de sesion exitoso");
      })
      .catch(() => {
        mostrarError("email/contraseña no encontrados");
      });
  };

  return (
    <div className="userForm">
      <form onSubmit={(evt) => handleSubmit(evt, formState)}>
        <h2>Inicio de sesion</h2>
        <p className="error" ref={errorElement}></p>
        <label>Email:</label>
        <br />
        <Input
          icon="at"
          placeholder="ejemplo@ejemplo.com"
          onChange={onInputChange}
          name="email"
          iconPosition="left"
          fluid
        />
        <br />
        <label>Contraseña:</label>
        <br />
        <Input
          icon="lock"
          placeholder="Contraseña"
          iconPosition="left"
          onChange={onInputChange}
          name="contra"
          type="password"
          fluid
        />
        <br />
        <Button type="submit" color="blue" inverted floated="right">
          Iniciar sesion
        </Button>
      </form>
    </div>
  );
};
