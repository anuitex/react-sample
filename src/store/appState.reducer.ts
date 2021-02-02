import { Action } from 'redux';
import { defineAction } from 'rd-redux-utils';

export interface ErrorAppState {
    status: "initial" | "error" | "running";
    statusCode?: number;
    message?: string;
}

export const appStateAction = defineAction<ErrorAppState>("ERROR_APP");
export const clearAppStateAction = defineAction("CLEAR_ERROR_APP");

export function appStateReducer(state: ErrorAppState = { status: "initial" }, action: Action): ErrorAppState {
    if (appStateAction.is(action)) {
        return {
            ...state,
            status: action.status,
            statusCode: action.statusCode,
            message: action.message
        };
    }
    if (clearAppStateAction.is(action)) {
        return {
            ...state,
            status: "initial",
            statusCode: undefined,
            message: ""
        };
    }
    return state;
}
