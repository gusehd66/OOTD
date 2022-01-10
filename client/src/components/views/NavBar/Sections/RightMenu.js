import { Button, Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter, Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu({ mode }) {
  const user = useSelector((state) => state.user);
  const history = useHistory();

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
        <Menu mode={mode}>
          <Menu.Item key="mail">
            <Link to="/login">SignIn</Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to="/register">Signup</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  } else {
    return (
      <Menu mode={mode}>
        <Menu.Item key="upload">
          <Link to="/product/upload">Upload</Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Button onClick={logoutHandler}>Logout</Button>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
