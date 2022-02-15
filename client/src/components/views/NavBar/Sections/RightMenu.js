import { Button, Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu({ mode, onClose, selectkey, setKey }) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const handleClick = (e) => {
    setKey(e.key);
    sessionStorage.setItem("id", e.key);
  };

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  return (
    <Menu
      mode={mode}
      onSelect={onClose}
      selectedKeys={selectkey}
      style={{ minWidth: "340px", justifyContent: "flex-end" }}
    >
      {user.userData && !user.userData.isAuth ? (
        <>
          <Menu.Item key="mail" onClick={handleClick}>
            <Link to="/login">SignIn</Link>
          </Menu.Item>
          <Menu.Item key="app" onClick={handleClick}>
            <Link to="/register">Signup</Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="info" onClick={handleClick}>
            <Link to="/myInfo">My Info</Link>
          </Menu.Item>
          <Menu.Item key="upload" onClick={handleClick}>
            <Link to="/product/upload">Upload</Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleClick}>
            <Button onClick={logoutHandler}>Logout</Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}

export default RightMenu;
