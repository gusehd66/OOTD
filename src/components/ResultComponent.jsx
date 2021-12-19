import { motion } from "framer-motion";
import { useContext } from "react";
import { SelectContext } from "../context/context";

//css 수정 필요
const ResultComponent = () => {
  const { select } = useContext(SelectContext);
  const keys = Object.keys(select);
  const transX = [25, 25, 20, 5];
  const transY = [10, 30, 60, 6];
  const zIndex = [4, 2, 3, 1];

  return (
    <motion.div
      animate={{
        x: [200, 0],
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "80vh",
          position: "relative",
        }}
      >
        {keys.map(
          (key, i) =>
            select[key] && (
              <img
                src={select[key]}
                alt="img"
                key={key}
                style={{
                  objectFit: "contain",
                  width: "200px",
                  height: "auto",
                  position: "absolute",
                  top: `${transY[i]}vh`,
                  left: `${transX[i]}vw`,
                  zIndex: `${zIndex[i]}`,
                }}
              />
            )
        )}
      </div>
    </motion.div>
  );
};

export default ResultComponent;
