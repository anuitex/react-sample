//Vendors
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { match, matchPath } from 'react-router-dom';
//Enums
import { StateProject } from 'shared/enums';
//Helpers
import { getUerId } from 'shared/helpers/token.helper';
//Store
import { AppState } from 'store/app-state';
//Components
import { ProjectComponent } from '../components/ProjectComponent';
//Models
import { ProjectModel, RequestCreateProjectModel, RequestUpdateProjectModel, ResponseProjectModel } from '../models';
//Actions
import { createProjectAction, getProjectAction, updateProjectAction } from '../store/actions';
//Styles
import "./ProjectContainer.scss";

import * as authHelper from "../../../shared/helpers/token.helper";




const initialProject: RequestCreateProjectModel = {
    ownerId: '',
    imgUrl: '',
    name: '',
    description: '',
    isOpen: StateProject.Open,
    estimateMin: 0,
    estimateMax: 0,
    features: [
        {
            level: "1",
            title: "",
            description: "",
            isRequired: false,
            editDate: "",
            estimateMin: 0,
            estimateMax: 0
        }
    ]
}



export function ProjectContainer(): JSX.Element {
    const dispatch = useDispatch();
    let project: ResponseProjectModel = useSelector((state: AppState) => state.project.project) as ResponseProjectModel;

    const router: string = useSelector((state: AppState) => state.router).location.pathname;
    const isNotOwner: boolean = authHelper.getUerId() !== project?.ownerId;

    const match: match<{ id: string }> | null = matchPath(router, {
        path: "/Management/edit/:id",
        exact: true,
        strict: false
    });

    useEffect(() => {
        if (match?.params.id) {
            dispatch(getProjectAction({ id: match.params.id }));
        }
    }, [dispatch, match?.params.id]);


    const updateProject = (project: ProjectModel, id: string): void => {
        const model: RequestUpdateProjectModel = {
            ...project,
            _id: id
        };
        dispatch(updateProjectAction({ updateModel: model }))
    };

    const createProject = (project: ProjectModel): void => {
        const createModel: RequestCreateProjectModel = {
            ...project,
            ownerId: getUerId()
        };
        dispatch(createProjectAction({ projectModel: createModel }));
    };

    const handleSaveProject = (project: ProjectModel): void => {
        if (match?.params.id) {
            updateProject(project, match.params.id);
        } else {
            createProject(project);
        }
    };

    return (
        <div className="wrapper">
            {project && match?.params.id ?
                <ProjectComponent
                    value={project}
                    onChange={handleSaveProject}
                    disabled={isNotOwner} />
                : <ProjectComponent
                    value={initialProject}
                    onChange={handleSaveProject}
                    disabled={false} />

            }</div>
    )
}
