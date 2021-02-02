import { StateProject } from "shared/enums";
import { FeatureModel } from "..";

export interface RequestCreateProjectModel {
    ownerId: string;
    imgUrl?: string;
    name: string;
    description: string;
    isOpen: StateProject;
    editDate?: string;
    estimateMin: number;
    estimateMax: number;
    features: FeatureModel[]
}