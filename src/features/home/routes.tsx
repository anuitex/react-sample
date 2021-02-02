import React from 'react';
import { AuthenticatedRouteGuard } from '../../shared/helpers/authenticatedRouteGuard.helper';
import { HomePage } from './pages/HomePage';
import { MAIN_ASSET_URL } from './urls';

export const StatisticsRoutes: JSX.Element[] = [
    <AuthenticatedRouteGuard key="home-page" path={MAIN_ASSET_URL.urlTemplate} component={HomePage} />,
];