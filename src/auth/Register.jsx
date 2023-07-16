import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import { useRef, useState } from "react";
import { validateEmail } from "../helpers/data-validators";
import config from "../config";

export const Register = () => {
  const [modal, setModal] = useState(false);
  // campos del formulario
  const { formState, onInputChange, onResetForm } = useForm({
    email: "",
    contra: "",
    verContra: "",
    usuario: "",
  });
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
        if (res.errors) throw new Error(data.errors[0].msg);
        onResetForm();
        setModal(true);
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
      <Modal show={modal}>
        <Modal.Header closeButton onHide={() => setModal(false)}>
          <Modal.Title>Registro completado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Se ha enviado un correo de verificación a tu cuenta de correo
            electronico, por favor, revisa tu bandeja de entrada y sigue las
            instrucciones para verificar tu cuenta.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};
