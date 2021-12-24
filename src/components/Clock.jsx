import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const Clock = () => {
  const [value, setValue] = useState(dayjs().format("HH:mm:ss"));

  useEffect(() => {
    const interval = setInterval(
      () => setValue(dayjs().format("HH:mm:ss")),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <p
      style={{
        color: "white",
        fontFamily: "LAB디지털",
        margin: 0,
        letterSpacing: "5px",
      }}
    >
      {value}
    </p>
  );
};

export default Clock;
