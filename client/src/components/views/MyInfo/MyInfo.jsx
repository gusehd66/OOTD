import useAuth from "../../../hooks/auth";
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";
import { createPortal } from "react-dom";
import { useState } from "react";

const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .user-info {
    text-align: left;
    margin: 16px 0;
    > :nth-child(1) {
      font-size: 32px;
    }
    .edit-btn {
      cursor: pointer;
    }
  }
  .favorite {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 16px 40px;
    margin: 16px;
    box-sizing: border-box;
    flex: 1;
    border-top: solid 2px black;
    justify-content: flex-start;
    > div {
      width: 240px;
      height: 240px;
      text-align: center;
      border: solid 1px black;
      margin: 8px;
    }
  }
`;

const ModalBackGround = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  background-color: rgba(214, 218, 218, 0.8);
  justify-content: center;
  align-items: center;
  > .modal-box {
    width: 300px;
    height: 300px;
    background-color: white;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Portal = (props) => {
  return createPortal(props.children, document.getElementById("nameModal"));
};
const MyInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAuth();

  const OpenNameModal = () => {
    return (
      <ModalBackGround>
        <div className="modal-box">
          <button onClick={() => setIsOpen(false)}>&times;</button>
          <p>닉네임 수정 공간</p>
        </div>
      </ModalBackGround>
    );
  };

  return (
    <>
      <Portal>{isOpen && <OpenNameModal />}</Portal>
      <MyInfoContainer>
        <div className="user-info">
          <div>
            {user.name}
            <span className="edit-btn">
              <EditOutlined onClick={() => setIsOpen(true)} />
            </span>
          </div>
          <div>{user.email}</div>
        </div>

        <div className="favorite">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div>{i} Box</div>
          ))}
        </div>
      </MyInfoContainer>
    </>
  );
};

export default MyInfo;
