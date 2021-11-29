import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useContext, useState } from "react";
import { SelectContext } from "../context/context";
import { itemData } from "../data/images";

const ImageLists = ({ activeStep, completed }) => {
  const { select, setSelect } = useContext(SelectContext);
  const [check, setCheck] = useState("");

  const handleClick = (e) => {
    setSelect((prev) => {
      prev[activeStep] =
        select[activeStep] === e.target.src ? "" : e.target.src;
      return prev;
    });
    setCheck((prev) => (prev === e.target.src ? "" : e.target.src));
  };

  return (
    <ImageList sx={{ width: "100%", height: 450 }} cols={2} rowHeight={250}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} sx={{ width: "169px", height: "250px" }}>
          <img
            src={`${item.img}`}
            alt={item.title}
            loading="lazy"
            onClick={completed ? (e) => e.preventDefault() : handleClick}
            style={{
              objectFit: "contain",
              opacity: select[activeStep] === item.img ? 0.7 : 1,
            }}
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.desc}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageLists;
