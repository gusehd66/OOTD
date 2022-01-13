import { useSelector } from "react-redux";
import styled from "styled-components";

const SelectCompletePage = () => {
  const clothes = useSelector((state) => state.selectItem);
  const ProductKey = Object.keys(clothes).reverse();
  console.log(clothes);
  return (
    <Container>
      {ProductKey.map(
        (cloth, idx) =>
          clothes[cloth].src !== "" && (
            <ProductImage
              top={topCss[idx]}
              left={leftCss[idx]}
              src={clothes[cloth].src.image}
              category={cloth}
              key={cloth}
            />
          )
      )}
    </Container>
  );
};

const topCss = ["25%", "90%", "65%", "35%"];
const leftCss = ["35%", "50%", "50%", "50%"];

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 78vh;
  overflow: hidden;
`;
const ProductImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: "img",
}))`
  height: ${(props) => (props.category === "shoes" ? "20%" : "50%")};
  objectfit: contain;
  position: absolute;
  transform: translate(-50%, -50%);
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

export default SelectCompletePage;
