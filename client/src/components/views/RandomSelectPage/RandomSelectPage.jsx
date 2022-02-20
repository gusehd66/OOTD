import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useAuth from "../../../hooks/auth";
import { clothActions } from "../../../_store/select_item";
import RequestLogin from "../RequestLogin/RequestLogin";
import SelectCompletePage from "../SelectProductPage/Sections/SelectCompltePage";
import RandomWaitPage from "./Sections/RandomWaitPage";

const RandomButton = styled.button`
  cursor: pointer;
  position: relative;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
  margin-top: 20px;
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: #ccc;
  font-weight: bold;
  text-shadow: 2px 2px 2px #222;
  box-shadow: 0px 4px 5px #888;
  box-sizing: border-box;
  letter-spacing: 2px;
  background-color: #1b273f;
  transition: 0.2s;
  &:hover {
    background-color: #ff5454;
    font-weight: 900;
    text-shadow: none;
    color: #fff;
  }
`;

const RandomSelectPage = () => {
  const [products, setProducts] = useState([]);
  const [clickStart, setClickStart] = useState(false);
  const user = useAuth(null);

  const dispatch = useDispatch();

  const steps = ["top", "bottom", "shoes", "outer"];

  const getProducts = useCallback((body) => {
    Axios.post("/api/product/products_select", body).then((response) => {
      if (response.data.success) {
        setProducts(response.data.productInfo);
      } else {
        alert("상품들을 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  useEffect(() => {
    const body = {
      user: user?._id || null,
    };
    getProducts(body);
  }, [user, getProducts]);

  const handleClick = () => {
    steps.forEach((step, idx) => {
      const random = products.filter((product) => {
        return product.categories === idx + 1;
      });
      const randomItem = random[Math.floor(Math.random() * random.length)];
      randomItem &&
        dispatch(
          clothActions.randomSelect({
            value: randomItem.images[0],
            step: step,
            id: randomItem._id,
          })
        );
    });
    setClickStart(true);
  };

  return (
    <>
      {user?._id ? (
        <>
          {clickStart ? (
            <SelectCompletePage userId={user._id} />
          ) : (
            <RandomWaitPage products={products} userId={user._id} />
          )}
          <RandomButton onClick={handleClick}>Random</RandomButton>
        </>
      ) : (
        <RequestLogin />
      )}
    </>
  );
};

export default RandomSelectPage;
