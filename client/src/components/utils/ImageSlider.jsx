import React from "react";
import { Carousel } from "antd";

function ImageSlider({ images }) {
  return (
    <Carousel autoplay>
      {images.map((image) => (
        <div key={image}>
          <img
            style={{ width: "100%", height: "150px", objectFit: "contain" }}
            // src={`https://ootd-dongit.herokuapp.com/${image}`}
            src={`http://localhost:5000/${image}`}
            alt="img"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageSlider;
