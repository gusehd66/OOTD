import { Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
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
    <ImageList sx={{ width: "100%", height: "56vh" }} cols={2} rowHeight={200}>
      {itemData.map(
        (item) =>
          item.key === activeStep &&
          item.items.map((data) => {
            return (
              <ImageListItem key={data.title} sx={{ width: "169px" }}>
                <img
                  src={`${data.img}`}
                  alt={data.title}
                  loading="lazy"
                  onClick={completed ? (e) => e.preventDefault() : handleClick}
                  style={{
                    objectFit: "contain",
                    opacity: check === data.img ? 0.7 : 1,
                    height: "80%",
                  }}
                />
                <Typography
                  variant="h1"
                  pl="10px"
                  sx={{
                    fontFamily: "GmarketM",
                    fontSize: "1rem",
                  }}
                >
                  {data.title}
                </Typography>
                <Typography
                  variant="body1"
                  pl="10px"
                  sx={{
                    fontFamily: "GmarketL",
                    fontSize: ".8rem",
                  }}
                >
                  <span>{data.desc}</span>
                </Typography>
              </ImageListItem>
            );
          })
      )}
    </ImageList>
  );
};

export default ImageLists;
