import styled from "styled-components";

const EnlargeTitleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  margin-bottom: 20px;
  font-size: 20px;
  > h1 {
    margin: 0 auto;
  }
  > #cancelBtn {
    cursor: pointer;
    position: absolute;
    font-size: 30px;
    right: 10%;
    &:hover {
      color: #fff;
    }
  }
`;

const EnlargeTitle = ({ title, cancelToEnlarge }) => {
  return (
    <EnlargeTitleContainer>
      <h1>{title}</h1>
      <div onClick={() => cancelToEnlarge()} id="cancelBtn">
        &times;
      </div>
    </EnlargeTitleContainer>
  );
};

export default EnlargeTitle;
