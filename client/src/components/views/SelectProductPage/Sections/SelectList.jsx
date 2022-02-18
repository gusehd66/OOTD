import styled from "styled-components";

const SelectListContainer = styled.div`
  display: flex;
  width: 90%;
  gap: 0 10px;
  height: 25vh;
  margin: 15px;
  box-sizing: border-box;
  overflow: auto;
`;

const SelectList = ({ steps, clothes }) => {
  return (
    <SelectListContainer>
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
    </SelectListContainer>
  );
};

export default SelectList;
