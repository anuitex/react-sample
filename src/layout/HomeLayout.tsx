import { Layout } from "antd";
import { logOut } from "../shared/helpers/token.helper";
import React, { useCallback, useState } from "react";
import { Logo } from "../shared/components/Logo/Logo";
import { SideMenu } from "../shared/components/SideMenu/SideMenu";
import "./HomeLayout.scss";

export interface HomeMenuLayoutProps {
    children: React.ReactChild | React.ReactChild[]
}

const { Header, Sider, Content } = Layout;


export function HomeLayout({ children }: HomeMenuLayoutProps) {
    let initialMenuCollapsed: boolean = false;

    const [stateMenuCollapsed, setStateMenuCollapsed] = useState<boolean>(
        initialMenuCollapsed
    );

    const handleMenuCollapsed = useCallback(
        (isOpen) => {
            setStateMenuCollapsed(isOpen)
        }, []
    )
    return (
        <Layout key="HomeLayout" className="HomeLayout"
        >
            <Header key="HomeLayout-header">
                <Logo />
                <div onClick={logOut}>Logout </div>
            </Header>
            <Layout>
                <Sider collapsed={stateMenuCollapsed} >
                    <SideMenu onChange={handleMenuCollapsed} collapsed={stateMenuCollapsed} />
                </Sider>
                <Content className="SideMenuLayout_content">{children}</Content>
            </Layout>
        </Layout>
    )
}