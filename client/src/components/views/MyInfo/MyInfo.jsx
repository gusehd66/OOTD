import useAuth from "../../../hooks/auth";
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import OpenNameModal from "../../utils/NameModal";

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

const Portal = (props) => {
  return createPortal(props.children, document.getElementById("nameModal"));
};

const MyInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth(true);

  return (
    <>
      <Portal>
        {isOpen && <OpenNameModal user={user} setIsOpen={setIsOpen} />}
      </Portal>
      <MyInfoContainer>
        <div className="user-info">
          <div>
            {user?.name}
            <span className="edit-btn">
              <EditOutlined onClick={() => setIsOpen(true)} />
            </span>
          </div>
          <div>{user?.email}</div>
        </div>

        <div className="favorite">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i}>{i} Box</div>
          ))}
        </div>
      </MyInfoContainer>
    </>
  );
};

export default MyInfo;
