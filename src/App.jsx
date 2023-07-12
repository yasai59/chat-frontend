import { useState } from "react";
import { Button } from "semantic-ui-react";

export const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div>{counter}</div>
      <Button compact primary onClick={() => {setCounter(value => value + 1)}}>Clicame!</Button>
    </>
  );
};
