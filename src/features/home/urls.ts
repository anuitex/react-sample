import { createPath } from "rd-url-utils";
import { AllAssets, AssetTypes } from "../../config";

export const STATISTIC_PAGE_URL = createPath<{ asset: AssetTypes | AllAssets }>(
  "/Statistics"
);
export const MAIN_ASSET_URL = STATISTIC_PAGE_URL.createChildPath("main");
