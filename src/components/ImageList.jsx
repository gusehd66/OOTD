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
      {itemData.map(
        (item) =>
          item.key === activeStep &&
          item.items.map((data) => {
            return (
              <ImageListItem
                key={data.title}
                sx={{ width: "169px", height: "250px" }}
              >
                <img
                  src={`${data.img}`}
                  alt={data.title}
                  loading="lazy"
                  onClick={completed ? (e) => e.preventDefault() : handleClick}
                  style={{
                    objectFit: "contain",
                    opacity: select[activeStep] === data.img ? 0.7 : 1,
                  }}
                />
                <ImageListItemBar
                  title={data.title}
                  subtitle={<span>by: {data.desc}</span>}
                  position="below"
                />
              </ImageListItem>
            );
          })
      )}
    </ImageList>
  );
};

export default ImageLists;
