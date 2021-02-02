import { StateProject } from "shared/enums";
import { FeatureModel } from ".";

export interface ProjectModel {
    ownerId:string;
    imgUrl?: string;
    name: string;
    creationDate?: string;
    editDate?: string;
    description: string;
    isOpen: StateProject;
    estimateMin: number;
    estimateMax: number;
    features: FeatureModel[]
}