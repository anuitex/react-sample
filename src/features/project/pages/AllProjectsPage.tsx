import { HomeLayout } from "layout/HomeLayout";
import React from "react";
import { AllProjectsContainer } from "../container/AllProjectsContainers";


// eslint-disable-next-line no-empty-pattern
export function AllProjectsPage(): JSX.Element {
    return (
        <HomeLayout>
            <AllProjectsContainer />
        </HomeLayout>

    )
}