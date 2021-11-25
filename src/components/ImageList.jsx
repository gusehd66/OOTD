import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useContext, useState } from "react";
import { SelectContext } from "../context/context";
import { itemData } from "../data/images";

const ImageLists = ({ activeStep }) => {
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
    <ImageList sx={{ width: "100%", height: 450 }} cols={2} rowHeight={200}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            onClick={handleClick}
            style={
              select[activeStep] === `${item.img}?w=248&fit=crop&auto=format`
                ? { opacity: 0.7 }
                : { opacity: 1 }
            }
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
