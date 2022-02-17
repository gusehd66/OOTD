import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 20px;
  font-weight: bold;
  > h1 {
    font-size: 50px;
    margin: 0;
    text-shadow: 3px 3px 3px #666;
    background-color: #222;
    border-radius: 10px;
    padding: 20px;
    color: #fff;
    box-shadow: 5px 5px 5px #444;
  }
  > h2 {
    font-size: 40px;
    color: #fff;
    text-shadow: 5px 5px 4px #444;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>페이지가 존재하지 않습니다.</p>
      <p>링크를 잘못 입력하셨거나 페이지가 삭제 또는 이동되었을 수 있습니다.</p>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
