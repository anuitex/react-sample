import { ProjectsRoutes } from "features/project/routes";
import { MAIN_ASSET_URL } from "features/home";
import React from "react";
import { Redirect } from "react-router";
import { AuthRoutes } from "./features/auth";
import { StatisticsRoutes } from "./features/home/routes";

export const AppRoutes = [
  ...AuthRoutes,
  ...ProjectsRoutes,
  ...StatisticsRoutes,
  <Redirect
    key="main-home-page"
    from="/"
    to={MAIN_ASSET_URL.format({ asset: "Statistics" })}
  />,
];
