import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu({ mode }) {
  return (
    <Menu mode={mode}>
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <SubMenu title={<span>Room</span>} key="submenu">
        <MenuItemGroup title="실험존">
          <Menu.Item key="select">
            <Link to="/product/select">Select</Link>
          </Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
