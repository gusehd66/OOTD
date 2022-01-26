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
