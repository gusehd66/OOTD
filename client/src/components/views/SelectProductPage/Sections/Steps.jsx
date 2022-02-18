import { Steps } from "antd";

const { Step } = Steps;

const StepBar = ({ setActiveStep, activeStep, completed, steps }) => {
  const onChange = (step) => {
    setActiveStep(step);
  };

  return (
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
  );
};

export default StepBar;
