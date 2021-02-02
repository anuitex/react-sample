import { BaseResponseModel } from '.';

export interface ResponseExecutionModel extends BaseResponseModel {
    message?: string;
    errors: ErrorExecutionResultModelItem;
}

export interface ErrorExecutionResultModelItem extends BaseResponseModel {
    code?: string;
    statusCode?: number;
    message: string;
}