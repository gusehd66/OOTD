import React from "react";
import { Carousel } from "antd";

function ImageSlider({ images }) {
  return (
    <Carousel autoplay>
      {images.map((image) => (
        <div key={image.key}>
          <img
            style={{ width: "100%", height: "150px", objectFit: "contain" }}
            src={image.image}
            alt="img"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageSlider;
