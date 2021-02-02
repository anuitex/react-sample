//Vendors
import axios, { AxiosResponse } from "axios";
import { API_SERVERS } from "config";
import { put, takeEvery } from "redux-saga/effects";
//Models
import { ResponseStatisticsProject } from "features/project/models";
//Actions
import { appStateAction } from "../../../../store/appState.reducer";
import { homeAction, homeGetStatisticsAction, homeGetStatisticsSuccessAction } from "../actions";
//
import { initialHomeState } from "../reducer";

export function* handleHomeSaga() {
    yield takeEvery(homeAction.TYPE, function* () {
        try {
            yield put(
                homeGetStatisticsAction({
                    status: "running",
                    statistics: initialHomeState.statistics
                })
            );
            yield put(
                appStateAction({
                    status: "running",
                })
            );

            const response: AxiosResponse<ResponseStatisticsProject> = yield axios.get(
                `${API_SERVERS}/api/project/statistics`
            );

            if (response.status === 200 && response.data.isSuccessful) {
                yield put(
                    homeGetStatisticsSuccessAction({
                        status: "success",
                        statistics: response.data
                    })
                );
                yield put(
                    appStateAction({
                        status: "initial",
                    })
                );
            }

            // const urlToRedirect: string = MAIN_ASSET_URL.format({
            //     asset: "Home",
            // });
            // yield put(push(urlToRedirect));
        } catch (e) {
            yield put(
                homeGetStatisticsSuccessAction({
                    status: "error",
                    statistics: initialHomeState.statistics,
                    error: e.toString(),
                })
            );
            yield put(
                appStateAction({
                    status: "error",
                })
            );
        }
    });
}
