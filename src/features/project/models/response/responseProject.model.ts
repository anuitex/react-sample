
import { StateProject } from "shared/enums";
import { BaseResponseModel } from "shared/models/base-response.model";
import { FeatureModel } from "../feature.model";

export interface ResponseProjectModel extends BaseResponseModel {
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
    features: FeatureModel[];
}  
