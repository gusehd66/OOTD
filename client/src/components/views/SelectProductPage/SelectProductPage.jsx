// const SelectProductPage = () => {
//   return <div>select</div>;
// };

import { Steps, Button, Col, Card, Divider } from "antd";
import Meta from "antd/lib/card/Meta";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SelectProductPage.css";

const { Step } = Steps;

const steps = ["Top", "Bottom", "Shoes", "Outer"];

const SelectProductPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);

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

  useEffect(() => {
    const body = {
      skip,
      limit,
    };
    getProducts(body);
  }, [skip, limit, getProducts]);

  const renderCards = products.map((product, index) => {
    if (
      product.writer._id === user?._id &&
      product.categories === activeStep + 1
    ) {
      return (
        <Col key={index} lg={6} md={8} sm={24}>
          <Card
            style={{ margin: "10px", padding: "8px" }}
            cover={
              <img
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  objectFit: "contain",
                }}
                alt={product.title}
                src={`https://ootd-dongit.herokuapp.com/${product.images[0]}`}
              />
            }
          >
            <Meta title={product.title} description={`$${product.price}`} />
          </Card>
        </Col>
      );
    } else {
      return null;
    }
  });

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
    </>
  );
};

export default SelectProductPage;
