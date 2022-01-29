import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";

const ImageBox = styled.img.attrs((props) => ({
  src: props.src,
  alt: "Product Image",
  key: props.key,
}))`
  width: 100%;
  height: 150px;
  object-fit: contain;
  transition: 0.4s;
  &:hover {
    filter: drop-shadow(0 0 10px rgba(27, 39, 63));
    transform: scale(1.1);
  }
`;

function ImageSlider({ images }) {
  return (
    <Carousel autoplay>
      {images.map((image) => (
        <ImageBox src={image.image} key={image.key} />
      ))}
    </Carousel>
  );
}

export default ImageSlider;
