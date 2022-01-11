import { Button, Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter, Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu({ mode, onClose, selectkey, setKey }) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const handleClick = (e) => setKey(e.key);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      //div 없으면 표시안됨
      <div>
        <Menu mode={mode} onSelect={onClose} selectedKeys={selectkey}>
          <Menu.Item key="mail" onClick={handleClick}>
            <Link to="/login">SignIn</Link>
          </Menu.Item>
          <Menu.Item key="app" onClick={handleClick}>
            <Link to="/register">Signup</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  } else {
    return (
      <Menu mode={mode} onSelect={onClose} selectedKeys={selectkey}>
        <Menu.Item key="upload" onClick={handleClick}>
          <Link to="/product/upload">Upload</Link>
        </Menu.Item>
        <Menu.Item key="logout" onClick={handleClick}>
          <Button onClick={logoutHandler}>Logout</Button>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
