import { useContext, useEffect, useCallback, useState } from "react";
import { SelectContext } from "../context/context";
import ResultComponent from "./ResultComponent";
import { itemData } from "../data/images";
import RandomMain from "./RandomMain";
import { motion } from "framer-motion";

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
      top: "",
      bottom: "",
      shoes: "",
      outer: "",
    });
  }, [setSelect]);

  useEffect(() => {
    return () => cleanContext();
  }, [cleanContext]);

  return (
    <>
      {checkEmpty ? <ResultComponent /> : <RandomMain />}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          marginLeft: "50%",
          translateX: "-50%",
          backgroundColor: "#1976d2",
          borderRadius: "10px",
          height: "40px",
          width: "100px",
          color: "white",
          fontFamily: "GMarketM",
          border: "none",
          boxShadow: "1px 1px 4px #333 ",
        }}
        onClick={onClick}
      >
        RANDOM
      </motion.button>
    </>
  );
};

export default RandomResult;
