import { BaseResponseModel } from "shared/models";
import { FeatureModel } from "../feature.model";

export interface ResponseSearchFeaturesModel extends BaseResponseModel {
    items: ResponseSearchFeaturesItemModel[];
}

export interface ResponseSearchFeaturesItemModel {
    _id: string;
    name: string;
    features: FeatureModel;
}