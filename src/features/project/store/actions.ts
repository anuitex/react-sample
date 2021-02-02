import { defineAction } from "rd-redux-utils";
import { RequestCreateProjectModel, RequestSearchFeaturesModel, RequestSearchProjectsModel, RequestUpdateProjectModel, RequestSearchAddedFeaturesModel } from "../models";

export const createProjectAction = defineAction<{ projectModel: RequestCreateProjectModel }>("CREATE_OR_EDIT_PROJECT_STARTED");
export const getProjectAction = defineAction<{ id: string }>("GET_PROJECT_STARTED");
export const updateProjectAction = defineAction<{ updateModel: RequestUpdateProjectModel }>("UPDATE_PROJECT_STARTED");
export const searchFeaturesAction = defineAction<RequestSearchFeaturesModel>("SEARCH_FEATURES_STARTED");

export const getAllProjectsAction = defineAction<RequestSearchProjectsModel>("GET_ALL_PROJECTS");
export const searchAddedFeaturesAction = defineAction<RequestSearchAddedFeaturesModel>("SEARCH_ADDED_FEATURES");