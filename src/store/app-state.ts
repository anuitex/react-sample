import { connectRouter, routerMiddleware } from "connected-react-router";
import { projectReducer } from "features/project/store/reducer";
import { projectSaga } from "features/project/store/saga";
import { homeReducer } from "features/home/store/reducer";
import { homeSaga } from "features/home/store/saga";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { authReducer } from "../features/auth/store/reducer";
import { authSaga } from "../features/auth/store/saga";
import { history } from "../history-instance";
import { appStateReducer } from "./appState.reducer";

//Reducers
const reducerMap = {
    router: connectRouter(history),
    auth: authReducer,
    home: homeReducer,
    project: projectReducer,
    appState: appStateReducer,
};
const reducers = combineReducers(reducerMap);

//Sagas
function* appSaga() {
    yield all([authSaga(), homeSaga(), projectSaga()]);
}
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

export const appStore = createStore(
    reducers,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(appSaga);

type FirstArg<TFunction> = TFunction extends (arg: infer TArg, ...rest: any[]) => any ? TArg : any;
type State<TReducerMap> = {
    [P in keyof TReducerMap]: Exclude<FirstArg<TReducerMap[P]>, undefined>;
};

export type AppState = State<typeof reducerMap>;
