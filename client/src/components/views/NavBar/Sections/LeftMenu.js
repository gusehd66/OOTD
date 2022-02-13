import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu({ mode, onClose, selectkey, setKey }) {
  const handleClick = (e) => {
    setKey(e.key);
    localStorage.setItem("id", e.key);
  };
  return (
    <Menu
      mode={mode}
      onSelect={onClose}
      selectedKeys={selectkey}
      style={{ minWidth: "200px" }}
    >
      <Menu.Item key="home" onClick={handleClick}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <SubMenu title={<span>Room</span>} key="submenu">
        <MenuItemGroup title="실험존">
          <Menu.Item key="select" onClick={handleClick}>
            <Link to="/product/select">Select</Link>
          </Menu.Item>
          <Menu.Item key="setting:2" onClick={handleClick}>
            <Link to="/product/random">Random</Link>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
