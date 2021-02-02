import { StateProject } from "shared/enums";
import { BaseResponseModel } from "shared/models";
export interface ResponseSearchProjectsModel extends BaseResponseModel {
    items: ResponseSearchProjectItemModel[];
    total: number;
}

export interface ResponseSearchProjectItemModel {
    _id: string,
    ownerId: string;
    imgUrl: string;
    name: string;
    description: string;
    creationDate: string;
    editDate: string;
    isOpen: StateProject;
    estimateMin: number;
    estimateMax: number;
}  