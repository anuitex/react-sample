import { all } from "redux-saga/effects";
import { handleHomeSaga } from "./handleHome";

export function* homeSaga() {
    yield all([handleHomeSaga()]);
}