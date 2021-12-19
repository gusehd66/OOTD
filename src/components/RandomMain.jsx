import { motion } from "framer-motion";
import { itemData } from "../data/images";
import { useState, useEffect } from "react";

const RandomMain = () => {
  const [image, setImage] = useState(1);
  const random = itemData[Math.floor(Math.random() * (itemData.length - 1))];

  useEffect(() => {
    const handleTick = setTimeout(() => setImage(image + 1), 5000);
    return () => clearTimeout(handleTick);
  }, [image]);

  return (
    <div
      style={{
        width: "90vw",
        height: "50vh",
        overflow: "hidden",
        position: "relative",
        border: "solid 5px #d3d3d3",
        borderRadius: "20px",
        margin: "10vh auto",
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
          alt={"img"}
          style={{ width: "250px", height: "auto" }}
        />
      </motion.div>
    </div>
  );
};

export default RandomMain;
