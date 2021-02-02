import { Action } from "redux";
import { loginAtServerCompletedAction, loginAtServerStartedAction } from "./saga/handleLogin";

export interface AuthAppState {
    status: "initial" | "running" | "success" | "error";
    error?: string;
}

export function authReducer(state: AuthAppState = { status: "initial" }, action: Action): AuthAppState {
    if (loginAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        };
    }
    if (loginAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error
        };
    }

    return state;
}
