//Vendors
import { DownloadOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/app-state';

//Models
import { ResponseStatisticsProject } from 'features/project/models';

//Components
import { TableProjectsComponent } from 'shared/components/TableProjects/TableProjectsComponent';
import { ProjectsStatisticsComponent } from "../components/ProjectsStatisticsComponent";
//Actions
import { homeAction } from '../store/actions';
//Styles
import "./HomeContainers.scss";

interface HomeContainerProps {
}

// eslint-disable-next-line no-empty-pattern
export function HomeContainer({ }: HomeContainerProps): JSX.Element {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(homeAction({}))
    }, [dispatch])

    const projectsStatistic: ResponseStatisticsProject = useSelector((state: AppState) => state.home.statistics)

    return (
        <div className="wrapper">
            <PageHeader key="PageHeader" onBack={() => window.history.back()} title="Statistics" className="header" extra={[
                <Button key="Download" type="primary" shape="round" icon={<DownloadOutlined />} size='large' >Download</Button>
            ]}>
            </PageHeader>
            <ProjectsStatisticsComponent key="ProjectsStatistics" isOpen={projectsStatistic?.isOpen ?? 0} total={projectsStatistic?.total ?? 0} totalMinHours={projectsStatistic.totalMinHours} totalMaxHours={projectsStatistic.totalMaxHours} />
            <TableProjectsComponent key="TableComponent" projects={projectsStatistic.projects} />

        </div>
    )
}