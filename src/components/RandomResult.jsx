import { useContext } from "react";
import { SelectContext } from "../context/context";
import ResultComponent from "./ResultComponent";
import { itemData } from "../data/images";

const RandomResult = () => {
  const { select, setSelect } = useContext(SelectContext);

  const onClick = () => {
    setSelect({
      상의: "",
      하의: "",
      신발: "",
      아우터: "",
    });
    itemData.map((key) => {
      const randomItem = Math.floor(Math.random() * key.items.length);
      setSelect((prev) => {
        prev[key.key] = key.items[randomItem].img;
        return prev;
      });
    });
  };

  return (
    <>
      <ResultComponent />
      <button onClick={onClick}>다시</button>
    </>
  );
};

export default RandomResult;
