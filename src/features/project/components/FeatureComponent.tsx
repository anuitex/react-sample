//Vendors
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import * as React from 'react';
import { useCallback, useState } from 'react';
//Components
import { MarkdownComponent } from 'shared/components/Markdown/MarkdownComponent';
import { InputValidator } from '../../../shared/components/InputValidator/InputValidator';
//Models
import { FeatureModel } from '../models';
//Styles
import "./FeatureComponent.scss";
import { FeatureModalComponent } from './FeatureModalComponent';

// type FeatureStateType = Omit<FeatureComponentProps, "onChange" | "addFeature" | "addChildrenFeature" | "removeFeature">;

const initialFeature: FeatureModel = {
    level: "",
    title: "",
    description: "",
    isRequired: false,
    editDate: "",
    estimateMin: 0,
    estimateMax: 0
}

interface FeatureComponentProps {
    propsValue: FeatureModel;
    submit: boolean;
    disabled: boolean;
    addNewFeaturesFromModal: () => void;
    onChange: (feature: FeatureModel) => void;
    addFeature: (feature: FeatureModel, parentLevel: string) => void;
    removeFeature: (parentLevel: string) => void;
    addChildrenFeature: (feature: FeatureModel, parent: string) => void;
}

export function FeatureComponent(props: FeatureComponentProps): JSX.Element {
    const { onChange, addFeature, addChildrenFeature, addNewFeaturesFromModal, propsValue, submit, disabled } = props;

    const [showModalState, setShowModal] = useState(false)

    const onChangeHandle = useCallback(
        (feature: Partial<FeatureModel>) => {
            onChange({ ...propsValue, ...feature });
        },
        [onChange, propsValue],
    )

    const addFeatureHandle = (parentLevel: string): void => {
        addFeature({ ...initialFeature, }, parentLevel)
    }

    const addChildrenFeatureHandle = (parentLevel: string): void => {
        addChildrenFeature({ ...initialFeature }, parentLevel);
    }

    const removeFeature = (parentLevel: string): void => {
        removeFeature(parentLevel)
    }

    const getLevelLength = (level: string): number => {
        return level.split(".").length
    }

    const showModal = (event: any) => {
        if (disabled) return;
        if (event.ctrlKey && event.code === 'Space') {
            setShowModal(true);
        }
    }

    const hideModal = useCallback(
        () => {
            setShowModal(false);
            addNewFeaturesFromModal();
        },
        [addNewFeaturesFromModal],
    );

    const checkMinAndMaxEstimate = (estimate: number, isMin: boolean) => {
        estimate = estimate < 0 ? 0 : estimate;

        if (isMin && estimate > propsValue.estimateMax) {
            onChange({ ...propsValue, estimateMin: estimate, estimateMax: estimate })
            return;
        }
        if (isMin) {
            onChange({ ...propsValue, estimateMin: estimate })
            return;
        }
        if (!isMin && estimate < propsValue.estimateMin) {
            onChange({ ...propsValue, estimateMin: estimate, estimateMax: estimate })
            return;
        } if (!isMin) {
            onChange({ ...propsValue, estimateMax: estimate })
            return;
        }

    }

    return (
        <>
            {showModalState ? <FeatureModalComponent key={propsValue.level} visible={hideModal} inputValue={propsValue.title} /> : null}
            <div
                className={`${getLevelLength(propsValue.level) === 1 ? "first" : ""} feature-wrapper `}
                style={{ background: `rgb(0 0 0 / ${getLevelLength(propsValue.level) !== 1 ? getLevelLength(propsValue.level) * 2 : 1}%)` }}>
                <Row style={{ background: `transparent` }}>
                    <Col span={2}>
                        <div className="level" style={{ fontSize: `calc(10px + ${2 / getLevelLength(propsValue.level) * 1.5}rem)` }}>
                            {propsValue.level}
                        </div>
                    </Col>
                    <Col span={13}>
                        <div className="feature-content">
                            <InputValidator disabled={disabled} className={"title"} submit={submit} onKeyUp={showModal} value={propsValue.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandle({ title: e.target.value })} />
                            <MarkdownComponent disabled={disabled} submit={submit} className={"feature"} value={propsValue.description} onChange={(value: string) => onChangeHandle({ description: value })} />
                        </div>
                    </Col>
                    <Col span={2}>
                        <div className="checkbox-wrapper">
                            <input type="checkbox" name="required" disabled={disabled} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandle({ isRequired: e.target.checked })} checked={propsValue.isRequired} />
                        </div>
                    </Col>
                    <Col span={4} className="estimate-wrapper">
                        <input name="estimateMin" disabled={disabled} type="number" placeholder="Min" onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkMinAndMaxEstimate(+e.target.value, true)} value={propsValue.estimateMin} />
                        <input type="number" style={{
                            width: 30,
                            borderLeft: 0,
                            borderRight: 0,
                            pointerEvents: 'none',
                        }}
                            placeholder="~"
                            disabled />
                        <input name="estimateMax" disabled={disabled} type="number" placeholder="Max" onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkMinAndMaxEstimate(+e.target.value, false)} value={propsValue.estimateMax} />
                    </Col>
                    <Col span={2}>
                        {!disabled ?
                            <div className="menu">
                                <EllipsisOutlined />
                                <ul>
                                    <li onClick={() => addFeatureHandle(propsValue.level)}>Add feature</li>
                                    <li onClick={() => addChildrenFeatureHandle(propsValue.level)}>Add children feature</li>
                                    <li onClick={() => removeFeature(propsValue.level)}>Remove this feature</li>
                                </ul>
                            </div> : null}
                    </Col>
                </Row>
            </div></>
    )

}