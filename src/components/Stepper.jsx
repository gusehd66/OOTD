import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageLists from "./ImageList";
import { SelectContext } from "../context/context";
import { useState, useContext, useEffect } from "react";
import SelectCard from "./SelectCard";
import ResultComponent from "./ResultComponent";
import { useDispatch, useSelector } from "react-redux";

const steps = ["top", "bottom", "shoes", "outer"];

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { select, setSelect } = useContext(SelectContext);
  const dispatch = useDispatch();
  const clothes = useSelector((state) => state);

  useEffect(() => {
    return () => {
      setSelect({
        top: "",
        bottom: "",
        shoes: "",
        outer: "",
      });
      dispatch({ type: "init" });
    };
  }, [setSelect, dispatch]);

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

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setSelect({
      top: "",
      bottom: "",
      shoes: "",
      outer: "",
    });
    dispatch({ type: "init" });
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%", padding: 2, boxSizing: "border-box" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton onClick={handleStep(index)}>
              <Typography fontFamily="GmarketM" color="#f2ecff">
                {label}
              </Typography>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {allStepsCompleted() ? (
        <>
          <ResultComponent />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }} component={"div"}>
            <ImageLists
              activeStep={steps[activeStep]}
              completed={completed[activeStep]}
            />
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <Typography variant="caption" sx={{ display: "inline-block" }}>
                  Step {activeStep + 1} already completed
                </Typography>
              ) : (
                <Button onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1
                    ? "Finish"
                    : "Complete Step"}
                </Button>
              ))}
          </Box>
          <div
            style={{
              display: "flex",
              width: "100%",
              overflowX: "scroll",
              gap: "0 10px",
              height: "15vh",
            }}
          >
            {steps.map((item) => {
              return (
                <div>
                  {select[item] && (
                    <SelectCard imgsrc={select[item]} key={select[item]} />
                  )}
                  {clothes[item] && (
                    <SelectCard imgsrc={clothes[item]} key={clothes[item]} />
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </Box>
  );
};

export default StepperComponent;
