import { Button } from "antd";
import { useDispatch } from "react-redux";
import { clothActions } from "../../../../_store/select_item";

const ControlButtons = ({
  activeStep,
  steps,
  completed,
  setActiveStep,
  setCompleted,
  totalSteps,
  completedSteps,
  allStepsCompleted,
}) => {
  const dispatch = useDispatch();

  const isLastStep = () => {
    return activeStep === totalSteps - 1;
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

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  return (
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
            {completedSteps === totalSteps - 1 ? "Finish" : "Complete"}
          </Button>
        ))}
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
};

export default ControlButtons;
