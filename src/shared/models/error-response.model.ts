import { ErrorsCode } from "shared/enums";

export interface ErrorResponseModel {
    status?: ErrorsCode;
    message: string;
}