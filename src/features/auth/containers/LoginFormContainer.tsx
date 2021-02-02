//Vendors
import React, { Dispatch, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store/app-state";
//Models
import {
  LoginFormComponent
} from "../components/LoginFormComponent";
import { RequestLoginModel } from "../models";
//Actions
import { loginAction } from "../store/actions";


export interface LoginFormContainerProps { }

// eslint-disable-next-line no-empty-pattern
export function LoginFormContainer({ }: LoginFormContainerProps): JSX.Element {

  const dispatch = useDispatch<Dispatch<{ loginModel: RequestLoginModel }>>();

  const handleLogin = useCallback(
    (loginModel: RequestLoginModel) => {
      dispatch(loginAction({ loginModel }));
    },
    [dispatch]
  );

  const loading: boolean = useSelector<AppState, boolean>((state): boolean => {
    return state.auth.status === "running";
  });

 


  return (
    <LoginFormComponent
      value={{
        email: "",
        password: "",
      }}
      loading={loading}
      onChange={handleLogin} />
  );
}
