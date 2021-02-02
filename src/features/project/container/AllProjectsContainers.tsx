import { Pagination } from "antd";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store/app-state";
import { AllProjectsComponent } from "../../project/components/AllProjectsComponent";
import { RequestSearchProjectsModel, ResponseSearchProjectsModel } from "../models";
import { getAllProjectsAction } from "../store/actions";
import "./AllProjectsContainer.scss"


export function AllProjectsContainer() {
    const dispatch = useDispatch();
    const requestSearchModel: RequestSearchProjectsModel = {
        page: 1
    };

    useEffect(() => {
        dispatch(getAllProjectsAction(requestSearchModel))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const onChange = useCallback(
        (page: number, pageSize?: number | undefined) => {
            requestSearchModel.page = page;
            requestSearchModel.pageSize = pageSize;
            dispatch(getAllProjectsAction(requestSearchModel));
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )

    const allProjects: ResponseSearchProjectsModel | undefined = useSelector((state: AppState) => state.project.allProjects)

    return (
        <div className="all-projects-wrapper">
            <h1>All Projects</h1>
            <AllProjectsComponent projects={allProjects} />
            {allProjects?.total ?
                <Pagination
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    pageSize={10}
                    defaultCurrent={1}
                    defaultPageSize={20}
                    total={allProjects?.total}
                    onChange={onChange} />
                : null}
        </div>
    )
}