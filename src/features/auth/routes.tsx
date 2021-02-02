import React from "react";
import { Route } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { LOGIN_PAGE_URL } from "./urls";

export const AuthRoutes = [
    <Route key="auth-login" path={LOGIN_PAGE_URL.urlTemplate} component={LoginPage} />
]