import useAuth from "../../../hooks/auth";
import styled from "styled-components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { createPortal } from "react-dom";
import { useState } from "react";
import OpenNameModal from "../../utils/NameModal";
import EnlargeContent from "./Sections/EnlargeContent";
import EnlargeTitle from "./Sections/EnlargeTitle";
import { useDispatch } from "react-redux";
import { auth, deleteFavorite } from "../../../_actions/user_actions";

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
    cursor: pointer;
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

const DeleteBtn = styled.button`
  cursor: pointer;
  position: absolute;
  top: 220px;
  left: 50px;
  height: 40px;
  color: #fff;
  border: solid 1px #fff;
  box-shadow: 3px 3px 5px #555;
  border-radius: 5px;
  width: 140px;
  transition: 0.2s;
  font-weight: bold;
  background-color: #ff5454;
  > .delete-btn {
    margin-left: 5px;
  }
  &:hover {
    background-color: #fff;
    color: #ff5454;
    animation: bigger 2s;
    animation-iteration-count: 3;
  }
  @media screen and (max-width: 770px) {
    top: 215px;
    left: 25px;
    width: 40px;
    > .delete-btn {
      display: none;
    }
  }

  @keyframes bigger {
    50% {
      transform: scale(1.05);
    }
  }
`;

const Portal = (props) => {
  return createPortal(props.children, document.getElementById("nameModal"));
};

const MyInfo = () => {
  const [openNameModal, setOpenNameModal] = useState(false);
  const [enlargeContent, setEnlargeContent] = useState({
    open: false,
    favorite: {},
    index: 0,
  });
  const user = useAuth(true);
  const dispatch = useDispatch();

  const categories =
    user?.favorite?.length && Object.keys(user?.favorite[0].clothes);

  const cancelToEnlarge = () => {
    setEnlargeContent({ ...enlargeContent, open: false });
  };

  const FavoriteDelete = () => {
    const confirm = window.confirm("즐겨찾기를 삭제하시겠습니까?");
    confirm &&
      dispatch(
        deleteFavorite({
          favorite: enlargeContent,
          id: user?._id,
        })
      ).then((response) => {
        if (response.payload.success) {
          alert("삭제를 완료했습니다.");
          dispatch(auth());
          setEnlargeContent({ ...enlargeContent, open: false });
        } else {
          alert("삭제를 실패했습니다.");
        }
      });
  };

  return (
    <>
      <Portal>
        {openNameModal && (
          <OpenNameModal user={user} setIsOpen={setOpenNameModal} />
        )}
      </Portal>
      <MyInfoContainer>
        <div className="user-info">
          <div>
            {user?.name}
            <span className="edit-btn">
              <EditOutlined onClick={() => setOpenNameModal(true)} />
            </span>
          </div>
          <div>{user?.email}</div>
        </div>

        <FavoriteContent>
          {enlargeContent.open ? (
            <>
              <DeleteBtn onClick={FavoriteDelete}>
                <DeleteOutlined />
                <span className="delete-btn">Delete Favorite</span>
              </DeleteBtn>
              <EnlargeTitle
                title={user?.favorite[enlargeContent.index].key}
                cancelToEnlarge={cancelToEnlarge}
              />
              <EnlargeContent
                categories={categories}
                favorites={user?.favorite[enlargeContent.index]}
              />
            </>
          ) : (
            user?.favorite.map((favorite, index) => (
              <div
                className="content-box"
                key={index}
                onClick={() =>
                  setEnlargeContent({ favorite, index, open: true })
                }
              >
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
            ))
          )}
        </FavoriteContent>
      </MyInfoContainer>
    </>
  );
};

export default MyInfo;
