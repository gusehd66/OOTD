import { motion } from "framer-motion";
import { itemData } from "../data/images";
import { useState, useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";

const RandomMain = () => {
  const [image, setImage] = useState(1);
  const { height, width } = useWindowSize();
  const random = itemData[Math.floor(Math.random() * (itemData.length - 1))];

  useEffect(() => {
    function tick() {
      return setTimeout(() => setImage(image + 1), 5000);
    }
    tick();
    return () => clearTimeout(tick);
  }, [image]);

  return (
    <div
      style={{
        width: "90vw",
        height: "50vh",
        overflow: "hidden",
        position: "relative",
        border: "solid 1px #d3d3d3",
        borderRadius: "20px",
        margin: "2vh auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
        }}
        animate={{
          scale: [1, 1, 1, 1, 1],
          left: ["100vw", "30vw", `20vw`, "10vw", "-80vw"],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src={
            random.items[Math.floor(Math.random() * (random.items.length - 1))]
              .img
          }
          alt={"1213"}
          style={{ width: "250px", height: "auto" }}
        />
      </motion.div>
    </div>
  );
};

export default RandomMain;
