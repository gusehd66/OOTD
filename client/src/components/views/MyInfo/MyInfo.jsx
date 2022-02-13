import useAuth from "../../../hooks/auth";
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";
import { createPortal } from "react-dom";
import { useState } from "react";
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
`;

const FavoriteContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 16px 40px;
  margin: 16px;
  box-sizing: border-box;
  flex: 1;
  border-top: solid 1px black;
  justify-content: flex-start;
  > .content-box {
    width: 240px;
    height: 240px;
    text-align: center;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 6px 6px 6px #666;
    margin: 8px;
    &:hover {
      transition: 0.3s;
      transform: scale(1.03);
    }
    > h3 {
      font-weight: bold;
      height: 10%;
      margin: 0;
    }
    > .content-images {
      height: 90%;
      width: 100%;
      display: flex;
      flex: 1 1 40%;
      flex-wrap: wrap;
      > div {
        width: 50%;
        height: 50%;
        > img {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
    }
  }

  @media screen and (max-width: 770px) {
    justify-content: center;
  }
`;

const Portal = (props) => {
  return createPortal(props.children, document.getElementById("nameModal"));
};

const MyInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth(true);
  const categories = user && Object.keys(user.favorite[0].clothes);

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

        <FavoriteContent>
          {user?.favorite.map((favorite, index) => (
            <div className="content-box" key={index}>
              <h3>{favorite.key} Box</h3>
              <div className="content-images">
                {categories.map((category) => (
                  <div key={category}>
                    <img
                      key={favorite.clothes[category].id}
                      src={favorite.clothes[category].src.image}
                      alt="img"
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </FavoriteContent>
      </MyInfoContainer>
    </>
  );
};

export default MyInfo;
