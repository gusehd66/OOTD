import { useContext, useEffect, useCallback, useState } from "react";
import { SelectContext } from "../context/context";
import ResultComponent from "./ResultComponent";
import { itemData } from "../data/images";
import { Button } from "@mui/material";
import RandomMain from "./RandomMain";

const RandomResult = () => {
  const { setSelect } = useContext(SelectContext);
  const [checkEmpty, setCheckEmpty] = useState(false);

  const onClick = () => {
    cleanContext();
    itemData.map((key) => {
      const randomItem = Math.floor(Math.random() * key.items.length);
      return setSelect((prev) => {
        prev[key.key] = key.items[randomItem].img;
        return prev;
      });
    });
    setCheckEmpty(true);
  };

  const cleanContext = useCallback(() => {
    setSelect({
      상의: "",
      하의: "",
      신발: "",
      아우터: "",
    });
  }, [setSelect]);

  useEffect(() => {
    return () => cleanContext();
  }, [cleanContext]);

  return (
    <>
      {checkEmpty ? <ResultComponent /> : <RandomMain />}
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        sx={{
          marginLeft: "50%",
          transform: "translateX(-50%)",
        }}
      >
        RANDOM
      </Button>
    </>
  );
};

export default RandomResult;
