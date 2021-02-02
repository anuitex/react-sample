//Vendors
import axios, { AxiosResponse } from "axios";
import { JwtModel, RequestLoginModel } from "features/auth/models";
import { MAIN_ASSET_URL } from "features/home";
import { defineAction } from "rd-redux-utils";
import { push } from "react-router-redux";
import { put, takeEvery } from "redux-saga/effects";
import { ErrorExecutionResultModelItem, ResponseExecutionModel } from "shared/models/response-execution.model";

import { API_SERVERS } from "../../../../config";

import { LocalStorageService } from "../../../../shared/services/localStorage.service";
import { loginAction } from "../actions";
import { AuthAppState } from "../reducer";
import { appStateAction } from '../../../../store/appState.reducer';

export const loginAtServerStartedAction = defineAction<AuthAppState>(
  "AUTH_LOGIN_AT_SERVER_STARTED"
);
export const loginAtServerCompletedAction = defineAction<AuthAppState>(
  "AUTH_LOGIN_SUCCESS"
);

export function* handleLoginSaga() {
  yield takeEvery(loginAction.TYPE, function* (
    action: typeof loginAction.typeOf.action
  ) {
    let loginModel: RequestLoginModel = action.loginModel;

    try {
      yield put(
        loginAtServerStartedAction({
          status: "running",
        })
      );

      yield put(
        appStateAction({
          status: "running"
        })
      )

      const response: AxiosResponse<JwtModel | ResponseExecutionModel> = yield axios.post(
        `${API_SERVERS}/api/auth/login`,
        loginModel
      );

      if (response.status === 200 && response.data.isSuccessful) {
        LocalStorageService.setAccessToken = response.data as JwtModel;

        yield put(
          loginAtServerCompletedAction({
            status: "success",
          })
        );

        yield put(
          appStateAction({
            status: "initial",
          })
        );

        yield put(push(MAIN_ASSET_URL.urlTemplate));

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
          loginAtServerCompletedAction({
            status: "error",
          })
        );
      }
    } catch (e) {
      yield put(
        appStateAction({
          status: "error",
          statusCode: e.statusCode,
          message: e.message
        })
      );

      yield put(
        loginAtServerCompletedAction({
          status: "error",
        })
      );
    }

  });
}
