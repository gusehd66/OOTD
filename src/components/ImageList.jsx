import { Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { itemData } from "../data/images";
import { clothActions } from "../store";

const ImageLists = ({ activeStep, completed }) => {
  const [check, setCheck] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setCheck((prev) => (prev === e.target.src ? "" : e.target.src));
    dispatch(clothActions.select({ value: e.target.src, step: activeStep }));
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
