import { createPath } from "rd-url-utils";

export const HOME_PAGE_URL = createPath<{ stage: string }>(
    "/Management"
);
export const CREATE_PROJECT = HOME_PAGE_URL.createChildPath<{}, {}>("create");
export const ALL_PROJECTS_URL = HOME_PAGE_URL.createChildPath("allProjects");
export const EDIT_PROJECT = HOME_PAGE_URL.createChildPath<{ id: string }, {}>("edit/:id");
