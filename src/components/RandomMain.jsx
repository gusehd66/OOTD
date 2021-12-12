import { motion } from "framer-motion";
import { itemData } from "../data/images";

const RandomMain = () => {
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
      }}
    >
      {itemData.map((data, i) => (
        <motion.div
          key={data.items[i].desc}
          style={{
            position: "absolute",
            top: `${Math.random() * 10}vh `,
            left: `${Math.random() * 30}vw `,
          }}
          animate={{
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
          }}
        >
          <img
            src={data.items[Math.floor(Math.random() * data.items.length)].img}
            alt={data.items[Math.floor(Math.random() * data.items.length)].desc}
            style={{ width: "250px", height: "auto" }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default RandomMain;
