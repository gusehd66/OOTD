import { Button } from "antd";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { randomSelect } from "../../../_actions/select_actions";
import SelectCompletePage from "../SelectProductPage/Sections/SelectCompltePage";

const RandomSelectPage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

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

  const handleClick = () =>
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

  return (
    <>
      <SelectCompletePage />
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
  );
};

export default RandomSelectPage;
