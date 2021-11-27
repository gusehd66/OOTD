import { useContext } from "react";
import { SelectContext } from "../context/context";

const ResultComponent = () => {
  const { select } = useContext(SelectContext);
  const keys = Object.keys(select);
  const transX = [5, 20, 10, 10];
  const transY = [25, 20, 15, -65];
  const zIndex = [4, 2, 3, 1];

  return (
    <div
      style={{
        width: "100vw",
        height: "80vh",
      }}
    >
      {keys.map((key, i) => (
        <img
          src={select[key]}
          alt="img"
          key={key}
          style={{
            position: "relative",
            top: `${transY[i]}%`,
            left: `${transX[i]}%`,
            zIndex: `${zIndex[i]}`,
          }}
        />
      ))}
    </div>
  );
};

export default ResultComponent;
