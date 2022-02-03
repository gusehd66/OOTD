import { useState } from "react";
import styled from "styled-components";
import { LoadMore } from "../views/LandingPage/LandingPage";

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
    position: relative;
    width: 300px;
    height: 300px;
    background-color: white;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .modal-cancel {
      cursor: pointer;
      background-color: white;
      border: none;
    }
    > p {
      margin-top: 8px;
    }
    > input {
      line-height: 24px;
      width: 80%;
      border: solid 1px #888;
      &:focus-within {
        border: solid 1px #1b273f;
        outline: none;
      }
    }
  }
`;

const ModalSubmit = styled(LoadMore)`
  width: 80%;
  bottom: 16px;
  position: absolute;
`;

const OpenNameModal = ({ nickName, setIsOpen }) => {
  const [name, setName] = useState("");
  const onNameChange = (event) => {
    setName(event.currentTarget.value);
  };
  return (
    <ModalBackGround>
      <div className="modal-box">
        <button onClick={() => setIsOpen(false)} className="modal-cancel">
          &times;
        </button>
        <p>닉네임 수정</p>
        <input type="text" value={name} onChange={onNameChange} />
        <p>현재 닉네임: {nickName}</p>
        <ModalSubmit className="modal-submit">완료</ModalSubmit>
      </div>
    </ModalBackGround>
  );
};

export default OpenNameModal;
