// const SelectProductPage = () => {
//   return <div>select</div>;
// };

import { Steps, Button, Col, Card, Divider } from "antd";
import Meta from "antd/lib/card/Meta";
import Axios from "axios";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInit, selectProduct } from "../../../_actions/select_actions";
import "./SelectProductPage.css";

const { Step } = Steps;

const steps = ["top", "bottom", "shoes", "outer"];

const SelectProductPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);

  const dispatch = useDispatch();
  const clothes = useSelector((state) => state.selectItem);
  console.log(clothes);
  // console.log(steps[activeStep]);

  const user = useSelector((state) => state.user.userData);

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
    dispatch(selectInit());
  };

  const getProducts = useCallback(async (body) => {
    await Axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts((products) => [
            ...products,
            ...response.data.productInfo,
          ]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  const handleClick = (e) => {
    dispatch(
      selectProduct({
        value: e.target.src,
        step: steps[activeStep],
        id: e.target.dataset.id,
      })
    );
  };

  useEffect(() => {
    dispatch(selectInit());
    const body = {
      skip,
      limit,
      user: user?._id || null,
    };
    getProducts(body);
    return () => dispatch(selectInit());
  }, [skip, limit, user, getProducts, dispatch]);

  const renderCards = products.map(
    (product, index) =>
      product.categories === activeStep + 1 && (
        <Col key={index} lg={6} md={8} sm={24}>
          <Card
            style={{ margin: "10px", padding: "8px " }}
            cover={
              <img
                data-id={product._id}
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  objectFit: "contain",
                  cursor: "pointer",
                  opacity:
                    clothes[steps[activeStep]].id === product._id ? 0.7 : 1,
                }}
                alt={product.title}
                src={`https://ootd-dongit.herokuapp.com/${product.images[0]}`}
                onClick={
                  completed[index] ? (e) => e.preventDefault() : handleClick
                }
              />
            }
          >
            <Meta title={product.title} description={`$${product.price}`} />
          </Card>
        </Col>
      )
  );

  return (
    <>
      <Steps
        type="navigation"
        current={activeStep}
        onChange={onChange}
        direction="horizontal "
        style={{ padding: "10px" }}
        size="small"
      >
        {steps.map((label, index) => (
          <Step
            style={{ width: "100px" }}
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
      {renderCards}

      <Divider />
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
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "0 10px",
          height: "15vh",
          padding: "0 15px",
          boxSizing: "border-box",
        }}
      >
        {steps.map((item, index) => {
          return (
            <Fragment key={index}>
              {clothes[item].src && <img src={clothes[item].src} alt="img" />}
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default SelectProductPage;
