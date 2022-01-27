import { Steps, Button, Col, Card, Divider, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/auth";
import { clothActions } from "../../../_store/select_item";
import RequestLogin from "../RequestLogin/RequestLogin";
import SelectCompletePage from "./Sections/SelectCompltePage";
import styled from "styled-components";
import "./SelectProductPage.css";

const { Step } = Steps;

const steps = ["top", "bottom", "shoes", "outer"];

const SelectList = styled.div`
  display: flex;
  width: 90%;
  gap: 0 10px;
  height: 25vh;
  margin: 15px;
  box-sizing: border-box;
  overflow: auto;
`;

const SelectProductPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [products, setProducts] = useState([]);

  const user = useAuth(null);

  const dispatch = useDispatch();
  const clothes = useSelector((state) => state.cloth);

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const onChange = (step) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    dispatch(clothActions.selectInit());
  };

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
    <SelectCompletePage />
  ) : (
    <>
      <Steps
        type="navigation"
        current={activeStep}
        onChange={onChange}
        direction="horizontal "
        style={{ padding: "10px", flexDirection: "row" }}
        size="small"
      >
        {steps.map((label, index) => (
          <Step
            style={{ width: "0" }}
            key={label}
            title={label}
            status={
              completed[index]
                ? "finish"
                : activeStep === index
                ? "process"
                : "wait"
            }
          />
        ))}
      </Steps>

      {/* Select Page */}
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        {user?._id ? renderCards : <RequestLogin />}
      </Row>

      <Divider />
      <div
        style={{ display: "flex", justifyContent: "center", columnGap: "10px" }}
      >
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Prev
        </Button>
        <Button onClick={handleNext}>Next</Button>
        {activeStep !== steps.length &&
          (completed[activeStep] ? (
            <span>{activeStep + 1} already completed</span>
          ) : (
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1 ? "Finish" : "Complete"}
            </Button>
          ))}
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <SelectList>
        {steps.map((item, index) => {
          return (
            clothes[item].src && (
              <img
                src={clothes[item].src.image}
                alt="img"
                key={index}
                style={{ margin: "8px 10px" }}
              />
            )
          );
        })}
      </SelectList>
    </>
  );
};

export default SelectProductPage;
