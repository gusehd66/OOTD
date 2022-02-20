import { Link } from "react-router-dom";
import styled from "styled-components";

const RequestContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
  margin: 20px 0;
`;

const SampleLogin = styled.div`
  line-height: 1.2rem;
  margin: 10px 0 50px;
`;

const RegisterButton = styled.h3`
  & > a {
    color: white;
    border: solid 1px;
    border-radius: 10px;
    padding: 10px;
    background-color: #1890ff;
    transition: 0.6s;
    &:hover {
      color: #1890ff;
      background-color: white;
    }
  }
`;

const RequestLogin = () => {
  return (
    <RequestContainer>
      <h1>
        <Link to="/login">로그인</Link>을 해주세요.
      </h1>
      <SampleLogin>
        Sample ID : test1234@naver.com
        <br />
        Sample PASSWORD : test123
      </SampleLogin>
      <RegisterButton>
        <Link to="/register">회원가입</Link>
      </RegisterButton>
    </RequestContainer>
  );
};

export default RequestLogin;
