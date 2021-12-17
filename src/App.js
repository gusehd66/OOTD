import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "./components/AppBar";
import RandomResult from "./components/RandomResult";
import SignIn from "./components/SignIn";
import StepperComponent from "./components/Stepper";
import { SelectContext } from "./context/context";

function App() {
  const [select, setSelect] = useState({
    상의: "",
    하의: "",
    신발: "",
    아우터: "",
  });

  const [nickname, setNickname] = useState(
    window.localStorage.getItem("nickname")
  );

  return (
    <BrowserRouter>
      <SelectContext.Provider
        value={{ select, setSelect, nickname, setNickname }}
      >
        <Appbar />
        <Routes>
          <Route path="/" element={<StepperComponent />} />
          <Route path="/random" element={<RandomResult />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </SelectContext.Provider>
    </BrowserRouter>
  );
}

export default App;
