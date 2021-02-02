import { FundProjectionScreenOutlined, LineChartOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import SubMenu from "antd/lib/menu/SubMenu";
import { MAIN_ASSET_URL } from "features/home";
import { ALL_PROJECTS_URL, CREATE_PROJECT } from "features/project/urls";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./SideMenu.scss";

export interface SideMenuProps {
  collapsed: boolean;
  onChange: (isOpen: boolean) => void
}



export function SideMenu({ onChange, collapsed }: SideMenuProps) {
  const history = useHistory();
  const [stateMenuCollapsed, setStateMenuCollapsed] = useState<boolean>(collapsed);

  const toggleCollapsedMenu = () => {
    setStateMenuCollapsed(!stateMenuCollapsed);
    onChange(!stateMenuCollapsed)
  };

  const handleRedirect = (event: any) => {
    history.push(event.key);
  }

  return (
    <Menu theme="dark" mode="inline">
      <MenuItem key={MAIN_ASSET_URL.urlTemplate} icon={<LineChartOutlined />} onClick={handleRedirect}>Statistics</MenuItem>
      <SubMenu icon={<FundProjectionScreenOutlined />} title="Projects">
        <MenuItem key={CREATE_PROJECT.urlTemplate} onClick={handleRedirect}>Create new project</MenuItem>
        <MenuItem key={ALL_PROJECTS_URL.urlTemplate} onClick={handleRedirect}>View All Projects </MenuItem>
        <MenuItem>View My Projects </MenuItem>
      </SubMenu>
      <Menu.Item
        key="menu-collapsed"
        className="icon-menu"
        onClick={toggleCollapsedMenu}
        icon={
          !stateMenuCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
        }
      ></Menu.Item>
    </Menu>
  );
}
