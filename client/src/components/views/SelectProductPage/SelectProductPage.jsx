import { Col, Card, Divider, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/auth";
import { clothActions } from "../../../_store/select_item";
import RequestLogin from "../RequestLogin/RequestLogin";
import "./SelectProductPage.css";
import SelectCompletePage from "./Sections/SelectCompltePage";
import StepBar from "./Sections/Steps";
import ControlButtons from "./Sections/ControlButtons";
import SelectList from "./Sections/SelectList";

const steps = ["top", "bottom", "shoes", "outer"];

const SelectProductPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [products, setProducts] = useState([]);

  const user = useAuth(null);
  const dispatch = useDispatch();
  const clothes = useSelector((state) => state.cloth);

  const completedSteps = Object.keys(completed).length;
  const totalSteps = steps.length;

  const getProducts = useCallback((body) => {
    Axios.post("/api/product/products_select", body).then((response) => {
      if (response.data.success) {
        setProducts(response.data.productInfo);
      } else {
        alert("상품들을 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  const handleClick = (e) => {
    dispatch(
      clothActions.selectProduct({
        value: { image: e.target.src, key: e.target.dataset.imgkey },
        step: steps[activeStep],
        id: e.target.dataset.id,
      })
    );
  };

  const allStepsCompleted = () => {
    return completedSteps === totalSteps;
  };

  useEffect(() => {
    dispatch(clothActions.selectInit());
    const body = {
      user: user?._id || null,
    };
    getProducts(body);
    return () => dispatch(clothActions.selectInit());
  }, [user, getProducts, dispatch]);

  const renderCards = products.map(
    (product, index) =>
      product.categories === activeStep + 1 && (
        <Col key={index} lg={6} md={8} xs={12}>
          <Card
            style={{
              margin: "0 10px",
              padding: "8px ",
              width: "100%",
              boxSizing: "border-box",
            }}
            cover={
              <img
                data-id={product._id}
                data-imgkey={product.images[0].key}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "contain",
                  cursor: "pointer",
                  opacity:
                    clothes[steps[activeStep]].id === product._id ? 0.7 : 1,
                }}
                alt={product.title}
                src={product.images[0].image}
                onClick={
                  completed[activeStep]
                    ? (e) => e.preventDefault()
                    : handleClick
                }
              />
            }
          >
            <Meta title={product.title} description={`$${product.price}`} />
          </Card>
        </Col>
      )
  );

  return allStepsCompleted() ? (
    // 결과페이지
    <SelectCompletePage userId={user?._id} />
  ) : (
    <>
      <StepBar
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={steps}
        completed={completed}
      />

      {/* 카드 렌더  */}
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        {user?._id ? renderCards : <RequestLogin />}
      </Row>

      <Divider />

      {/* 선택지 이동 버튼 */}
      {user?.id && (
        <ControlButtons
          activeStep={activeStep}
          steps={steps}
          completed={completed}
          setActiveStep={setActiveStep}
          setCompleted={setCompleted}
          totalSteps={totalSteps}
          completedSteps={completedSteps}
          allStepsCompleted={allStepsCompleted}
        />
      )}

      {/* 선택한 카드 리스트 */}
      <SelectList steps={steps} clothes={clothes} />
    </>
  );
};

export default SelectProductPage;
