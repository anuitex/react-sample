import { Action } from "redux";
import { ResponseSearchProjectsModel, ResponseProjectModel, ResponseSearchFeaturesItemModel, FeatureModel } from "../models";
import { createProjectAtServerCompletedAction, createProjectAtServerStartedAction, getProjectAtServerCompletedAction, getProjectAtServerStartedAction, searchAddFeaturesAtServerCompletedAction, searchAddFeaturesAtServerStartedAction, searchFeaturesAtServerCompletedAction, searchFeaturesAtServerStartedAction, searchProjectsAtServerCompletedAction, searchProjectsAtServerStartedAction } from "./saga/handleProject";

export interface ProjectState {
    status: "initial" | "running" | "success" | "error";
    project?: ResponseProjectModel;
    searchResultFeatures?: ResponseSearchFeaturesItemModel[];
    addFeatures?: FeatureModel[];
    allProjects?: ResponseSearchProjectsModel;
    error?: string;
}

export function projectReducer(state: ProjectState = { status: "initial" }, action: Action) {
    if (createProjectAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        }
    }
    if (createProjectAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: ''
        }
    }
    if (getProjectAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        }
    }
    if (getProjectAtServerCompletedAction.is(action)) {
        return {
            ...state,
            project: { ...action.project },
            status: action.status,
            error: action.error
        }
    }
    if (searchFeaturesAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
        }
    }
    if (searchFeaturesAtServerCompletedAction.is(action)) {
        return {
            ...state,
            searchResultFeatures: action.searchResultFeatures,
            status: action.status,
            error: action.error
        }
    }
    if (searchProjectsAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        }
    }
    if (searchProjectsAtServerCompletedAction.is(action)) {
        return {
            ...state,
            allProjects: { ...action.allProjects },
            status: action.status,
            error: action.error
        }
    }
    if (searchAddFeaturesAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        }
    }
    if (searchAddFeaturesAtServerCompletedAction.is(action)) {
        return {
            ...state,
            addFeatures: action.addFeatures?.length ? [...action.addFeatures] : undefined,
            status: action.status,
            error: action.error
        }
    }
    return state;
}