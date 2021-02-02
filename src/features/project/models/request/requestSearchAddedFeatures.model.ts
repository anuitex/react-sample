import { FeatureModel } from "../feature.model";

export interface RequestSearchAddedFeaturesModel {
    _id: string;
    features: FeatureModel[]
}