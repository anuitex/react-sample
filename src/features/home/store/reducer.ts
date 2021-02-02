import { ResponseStatisticsProject } from "features/project/models";
import { Action } from "redux";
import { homeGetStatisticsAction, homeGetStatisticsSuccessAction } from "./actions";

export interface HomeAppState {
    status?: "initial" | "running" | "success" | "error";
    statistics: ResponseStatisticsProject;
    error?: string;
}

export interface StatisticsHome {
    progress?: number
}

export const initialHomeState: HomeAppState = {
    status: "initial",
    statistics: {
        totalMinHours: 0,
        totalMaxHours: 0,
        total: 0,
        isOpen: 0,
        projects: []
    }
}

export function homeReducer(state: HomeAppState = initialHomeState, action: Action): HomeAppState {
    if (homeGetStatisticsAction.is(action)) {
        return {
            ...state,
            status: "running",
            statistics: initialHomeState.statistics
        };
    }

    if (homeGetStatisticsSuccessAction.is(action)) {
        return {
            ...state,
            status: action.status,
            statistics: { ...action.statistics }
        };
    }

    return state;
}
