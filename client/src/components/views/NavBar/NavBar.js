import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AlignRightOutlined } from "@ant-design/icons";

function NavBar() {
  const [visible, setVisible] = useState(false);
  const [selectKey, setSelectKey] = useState("home");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className="menu">
      <div className="menu__logo" onClick={() => setSelectKey("home")}>
        <Link to="/">Dongit</Link>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu
            mode="horizontal"
            selectkey={selectKey}
            setKey={setSelectKey}
          />
        </div>
        <div className="menu_rigth">
          <RightMenu
            mode="horizontal"
            selectkey={selectKey}
            setKey={setSelectKey}
          />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <AlignRightOutlined />
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
          width={"65%"}
        >
          <LeftMenu
            mode="inline"
            onClose={onClose}
            selectkey={selectKey}
            setKey={setSelectKey}
          />
          <RightMenu
            mode="inline"
            onClose={onClose}
            selectkey={selectKey}
            setKey={setSelectKey}
          />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
