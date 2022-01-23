import { Button } from "antd";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../../../hooks/auth";
import { randomSelect } from "../../../_actions/select_actions";
import RequestLogin from "../RequestLogin/RequestLogin";
import SelectCompletePage from "../SelectProductPage/Sections/SelectCompltePage";
import RandomWaitPage from "./Sections/RandomWaitPage";

const RandomSelectPage = () => {
  const [products, setProducts] = useState([]);
  const [clickStart, setClickStart] = useState(false);

  const user = useAuth(null);

  const dispatch = useDispatch();

  const steps = ["top", "bottom", "shoes", "outer"];

  const getProducts = useCallback(async (body) => {
    await Axios.post("/api/product/products_select", body).then((response) => {
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
          randomSelect({
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
            <SelectCompletePage />
          ) : (
            <RandomWaitPage products={products} />
          )}
          <Button
            onClick={handleClick}
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "30px",
            }}
          >
            Random
          </Button>
        </>
      ) : (
        <RequestLogin />
      )}
    </>
  );
};

export default RandomSelectPage;
