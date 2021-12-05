import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "./components/AppBar";
import RandomResult from "./components/RandomResult";
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
    <BrowserRouter>
      <SelectContext.Provider value={{ select, setSelect }}>
        <Appbar />
        <Routes>
          <Route path="/" element={<StepperComponent />} />
          <Route path="/random" element={<RandomResult />} />
        </Routes>
      </SelectContext.Provider>
    </BrowserRouter>
  );
}

export default App;
