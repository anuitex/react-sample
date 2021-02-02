import { HomeLayout } from 'layout/HomeLayout';
import * as React from 'react';
import { ProjectContainer } from '../container/ProjectContainer';

export function ProjectPage(): JSX.Element {
    return (
        <HomeLayout>
            <ProjectContainer />
        </HomeLayout>
    )
}