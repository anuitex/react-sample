import { defineAction } from "rd-redux-utils";
import { HomeAppState } from "./reducer";

// export const homeActionsGroup = defineActionGroup("VIDEO MODERATION LIST");
export const homeAction = defineAction<{}>("HOME")

export const homeGetStatisticsAction = defineAction<HomeAppState>("GET_STATISTICS_LOADING")
export const homeGetStatisticsSuccessAction = defineAction<HomeAppState>("GET_STATISTICS_LOADED")
export const homeGetStatisticsErrorAction = defineAction<HomeAppState>("GET_STATISTICS_ERROR")
