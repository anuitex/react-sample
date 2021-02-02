import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row } from 'antd';
import * as React from 'react';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputValidator } from 'shared/components/InputValidator/InputValidator';
import { MarkdownComponent } from 'shared/components/Markdown/MarkdownComponent';
import { sortingByLevelFeature } from 'shared/helpers/levelsLogic.helper';
import { AppState } from 'store/app-state';
import { FeatureModel, RequestSearchAddedFeaturesModel, RequestSearchFeaturesModel, ResponseSearchFeaturesItemModel } from '../models';
import { searchAddedFeaturesAction, searchFeaturesAction } from '../store/actions';
import "./FeatureModalComponent.scss";

interface FeatureModalComponentProps {
    inputValue: string;
    onChange?: (img: string) => void
    visible: (visible: boolean) => void;
}

interface SortingSearchFeaturesItemModel {
    _id: string;
    name: string;
    features: FeatureModel[];
}

export function FeatureModalComponent({ inputValue, visible }: FeatureModalComponentProps) {
    type DispatchType = RequestSearchFeaturesModel | RequestSearchAddedFeaturesModel;
    let timeout: any;
    let projects: SortingSearchFeaturesItemModel[] = []
    const features = useSelector((state: AppState) => state.project.searchResultFeatures) ?? [];

    const dispatch = useDispatch<Dispatch<DispatchType>>()

    const [searchValueState, setSearchValue] = useState<string>(inputValue);

    const handleOk = (): void => {
        // setVisible(false);
    };

    useEffect(() => {
        if (inputValue.length) {
            dispatch(searchFeaturesAction({ searchText: inputValue }))
        }
    }, [dispatch, inputValue, inputValue.length])

    const cancel = (): void => {
        visible(false);
    };

    const doSearch = (searchText: string): void => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            dispatch(searchFeaturesAction({ searchText: searchText }))
        }, 800);
    }

    const sortingFeatures = (features: ResponseSearchFeaturesItemModel[]): SortingSearchFeaturesItemModel[] => {
        let sortFeatures: SortingSearchFeaturesItemModel[] = [];
        if (features.length) {
            sortFeatures.push({ ...features[0], features: [features[0].features] })
            features?.reduce((_accumulator, currentValue) => {
                const is = sortFeatures.findIndex(item => item._id === currentValue._id)
                if (is !== -1) {
                    if (!sortFeatures[is].features.some((item: FeatureModel) => item.level === currentValue.features.level)) {
                        sortFeatures[is].features.push({ ...currentValue?.features })
                    }
                } else {
                    sortFeatures.push({ ...currentValue, features: [currentValue.features] })
                }
                return _accumulator

            }, [features[0]]);
            return sortFeatures.map((item: SortingSearchFeaturesItemModel) => ({ ...item, features: item.features.sort(sortingByLevelFeature) }))
        }
        return []
    }

    projects = sortingFeatures(features)

    const onChangeSearch = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            setSearchValue(event.target.value);
            doSearch(event.target.value);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const onSearch = (value: string) => console.log(value);

    const getLevelLength = (level: string): number => {
        return level.split(".").length
    }
    const targetAddFeatures = useSelector((state: AppState) => state.project.addFeatures);

    useEffect(() => {
        if (targetAddFeatures?.length) {
            visible(false);
        }
    }, [targetAddFeatures, visible])

    const addFeature = (project: SortingSearchFeaturesItemModel, feature: FeatureModel) => {
        dispatch(searchAddedFeaturesAction({ ...project, features: [feature] }));
    }

    return (
        <Modal
            key="features-modal"
            title="Title"
            visible={true}
            onOk={handleOk}
            onCancel={cancel}
            className="features-modal"
        >
            <Input.Search key="input search text modal" placeholder="input search text 1" autoFocus onChange={onChangeSearch} value={searchValueState} onSearch={onSearch} enterButton />
            <div className="features-modal-wrapper">

                {projects?.map((item: SortingSearchFeaturesItemModel, index: number) =>
                    <>
                        <Row key={item._id + index} style={{ background: `transparent` }}>
                            <Col span={6}>
                            </Col>
                            <Col span={12}>
                                <h1>{item.name}</h1>
                            </Col>
                            <Col span={6}>
                            </Col>
                        </Row>
                        {item.features.map((feature: FeatureModel, index: number) =>
                            <Row key={feature.level + index} style={{ background: `transparent` }}>

                                <Col span={2}>
                                    <div className="level" style={{ fontSize: `calc(10px + ${2 / getLevelLength(feature.level) * 1}rem)` }}>
                                        {feature.level}
                                    </div>
                                </Col>
                                <Col span={16}>

                                    <div className="feature-content">
                                        <InputValidator disabled={true} className={"title"} value={feature.title} />
                                        <MarkdownComponent disabled={true} className={"feature"} value={feature.description} onChange={() => { }} />
                                    </div>
                                </Col>
                                <Col span={4} className="estimate-wrapper">
                                    <input disabled name="estimateMin" type="number" placeholder="Min" value={feature.estimateMin} />
                                    <input type="number" style={{
                                        width: 30,
                                        borderLeft: 0,
                                        borderRight: 0,
                                        pointerEvents: 'none'
                                    }}
                                        placeholder="~"
                                        disabled />
                                    <input disabled name="estimateMax" type="number" placeholder="Max" value={feature.estimateMax} />
                                </Col>
                                <Col span={2}>
                                    <div>
                                        <Button type="primary" shape="round" onClick={() => addFeature(item, feature)} icon={<PlusOutlined />} size="middle">
                                            Add
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </>
                )}
            </div>
        </Modal>
    )
}