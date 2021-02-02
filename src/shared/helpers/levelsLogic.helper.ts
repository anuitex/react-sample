import { FeatureModel, ProjectModel } from "features/project/models"

export const getLevelLength = (level: string): number => {
    return level.split(".").length
}

export const getNumberArrayFromLevel = (level: string): number[] => {
    return level.split(".").map((item: string) => Number(item))
}

const changeLevel = (state: ProjectModel, fromPositionIndex: number, parentLevel: string): void => {
    state.features.forEach((item: FeatureModel, index: number) => {
        if (index > fromPositionIndex + 1) {
            if (getLevelLength(parentLevel) === 1) {
                const getArrayLevel: number[] = getNumberArrayFromLevel(item.level);
                getArrayLevel[0] += 1;
                const getNewLevel: string = getArrayLevel.join(".")
                item.level = getNewLevel;
            }
        }

        if (getLevelLength(parentLevel) !== 1) {
            const parentLevelArray: number[] = getNumberArrayFromLevel(parentLevel);
            parentLevelArray[getLevelLength(parentLevel) - 1] += 1;
            const getBaseLevel: number[] = getNumberArrayFromLevel(item.level).splice(0, parentLevelArray.length);

            const parentLevelNewString: string = parentLevelArray.join(".");
            const getBaseLevelString: string = getBaseLevel.join(".");
            if (parentLevelNewString === getBaseLevelString || (parentLevelArray[0] === getBaseLevel[0] && index > fromPositionIndex)) {
                const getArrayLevel: number[] = getNumberArrayFromLevel(item.level);
                getArrayLevel[getBaseLevel.length - 1] += 1;
                const getNewLevel: string = getArrayLevel.join(".");
                item.level = getNewLevel;
            }
        }
    })
}


const getCurrentFeatures = (state: ProjectModel, parentLevel: string, isMain: boolean): FeatureModel[] => {
    if (isMain) {
        return state.features.filter((feature: FeatureModel) => {
            let featureLevelArr: number[] = getNumberArrayFromLevel(feature.level);
            let parentLevelArr: number[] = getNumberArrayFromLevel(parentLevel);
            return featureLevelArr[0] === parentLevelArr[0];
        })
    }
    if (!isMain) {

        return state.features.filter((feature: FeatureModel) => {
            let featureLevelArr: number[] = getNumberArrayFromLevel(feature.level);
            let parentLevelArr: number[] = getNumberArrayFromLevel(parentLevel);
            const checkLevelNotLast = (featureLevel: number[], fromStart: boolean): number[] => {
                if (!fromStart) {
                    let featureLevelNew = [...featureLevel];
                    featureLevelNew.pop()
                    return featureLevelNew
                }
                if (fromStart) {
                    // let [a, b, ...rest] = featureLevel;
                    let [a, b,] = featureLevel;

                    return [a, b]
                }
                return featureLevel;
            }
            let someBaseLevel: boolean = checkLevelNotLast(featureLevelArr, false).join(".") === checkLevelNotLast(parentLevelArr, false).join(".");

            if (parentLevelArr.length >= 2) {
                someBaseLevel = checkLevelNotLast(featureLevelArr, true).join(".") === checkLevelNotLast(parentLevelArr, true).join(".");
            }
            return someBaseLevel;
        });
    }
    return state.features
}

export const addMainFeature = (state: ProjectModel, newFeature: FeatureModel, parentLevel: string): void => {
    let filterCurrentFeatures = getCurrentFeatures(state, parentLevel, true);
    let getCurrentAddPosition = state.features.findIndex(element => element.level === filterCurrentFeatures[filterCurrentFeatures.length - 1].level)
    state.features.splice(getCurrentAddPosition + 1, 0, { ...newFeature, level: `${Number(parentLevel) + 1}` });
    changeLevel(state, getCurrentAddPosition, parentLevel)

}

export const addNotMainFeature = (state: ProjectModel, newFeature: FeatureModel, parentLevel: string): void => {
    let filterCurrentFeatures = getCurrentFeatures(state, parentLevel, false);
    let getCurrentAddPosition = state.features.findIndex(element => element.level === filterCurrentFeatures[filterCurrentFeatures.length - 1].level)
    const getArrayLevel: number[] = getNumberArrayFromLevel(parentLevel);
    getArrayLevel[getLevelLength(parentLevel) - 1] += 1;
    const getNewLevel: string = getArrayLevel.join(".")
    changeLevel(state, getCurrentAddPosition + 1, parentLevel);
    state.features.splice(getCurrentAddPosition + 1, 0, { ...newFeature, level: getNewLevel });
}


export const addNewChildrenFeature = (state: ProjectModel, feature: FeatureModel, parentLevel: string): ProjectModel => {
    const prevElem = state.features.findIndex(item => item.level === parentLevel);
    state.features.splice(prevElem + 1, 0, { ...feature, level: parentLevel + ".0" });
    state.features.forEach((item, index) => {
        const isChildrenFeature: boolean = getLevelLength(parentLevel) + 1 === getLevelLength(item.level);
        const isThisParentChildrenFeature: boolean = getNumberArrayFromLevel(parentLevel)[0] === getNumberArrayFromLevel(item.level)[0];

        if (isChildrenFeature && isThisParentChildrenFeature && index > prevElem) {
            let getLastLetterLevel = getNumberArrayFromLevel(item.level)
            getLastLetterLevel[getLevelLength(parentLevel)] = (Number(getLastLetterLevel[getLevelLength(parentLevel)]) + 1);
            item.level = getLastLetterLevel.join(".")
        }
    })

    return state
}

export const sortingByLevelFeature = (a: FeatureModel, b: FeatureModel) => {
    var numFirst: string[] = a.level.split(".");
    var numSecond: string[] = b.level.split(".");

    for (var i = 0; i < numFirst.length; i++) {
        if (numSecond[i]) {
            if (numFirst[i] !== numSecond[i]) {
                return Number(numFirst[i]) - Number(numSecond[i]);
            }
        } else {
            return 1;
        }
    }
    return -1;
}

export const addNewFeaturesFromModal = (state: ProjectModel, features: FeatureModel[], level: string): ProjectModel => {
    const addedIndex = state.features.findIndex((item: FeatureModel) => item.level === level);
    console.log(features.map((item: FeatureModel) => {
        debugger
        let a = level;
        let b = item.level.charAt(level.length - 1)
        let c = item.level.charAt(level.length - 1) + item.level.slice(level.length - 1)
        console.log(item.level);

        console.log(a);
        console.log(b);
        console.log(c);
        item.level = level + item.level.slice(0, level.length - 1)
        return item
    }))
    state.features.splice(addedIndex, 1, ...features)

    return state
}