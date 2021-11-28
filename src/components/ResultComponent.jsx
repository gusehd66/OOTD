import { useContext } from "react";
import { SelectContext } from "../context/context";

const ResultComponent = () => {
  const { select } = useContext(SelectContext);
  const keys = Object.keys(select);
  const transX = [20, 20, 20, 5];
  const transY = [15, 30, 60, 10];
  const zIndex = [4, 2, 3, 1];

  return (
    <div
      style={{
        width: "100vw",
        height: "80vh",
        position: "relative",
      }}
    >
      {keys.map((key, i) => (
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
      ))}
    </div>
  );
};

export default ResultComponent;
