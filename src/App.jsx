import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "./context/UserContext";

export const App = () => {
  const userContext = useContext(UserContext);

  let [mensajes, setMensajes] = useState([
    {
      timestamp: 1,
      mensaje: "Hola",
      remitente: "Yasai",
    },
    {
      timestamp: 2,
      mensaje: "Adios",
      remitente: "Jose",
    },
  ]);

  const user = JSON.parse(userContext.user);
  const handleMsg = (e) => {
    e.preventDefault();
    const mensaje = e.target.mensaje.value;
    if (mensaje.trim().length === 0) return;
    e.target.mensaje.value = "";
    setMensajes([
      ...mensajes,
      {
        timestamp: Date.now(),
        mensaje: mensaje,
        remitente: user.nombre,
      },
    ]);
  };

  return (
    <>
      <div>
        Sesion iniciada :D <br /> Bienvenido/a {user.nombre}!
      </div>
      <Button variant="danger" onClick={userContext.logout}>
        Cerrar sesion
      </Button>
      <div className="chat-prueba">
        {mensajes.map((msg) => (
          <div key={msg.timestamp}>
            <span>{msg.remitente + " - " + msg.mensaje}</span>
          </div>
        ))}
        <form action="submit" onSubmit={handleMsg}>
          <input
            type="text"
            name="mensaje"
            id="mensaje"
            placeholder="Mensaje"
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};
