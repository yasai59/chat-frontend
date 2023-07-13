import { Card, Tab, Tabs } from "react-bootstrap";
import "./Account.css";
import { Login } from "./Login";
import { useState } from "react";
import { Register } from "./Register";

export const Account = () => {
  const [tab, setTab] = useState("login");

  return (
    <div className="center-flex">
      <Card style={{ width: "60vmin" }}>
        <Tabs id="userTabs" activeKey={tab} onSelect={setTab}>
          <Tab eventKey="login" title="Iniciar sesion">
            <Login />
          </Tab>
          <Tab eventKey="registar" title="registrar">
            <Register />
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};
