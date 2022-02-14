import { HeartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addFavorite } from "../../_actions/user_actions";

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
  background-color: #fff;
  &:hover {
    background-color: #ff5454;
    color: #fff;
    animation: wiggle 2s;
    animation-iteration-count: 3;
  }
  @media screen and (max-width: 770px) {
    top: 30px;
    left: 30px;
    width: 40px;
    > .favorite-btn {
      display: none;
    }
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

const Popover = styled.form`
  position: relative;
  top: 70px;
  left: 50px;
  background-color: #fff;
  width: 250px;
  height: 40px;
  box-sizing: border-box;
  display: flex;
  border: solid 2px #888;
  border-radius: 20px;
  transition: 0.2s;
  padding: 5px;
  align-items: center;
  font-size: 12px;
  &:focus-within {
    border: solid 2px #ff5454;
  }

  @media screen and (max-width: 770px) {
    top: 50px;
    left: 30px;
    width: 200px;
    height: 35px;
  }

  > input {
    width: 80%;
    border: none;
    border-radius: 10px;
    padding: 0 10px;
    outline: none;
    height: 30px;
  }
  > button {
    cursor: ${(props) => props.value.trim() && "pointer"};
    color: ${(props) => (props.value.trim() ? "#000" : "#888")};
    font-weight: bold;
    width: 20%;
    height: 30px;
    background-color: white;
    border: none;
    border-radius: 10px;
  }
`;

const SelectCompletePage = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const clothes = useSelector((state) => state.cloth);
  const ProductKey = Object.keys(clothes).reverse();

  const onLikeClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addFavorite({ id: userId, favoriteTitle: title.trim(), images: clothes })
    ).then(() => {
      setIsOpen(false);
      setTitle("");
    });
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
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
        <HeartOutlined /> <span className="favorite-btn">Add Favorite</span>
      </LikeBtn>
      {isOpen && (
        <Popover onSubmit={handleSubmit} value={title}>
          <input
            type="text"
            onChange={handleChange}
            value={title}
            placeholder="즐겨찾기 제목을 입력하세요."
          />
          <button type="submit">추가</button>
        </Popover>
      )}
    </CompleteContainer>
  );
};

export default SelectCompletePage;
