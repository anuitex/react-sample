import { Button, Table, Tag, Tooltip } from 'antd';
import { ResponseSearchProjectItemModel } from 'features/project/models';
import * as React from 'react';
import { useHistory } from "react-router";
import { StateProject } from '../../../shared/enums';
import "./TableProjectsComponent.scss";

interface TableComponentProps {
    projects: ResponseSearchProjectItemModel[];
    isAll?: boolean
}


const columns = [
    {
        title: 'Project name',
        dataIndex: 'name',
        key: 'name',
        render: (name: string, row: ResponseSearchProjectItemModel) => {
            return (
                <Button key={row._id} type="link" size={"small"}>{name}</Button>
            )
        }
    },
    {
        title: 'Creation Date',
        dataIndex: 'creationDate',
        key: 'creationDate',
        render: (creationDate: string) => {
            return (
                <Tooltip title={new Date(creationDate).toLocaleString()}>
                    <Tag key={creationDate} >
                        {new Date(creationDate)?.toLocaleDateString()}
                    </Tag>
                </Tooltip>
            )
        }
    },
    {
        title: 'Update Date',
        key: 'editDate',
        dataIndex: 'editDate',
        render: (editDate: string) => {
            return (
                <Tooltip title={new Date(editDate).toLocaleString()}>
                    {editDate ? <Tag key={editDate} >
                        {new Date(editDate)?.toLocaleDateString()}
                    </Tag> : <Tag key={Math.random() * Math.random()}>-</Tag>}
                </Tooltip>
            )
        }
    },
    {
        title: 'State',
        key: 'isOpen',
        dataIndex: 'isOpen',
        render: (isOpen: StateProject) => {
            const isClose: boolean = isOpen === StateProject.Close;
            return (
                < Tag color={isClose ? "volcano" : 'green'} key={Math.random() * Math.random()} >
                    {  isClose ? StateProject[StateProject.Close] : StateProject[StateProject.Open]}
                </Tag >
            )
        }
    },
    {
        title: 'Min hours',
        key: 'estimateMin',
        dataIndex: 'estimateMin',
    },
    {
        title: 'Max hours',
        key: 'estimateMax',
        dataIndex: 'estimateMax',
    },

];

export function TableProjectsComponent({ projects, isAll }: TableComponentProps) {
    const history = useHistory()
    const handleRedirect = (id: string) => {
        history.push(`./../Management/edit/${id}`);
    }

    return (
        <div>
            <Table onRow={(row: ResponseSearchProjectItemModel) => {
                return {
                    onClick: () => { handleRedirect(row._id) },
                }
            }} rowKey={projects.findIndex(item => item._id).toString()} columns={columns} dataSource={projects} pagination={false} />
            <div className="redirect">
                {!isAll ? <Button type="link" size={"large"}>Show all</Button> : null}
            </div>
        </div>
    )
}