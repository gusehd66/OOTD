import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  return (
    <Carousel autoplay>
      {props.images.map((image, index) => (
        <div key={index}>
          <img
            style={{ width: "100%", maxHeight: "150px", objectFit: "contain" }}
            src={
              `http://localhost:5000/${image}` ||
              `https://ootd-dongit.herokuapp.com//${image}`
            }
            alt="img"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageSlider;
