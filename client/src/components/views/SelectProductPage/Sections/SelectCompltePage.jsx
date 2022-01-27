import { useSelector } from "react-redux";
import styled from "styled-components";

//  [outer,shoes,bottom,top]
const topCss = ["35%", "88%", "60%", "25%"];
const leftCss = ["40%", "50%", "50%", "50%"];
const heightCss = ["42%", "22%", "35%", "35%"];

const MobiletopCss = ["30%", "70%", "65%", "32%"];
const MobileleftCss = ["30%", "30%", "55%", "55%"];
const MobileheightCss = ["37%", "23%", "35%", "35%"];

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 76vh;
  overflow: hidden;
`;
const ProductImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: "img",
}))`
  object-fit: contain;
  position: absolute;
  transform: translate(-50%, -50%);
  height: ${(props) => heightCss[props.index]};
  top: ${(props) => topCss[props.index]};
  left: ${(props) => leftCss[props.index]};

  @media screen and (max-width: 770px) {
    height: ${(props) => MobileheightCss[props.index]};
    top: ${(props) => MobiletopCss[props.index]};
    left: ${(props) => MobileleftCss[props.index]};
  }
`;

const SelectCompletePage = () => {
  const clothes = useSelector((state) => state.cloth);
  const ProductKey = Object.keys(clothes).reverse();
  return (
    <Container>
      {ProductKey.map(
        (cloth, idx) =>
          clothes[cloth].src !== "" && (
            <ProductImage
              index={idx}
              src={clothes[cloth].src.image}
              category={cloth}
              key={cloth}
            />
          )
      )}
    </Container>
  );
};

export default SelectCompletePage;
