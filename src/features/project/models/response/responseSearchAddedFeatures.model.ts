import { BaseResponseModel } from "shared/models";
import { FeatureModel } from "..";


export interface ResponseSearchAddedFeaturesModel  extends BaseResponseModel{
    features: FeatureModel[]
}