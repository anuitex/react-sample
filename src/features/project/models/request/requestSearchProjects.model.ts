import { SortOrder, ProjectSortFieldEnum } from "../../../project/enums";

export interface RequestSearchProjectsModel {
    page: number;
    pageSize?: number;
    sorting?: SortOrder;
    searchText?: string;
    sortField?: ProjectSortFieldEnum
}