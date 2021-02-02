import { defineAction } from "rd-redux-utils";
import { RequestLoginModel } from "../models";

export const loginAction = defineAction<{ loginModel: RequestLoginModel }>("AUTH_LOGIN")