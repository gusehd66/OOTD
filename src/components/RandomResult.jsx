import { useContext, useEffect } from "react";
import { SelectContext } from "../context/context";
import ResultComponent from "./ResultComponent";
import { itemData } from "../data/images";
import { Button } from "@mui/material";

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
      return setSelect((prev) => {
        prev[key.key] = key.items[randomItem].img;
        return prev;
      });
    });
  };

  useEffect(() => {
    return () => {
      setSelect({
        상의: "",
        하의: "",
        신발: "",
        아우터: "",
      });
    };
  }, [setSelect]);

  return (
    <>
      <ResultComponent />
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        sx={{ marginLeft: "50%", transform: "translateX(-50%)" }}
      >
        RANDOM
      </Button>
    </>
  );
};

export default RandomResult;
