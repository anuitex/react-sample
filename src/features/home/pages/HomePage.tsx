//Vendors
import React from "react";
//Components
import { HomeLayout } from "../../../layout/HomeLayout";
import { HomeContainer } from '../containers/HomeContainers';
//Styles
import "./HomePage.scss";


export function HomePage(): JSX.Element {
    return (
        <HomeLayout>
            <HomeContainer />
        </HomeLayout>
    )
}