import * as React from 'react';
import { AuthenticatedRouteGuard } from '../../shared/helpers/authenticatedRouteGuard.helper';
import { AllProjectsPage } from './pages/AllProjectsPage';
import { ProjectPage } from './pages/ProjectPage';
import { ALL_PROJECTS_URL, EDIT_PROJECT, HOME_PAGE_URL } from './urls';

export const ProjectsRoutes: JSX.Element[] = [
    <AuthenticatedRouteGuard key="all-projects-page" path={ALL_PROJECTS_URL.urlTemplate} component={AllProjectsPage} />,
    <AuthenticatedRouteGuard key="home-page-create" path={HOME_PAGE_URL.urlTemplate} component={ProjectPage} />,
    <AuthenticatedRouteGuard key="home-page-edit" path={EDIT_PROJECT.urlTemplate} component={ProjectPage} />

];