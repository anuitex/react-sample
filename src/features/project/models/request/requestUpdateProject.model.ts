import { StateProject } from "shared/enums";
import { FeatureModel } from "../feature.model";

export interface RequestUpdateProjectModel {
    _id: string;
    imgUrl?: string;
    name: string;
    editDate?: string;
    description: string;
    isOpen: StateProject;
    estimateMin: number;
    estimateMax: number;
    features: FeatureModel[]
}
