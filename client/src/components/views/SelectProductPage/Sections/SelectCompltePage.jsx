import { HeartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

//  [outer,shoes,bottom,top]
const topCss = ["35%", "88%", "60%", "25%"];
const leftCss = ["40%", "50%", "50%", "50%"];
const heightCss = ["42%", "22%", "35%", "35%"];

const MobiletopCss = ["30%", "70%", "65%", "32%"];
const MobileleftCss = ["30%", "30%", "55%", "55%"];
const MobileheightCss = ["37%", "23%", "35%", "35%"];

const CompleteContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 76vh;
  overflow: hidden;
`;

const ProductImage = styled.img.attrs((props) => {
  return { src: props.src, alt: "img" };
})`
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

const LikeBtn = styled.button`
  cursor: pointer;
  position: relative;
  top: 50px;
  left: 50px;
  height: 40px;
  color: red;
  border: solid 1px #ff5454;
  box-shadow: 3px 3px 5px #555;
  border-radius: 5px;
  width: 120px;
  transition: 0.2s;
  font-weight: bold;
  &:hover {
    background-color: #ff5454;
    color: #fff;
    animation: wiggle 2s;
    animation-iteration-count: 3;
  }

  @keyframes wiggle {
    25% {
      transform: rotate(5deg);
    }
    75% {
      transform: rotate(-5deg);
    }
  }
`;

const SelectCompletePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clothes = useSelector((state) => state.cloth);
  const ProductKey = Object.keys(clothes).reverse();

  const onLikeClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <CompleteContainer>
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
      <LikeBtn onClick={() => onLikeClick()}>
        <HeartOutlined /> Add Favorite
      </LikeBtn>
    </CompleteContainer>
  );
};

export default SelectCompletePage;
