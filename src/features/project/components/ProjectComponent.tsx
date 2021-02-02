//Vendors
import { SaveOutlined } from '@ant-design/icons';
import { Button, Col, Input, Radio, Row } from 'antd';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//Components
import { InputValidator } from 'shared/components/InputValidator/InputValidator';
import { AppState } from 'store/app-state';
import { MarkdownComponent } from "../../../shared/components/Markdown/MarkdownComponent";
//Enums
import { StateProject } from '../../../shared/enums';
//Helpers
import * as LevelsLogicHelper from "../../../shared/helpers/levelsLogic.helper";
//Models
import { FeatureModel, ProjectModel } from '../models';
import { FeatureComponent } from './FeatureComponent';
//Styles
import "./ProjectComponent.scss";
import { UploadImageComponent } from './UploadImageComponent';

// import { useSelector } from 'react-redux';
// import { AppState } from 'store/app-state';

interface ProjectComponentProps {
    value: ProjectModel;
    disabled: boolean;
    onChange: (projectModel: ProjectModel) => void;
}

export function ProjectComponent(props: ProjectComponentProps): JSX.Element {
    const { onChange, value: project, disabled } = props;

    const [state, setState] = useState<ProjectModel>(project);
    const [stateSubmit, setStateSubmit] = useState<boolean>(false);
    const totalFeaturesCalculation = (): void => {
        state.estimateMin = 0;
        state.estimateMax = 0;
        state.features?.forEach((item => {
            state.estimateMax += item.estimateMax;
            state.estimateMin += item.estimateMin;
        }))
    }



    totalFeaturesCalculation();

    // useEffect(() => {
    //     addNewFeaturesFromModal()
    // }, [addFeaturesFromModal])

    useEffect((): void => {
        setState(project);

    }, [project, project.name]);

    const handleCrateProject = useCallback(
        () => {
            onChange({ ...state });
            setStateSubmit(true);
        },
        [onChange, state]
    );

    const update = (value: Partial<ProjectModel>): void => {
        setState({ ...project, ...value });
    };

    const updateFeature = (value: FeatureModel, index: number): void => {
        state.features[index] = value;
        totalFeaturesCalculation();
        setState({ ...state });
    };

    const addNewFeature = (newFeature: FeatureModel, parentLevel: string): void => {
        if (LevelsLogicHelper.getLevelLength(parentLevel) === 1) {
            LevelsLogicHelper.addMainFeature(state, newFeature, parentLevel);
        }
        if (LevelsLogicHelper.getLevelLength(parentLevel) !== 1) {
            LevelsLogicHelper.addNotMainFeature(state, newFeature, parentLevel);
        }
        state.features.sort(LevelsLogicHelper.sortingByLevelFeature)
        setState({ ...state, features: [...state.features] })
    };

    const addNewChildrenFeature = (feature: FeatureModel, parentLevel: string): void => {
        setState({ ...LevelsLogicHelper.addNewChildrenFeature(state, feature, parentLevel) });
        return;
    };
    // useEffect(() => {
    //     console.log(featuresFromModal);
    // }, []);

    const newFeaturesFromModal = useSelector((state: AppState) => state.project.addFeatures)

    const addNewFeaturesFromModal = (level: string) => {
        console.log("addNewFeaturesFromModal");
        if (newFeaturesFromModal?.length) {
            setState({ ...LevelsLogicHelper.addNewFeaturesFromModal(state, newFeaturesFromModal, level) })

        }
    }

    const removeFeature = (parentLevel: string) => {
        console.log(parentLevel);
    };

    return (
        <div className="project-wrapper">
            {!disabled ? <Button
                className="save-btn"
                onClick={handleCrateProject}
                type="primary"
                shape="round"
                icon={<SaveOutlined />}
                size={"large"}
            >
                Save
        </Button> : null}

            <div className="project">

                <div className="img-wrapper">
                    <UploadImageComponent disabled={disabled} onChange={(value) => update({ ...state, imgUrl: value })} imgUrl={state.imgUrl || ''} />
                </div>

                <div className="project-content">
                    <InputValidator disabled={disabled} className={"title project"} submit={stateSubmit} value={state.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ ...state, name: e.target.value })} />
                    <MarkdownComponent disabled={disabled} className={"project"} submit={stateSubmit} value={state.description} onChange={(value: string) => update({ ...state, description: value })} />
                </div>
            </div>
            <Row className="title-actions" style={{ background: `transparent` }}>
                <Col span={8}>
                    <Radio.Group disabled={disabled} value={state.isOpen} onChange={() => update({ ...state, isOpen: state.isOpen === StateProject.Open ? StateProject.Close : StateProject.Open })} buttonStyle="solid">
                        <Radio.Button value={StateProject.Open}>Open</Radio.Button>
                        <Radio.Button className="close" value={StateProject.Close}>Close</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col span={8}> <h1 >Features of the project</h1></Col>
                <Col span={5}>
                    <Input.Group compact>
                        <Input disabled value={state.estimateMin} type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ ...state, estimateMin: +e.target.value })} placeholder="Min" />
                        <Input
                            className="site-input-split"
                            style={{
                                width: 30,
                                borderLeft: 0,
                                borderRight: 0,
                                pointerEvents: 'none',
                            }}
                            placeholder="~"
                            disabled
                        />
                        <Input disabled className="site-input-right" type="number" value={state.estimateMax} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ ...state, estimateMax: +e.target.value })} placeholder="Max" />
                    </Input.Group>
                </Col>
            </Row>

            <Row className="title-table" style={{ background: `transparent` }}>
                <Col span={2}>
                    <h3>Level</h3>
                </Col>
                <Col span={13}>
                    <h3>Title/description</h3>
                </Col>
                <Col span={2}>
                    Is Required
                </Col>
                <Col span={4}>
                    Min/Max estimate
                </Col>
                <Col span={2}>
                    Actions
                </Col>
            </Row>
            <div className="features-wrapper">
                {state.features?.map((feature: FeatureModel, index: number) =>
                    <FeatureComponent
                        addNewFeaturesFromModal={() => addNewFeaturesFromModal(feature.level)}
                        disabled={disabled}
                        key={"FeatureComponent" + index}
                        addChildrenFeature={(feature: FeatureModel, parent: string) => addNewChildrenFeature(feature, parent)}
                        addFeature={(feature: FeatureModel, parentLevel: string) => addNewFeature(feature, parentLevel)}
                        removeFeature={(parentLevel: string) => removeFeature(parentLevel)}
                        onChange={(feature: FeatureModel) => updateFeature(feature, index)}
                        propsValue={feature}
                        submit={stateSubmit}
                    />
                )}
            </div>
        </div >
    )

}