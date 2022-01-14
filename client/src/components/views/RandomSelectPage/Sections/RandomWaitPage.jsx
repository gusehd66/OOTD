import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const RandomWaitPage = ({ products }) => {
  const randomItem = products[Math.floor(Math.random() * products.length)];

  const [image, setImage] = useState(0);

  useEffect(() => {
    const handleTick = setTimeout(() => setImage(image + 1), 5000);
    return () => clearTimeout(handleTick);
  }, [image]);

  return (
    <Container>
      {randomItem && <RandomImage src={randomItem.images[0].image} />}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 76vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageFade = keyframes`
  0% {
    opacity: 0;
    margin-left:100vw;
  }
  25% {
    opacity: 1;
    margin-left:10vw;
  }
  50% {
    opacity: 1;
    margin-left:0vw;
  }
  75% {
    opacity: 1;
    margin-left:-10vw;
  }
  100% {
    opacity: 0;
    margin-left:-100vw;
  }
`;
const RandomImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: "img",
}))`
  width: 30%;
  height: auto;
  object-fit: contain;
  animation: ${ImageFade} 5s infinite ease-in-out;

  @media screen and (max-width: 700px) {
    width: 70%;
  }
`;

export default RandomWaitPage;
