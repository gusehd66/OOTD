import Axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { LoadMore } from "../views/LandingPage/LandingPage";
import { USER_SERVER } from "../Config";
import { useDispatch } from "react-redux";
import { auth } from "../../_actions/user_actions";

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

const OpenNameModal = ({ user, setIsOpen }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const onNameChange = (event) => {
    setName(event.currentTarget.value);
  };

  const modalSubmit = () => {
    const body = { id: user._id, name };
    name.trim() === ""
      ? alert("닉네임은 공백을 사용할 수 없습니다.")
      : Axios.post(`${USER_SERVER}/name-change`, body).then((response) => {
          if (response.data.success) {
            alert("닉네임 변경을 성공했습니다.");
          } else {
            alert("닉네임 변경을 실패했습니다.");
          }
          dispatch(auth());
          setIsOpen(false);
        });
  };

  return (
    <ModalBackGround>
      <div className="modal-box">
        <button onClick={() => setIsOpen(false)} className="modal-cancel">
          &times;
        </button>
        <p>닉네임 수정</p>
        <input type="text" value={name} onChange={onNameChange} />
        <p>현재 닉네임: {user.name}</p>
        <ModalSubmit className="modal-submit" onClick={() => modalSubmit()}>
          완료
        </ModalSubmit>
      </div>
    </ModalBackGround>
  );
};

export default OpenNameModal;
