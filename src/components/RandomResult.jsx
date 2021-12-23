import { useEffect, useCallback, useState } from "react";
import ResultComponent from "./ResultComponent";
import { itemData } from "../data/images";
import RandomMain from "./RandomMain";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { clothActions } from "../store";

const RandomResult = () => {
  const [checkEmpty, setCheckEmpty] = useState(false);
  const dispatch = useDispatch();

  const onClick = () => {
    cleanContext();
    itemData.forEach((key) => {
      const randomItem = Math.floor(Math.random() * key.items.length);
      dispatch(
        clothActions.select({ step: key.key, value: key.items[randomItem].img })
      );
    });
    setCheckEmpty(true);
  };

  const cleanContext = useCallback(() => {
    dispatch(clothActions.init());
  }, [dispatch]);

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
