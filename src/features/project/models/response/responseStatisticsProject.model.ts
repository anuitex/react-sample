import { BaseResponseModel } from "shared/models";
import { ResponseSearchProjectItemModel } from "./responseSearchProjects.model";

export interface ResponseStatisticsProject extends BaseResponseModel {
    total: number;
    isOpen: number;
    totalMinHours: number;
    totalMaxHours: number;
    projects: ResponseSearchProjectItemModel[]
}