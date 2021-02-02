import { all } from "redux-saga/effects";
import { handleLoginSaga } from "./handleLogin";

export function* authSaga() {
    yield all([handleLoginSaga()]);
}