import { all } from "redux-saga/effects";
import {
    handleCreateProjectSaga,
    handleGetAllProjectsSaga,
    handleGetProjectSaga,
    handleSearchFeaturesSaga,
    handleUpdateProjectSaga,
    handleAddFeaturesSaga
} from "./handleProject";

export function* projectSaga() {
    yield all([
        handleCreateProjectSaga(),
        handleGetProjectSaga(),
        handleUpdateProjectSaga(),
        handleSearchFeaturesSaga(),
        handleGetAllProjectsSaga(),
        handleAddFeaturesSaga()
    ]);
}