import styled from "styled-components";

//  [outer,shoes,bottom,top]
const topCss = ["0%", "50%", "45%", "0%"];
const leftCss = ["35%", "35%", "50%", "50%"];
const heightCss = ["57%", "35%", "55%", "55%"];

const MobiletopCss = ["0%", "50%", "50%", "2%"];
const MobileleftCss = ["0%", "0%", "40%", "35%"];
const MobileheightCss = ["47%", "37%", "45%", "45%"];

const ProductImage = styled.img.attrs((props) => {
  return { src: props.src, alt: "img" };
})`
  object-fit: contain;
  position: absolute;
  height: ${(props) => heightCss[props.index]};
  top: ${(props) => topCss[props.index]};
  left: ${(props) => leftCss[props.index]};

  @media screen and (max-width: 770px) {
    height: ${(props) => MobileheightCss[props.index]};
    top: ${(props) => MobiletopCss[props.index]};
    left: ${(props) => MobileleftCss[props.index]};
  }
`;

const EnlargeContentContainer = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
`;

const EnlargeContent = ({ favorites, categories }) => {
  const sortCategories = categories.reverse();

  return (
    <EnlargeContentContainer>
      {sortCategories.map((category, index) => (
        <ProductImage
          key={category}
          src={favorites.clothes[category].src.image}
          alt="img"
          index={index}
        />
      ))}
    </EnlargeContentContainer>
  );
};

export default EnlargeContent;
