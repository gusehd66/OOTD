import { useState } from "react";
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
      <StepperComponent />
    </SelectContext.Provider>
  );
}

export default App;
