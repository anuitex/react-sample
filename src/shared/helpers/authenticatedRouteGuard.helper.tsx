import React from "react";
import { Redirect, Route } from "react-router";
import { LocalStorageService } from "../services/localStorage.service";
import { LOGIN_PAGE_URL } from "../../features/auth";

interface AuthProps {
    component: () => JSX.Element;
    key: string;
    path: string;
}

export function AuthenticatedRouteGuard({ component, key, path, ...rest }: AuthProps) {
    const isAuth: boolean = LocalStorageService.getAuth;
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth) {
                    return component();
                } else {
                    return <Redirect to={{ pathname: LOGIN_PAGE_URL.urlTemplate, state: { from: props.location } }} />;
                }
            }}
        />
    );
}