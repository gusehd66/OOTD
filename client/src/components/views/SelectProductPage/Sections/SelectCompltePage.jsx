import { useSelector } from "react-redux";
import styled from "styled-components";

const SelectCompletePage = () => {
  const clothes = useSelector((state) => state.selectItem);
  const ProductKey = Object.keys(clothes).reverse();

  const topCss = ["25%", "90%", "65%", "35%"];
  const leftCss = ["35%", "50%", "50%", "50%"];

  const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 78vh;
    overflow: hidden;
  `;
  const ProductImage = styled.img.attrs((props) => ({
    src: clothes[props.cloth].src,
    key: clothes[props.cloth].key,
    alt: "img",
  }))`
    width: ${(props) => (props.cloth === "shoes" ? "20%" : "25%")};
    objectfit: contain;
    position: absolute;
    transform: translate(-50%, -50%);
    top: ${(props) => props.top};
    left: ${(props) => props.left};

    @media (max-width: 600px) {
      width: 50%;
    }
  `;

  return (
    <Container>
      {ProductKey.map((cloth, idx) => (
        <ProductImage top={topCss[idx]} left={leftCss[idx]} cloth={cloth} />
      ))}
    </Container>
  );
};

export default SelectCompletePage;
