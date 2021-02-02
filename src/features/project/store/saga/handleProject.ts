import { AxiosResponse } from "axios";
import { API_SERVERS } from "config";
import { push } from "connected-react-router";
import { RequestCreateProjectModel, RequestSearchAddedFeaturesModel, RequestSearchFeaturesModel, RequestSearchProjectsModel, RequestUpdateProjectModel, ResponseCreateProjectModel, ResponseProjectModel, ResponseSearchAddedFeaturesModel, ResponseSearchFeaturesModel, ResponseSearchProjectsModel } from "features/project/models";
import { defineAction } from "rd-redux-utils";
import { put, takeEvery } from "redux-saga/effects";
import { ErrorExecutionResultModelItem } from "shared/models/response-execution.model";
import { axiosApi } from "../../../../shared/interceptors";
import { appStateAction } from "../../../../store/appState.reducer";
import { createProjectAction, getAllProjectsAction, getProjectAction, searchAddedFeaturesAction, searchFeaturesAction, updateProjectAction } from "../actions";
import { ProjectState } from "../reducer";

export const createProjectAtServerStartedAction = defineAction<ProjectState>(
    "CREATE_PROJECT_STARTED"
);

export const createProjectAtServerCompletedAction = defineAction<ProjectState>(
    "PROJECT_CREATE_SUCCESS"
);

export const getProjectAtServerStartedAction = defineAction<ProjectState>(
    "GET_PROJECT_AT_SERVER_STARTED"
);

export const getProjectAtServerCompletedAction = defineAction<ProjectState>(
    "GET_PROJECT_AT_SERVER_COMPLETED"
);


export const updateProjectAtServerStartedAction = defineAction<ProjectState>(
    "UPDATE_PROJECT_AT_SERVER_STARTED"
);

export const updateProjectAtServerCompletedAction = defineAction<ProjectState>(
    "UPDATE_PROJECT_AT_SERVER_COMPLETED"
);

export const searchFeaturesAtServerStartedAction = defineAction<ProjectState>(
    "SEARCH_FEATURES_AT_SERVER_STARTED"
);

export const searchFeaturesAtServerCompletedAction = defineAction<ProjectState>(
    "SEARCH_FEATURES_AT_SERVER_COMPLETED"
);

export const searchProjectsAtServerStartedAction = defineAction<ProjectState>(
    "SEARCH_PROJECTS_AT_SERVER_STARTED"
);

export const searchProjectsAtServerCompletedAction = defineAction<ProjectState>(
    "SEARCH_PROJECTS_AT_SERVER_COMPLETED"
);

export const searchAddFeaturesAtServerStartedAction = defineAction<ProjectState>(
    "SEARCH_ADDED_FEATURES_AT_SERVER_STARTED"
);

export const searchAddFeaturesAtServerCompletedAction = defineAction<ProjectState>(
    "SEARCH_ADDED_FEATURES_AT_SERVER_COMPLETED"
);

export function* handleCreateProjectSaga() {
    yield takeEvery(createProjectAction.TYPE, function* (action: typeof createProjectAction.typeOf.action) {
        const projectModel: RequestCreateProjectModel = action.projectModel;

        try {
            yield put(createProjectAtServerStartedAction({
                status: "running"
            }));
            yield put(appStateAction({
                status: "running"
            }));

            const response: AxiosResponse<ResponseCreateProjectModel | ErrorExecutionResultModelItem> = yield axiosApi.post(
                `${API_SERVERS}/api/project/create`,
                projectModel
            );

            if (response.status === 200 && response.data.isSuccessful) {
                const responseData: ResponseCreateProjectModel = response.data as ResponseCreateProjectModel;

                yield put(createProjectAtServerCompletedAction({ status: "success" }))
                yield put(appStateAction({
                    status: "initial"
                }));

                yield put(push(`../../Management/edit/${responseData._id}`));
            } else {
                const responseError = response.data as ErrorExecutionResultModelItem;
                yield put(
                    appStateAction({
                        statusCode: responseError.statusCode,
                        message: responseError.message,
                        status: "error"
                    })
                );

                yield put(
                    updateProjectAtServerCompletedAction({
                        status: "error",
                    })
                );
            }

        } catch (e) {
            yield put(createProjectAtServerCompletedAction({ status: 'error' }))
            yield put(
                appStateAction({
                    status: "error",
                    statusCode: e.statusCode,
                    message: e.message
                })
            );
        }
    })


}
export function* handleGetProjectSaga() {
    yield takeEvery(getProjectAction.TYPE, function* (action: typeof getProjectAction.typeOf.action) {
        const projectId: string = action.id;

        try {
            yield put(getProjectAtServerStartedAction({
                status: "running"
            }));
            yield put(appStateAction({
                status: "running"
            }));

            const response: AxiosResponse<ResponseProjectModel | ErrorExecutionResultModelItem> = yield axiosApi.get(
                `${API_SERVERS}/api/project/${projectId}`,
            );
            if (response.data.isSuccessful) {
                yield put(
                    getProjectAtServerCompletedAction({
                        project: { ...response.data as ResponseProjectModel },
                        status: "success"
                    }))
                yield put(appStateAction({
                    status: "initial"
                }));
            } else {
                const responseError = response.data as ErrorExecutionResultModelItem;
                yield put(
                    appStateAction({
                        statusCode: responseError.statusCode,
                        message: responseError.message,
                        status: "error"
                    })
                );

                yield put(
                    updateProjectAtServerCompletedAction({
                        status: "error",
                    })
                );
            }

        } catch (e) {
            yield put(
                getProjectAtServerCompletedAction({
                    status: "error"
                })
            )

            yield put(
                appStateAction({
                    status: "error",
                    statusCode: e.statusCode,
                    message: e.message
                })
            );
        }
    })
}

export function* handleUpdateProjectSaga() {
    yield takeEvery(updateProjectAction.TYPE, function* (action: typeof updateProjectAction.typeOf.action) {
        const updateModel: RequestUpdateProjectModel = action.updateModel;

        try {
            yield put(updateProjectAtServerStartedAction({
                status: "running"
            }));
            yield put(appStateAction({
                status: "running"
            }));

            const response: AxiosResponse<ResponseProjectModel & ErrorExecutionResultModelItem> = yield axiosApi.put(
                `${API_SERVERS}/api/project/update`, updateModel
            );
            if (response.status === 200 && response.data.isSuccessful) {
                yield put(
                    updateProjectAtServerCompletedAction({
                        project: { ...response.data },
                        status: "success"
                    }));

                yield put(appStateAction({
                    status: "initial"
                }));
            } else {
                const responseError = response.data as ErrorExecutionResultModelItem;
                yield put(
                    appStateAction({
                        statusCode: responseError.statusCode,
                        message: responseError.message,
                        status: "error"
                    })
                );

                yield put(
                    updateProjectAtServerCompletedAction({
                        status: "error",
                    })
                );
            }

        } catch (e) {
            yield put(
                updateProjectAtServerCompletedAction({
                    status: "error"
                }));
            yield put(
                appStateAction({
                    status: "error",
                    statusCode: e.statusCode,
                    message: e.message
                })
            );
        }
    })
}

export function* handleSearchFeaturesSaga() {
    yield takeEvery(searchFeaturesAction.TYPE, function* (action: typeof searchFeaturesAction.typeOf.action) {
        const searchText: RequestSearchFeaturesModel = action;

        try {
            yield put(searchFeaturesAtServerStartedAction({
                status: "running"
            }));
            yield put(appStateAction({
                status: "running"
            }));

            const response: AxiosResponse<ResponseSearchFeaturesModel & ErrorExecutionResultModelItem> = yield axiosApi.post(
                `${API_SERVERS}/api/project/search-features`, searchText
            );

            if ((response.status === 200 || response.status === 304) && response.data.isSuccessful) {
                yield put(
                    searchFeaturesAtServerCompletedAction({
                        searchResultFeatures: response.data.items,
                        status: "success"
                    }));

                yield put(appStateAction({
                    status: "initial"
                }));
            } else {
                const responseError = response.data as ErrorExecutionResultModelItem;
                yield put(
                    appStateAction({
                        statusCode: responseError.statusCode,
                        message: responseError.message,
                        status: "error"
                    })
                );

                yield put(
                    updateProjectAtServerCompletedAction({
                        status: "error",
                    })
                );
            }

        } catch (e) {
            yield put(
                updateProjectAtServerCompletedAction({
                    status: "error"
                }));
            yield put(
                appStateAction({
                    status: "error",
                    statusCode: e.statusCode,
                    message: e.message
                })
            );
        }
    })
}
export function* handleGetAllProjectsSaga() {
    yield takeEvery(getAllProjectsAction.TYPE, function* (action: typeof getAllProjectsAction.typeOf.action) {
        const searchModel: RequestSearchProjectsModel = action;

        try {
            yield put(searchProjectsAtServerStartedAction({
                status: "running"
            }));
            yield put(appStateAction({
                status: "running"
            }));

            const response: AxiosResponse<ResponseSearchProjectsModel & ErrorExecutionResultModelItem> = yield axiosApi.post(
                `${API_SERVERS}/api/project/search`, searchModel
            );
            console.log(response);

            if (response.status === 200 && response.data.isSuccessful) {
                yield put(
                    searchProjectsAtServerCompletedAction({
                        allProjects: response.data,
                        status: "success"
                    }));

                yield put(appStateAction({
                    status: "initial"
                }));
            } else {
                const responseError = response.data as ErrorExecutionResultModelItem;
                yield put(
                    appStateAction({
                        statusCode: responseError.statusCode,
                        message: responseError.message,
                        status: "error"
                    })
                );

                yield put(
                    searchProjectsAtServerCompletedAction({
                        status: "error",
                    })
                );
            }

        } catch (e) {
            yield put(
                searchProjectsAtServerCompletedAction({
                    status: "error"
                }));
            yield put(
                appStateAction({
                    status: "error",
                    statusCode: e.statusCode,
                    message: e.message
                })
            );
        }
    })
}

export function* handleAddFeaturesSaga() {
    yield takeEvery(searchAddedFeaturesAction.TYPE, function* (action: typeof searchAddedFeaturesAction.typeOf.action) {
        const searchModel: RequestSearchAddedFeaturesModel = action;

        try {
            yield put(searchAddFeaturesAtServerStartedAction({
                status: "running"
            }));
            yield put(appStateAction({
                status: "running"
            }));

            const response: AxiosResponse<ResponseSearchAddedFeaturesModel & ErrorExecutionResultModelItem> = yield axiosApi.post(
                `${API_SERVERS}/api/project/search-added-features`, searchModel
            );
            console.log(response);

            if (response.status === 200 && response.data.isSuccessful) {
                console.log(response.data);
                yield put(
                    
                    searchAddFeaturesAtServerCompletedAction({
                        addFeatures: response.data.features,
                        status: "success"
                    }));

                yield put(appStateAction({
                    status: "initial"
                }));
            } else {
                const responseError = response.data as ErrorExecutionResultModelItem;
                yield put(
                    appStateAction({
                        statusCode: responseError.statusCode,
                        message: responseError.message,
                        status: "error"
                    })
                );

                yield put(
                    searchAddFeaturesAtServerCompletedAction({
                        status: "error",
                    })
                );
            }

        } catch (e) {
            yield put(
                searchAddFeaturesAtServerCompletedAction({
                    status: "error"
                }));
            yield put(
                appStateAction({
                    status: "error",
                    statusCode: e.statusCode,
                    message: e.message
                })
            );
        }
    })
}