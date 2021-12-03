import { useState } from "react";
import Appbar from "./components/AppBar";
import StepperComponent from "./components/Stepper";
import { SelectContext } from "./context/context";

function App() {
  const [select, setSelect] = useState({
    상의: "",
    하의: "",
    신발: "",
    아우터: "",
  });

  return (
    <SelectContext.Provider value={{ select, setSelect }}>
      <Appbar />
      <StepperComponent />
    </SelectContext.Provider>
  );
}

export default App;
