import { BaseResponseModel } from "shared/models/base-response.model";

export interface JwtModel extends BaseResponseModel {
    accessToken: string;
    // refreshToken: string;
}