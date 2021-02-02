export const Assets = {
    Statistics: { title: "Statistics", ordinal: 0 },
    Management: { title: "Management", ordinal: 1 },
    CameraAnimation: { title: "CameraAnimation", ordinal: 2 }
};

export type AllAssets = "All";

export type AssetTypes = keyof typeof Assets;