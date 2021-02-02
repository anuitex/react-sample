//Vendors
import Progress from 'antd/lib/progress';
import Tooltip from 'antd/lib/tooltip';
import * as React from 'react';
//Styles
import "./ProjectsStatisticsComponent.scss";

interface ProjectsStatisticsProps {
    isOpen: number;
    total: number;
    totalMinHours: number;
    totalMaxHours: number;
}

export function ProjectsStatisticsComponent({ isOpen, total, totalMinHours, totalMaxHours }: ProjectsStatisticsProps): JSX.Element {
    const openPercent: number = isOpen / total * 100
    const tooltipTitle = `${(total - isOpen) / total * 100}% : Closed projects. ${isOpen / total * 100}% : Opened projects`

    return (
        <div className="statistic-wrapper">
            <div className="statistics top">
                <div>
                    <span className="description">Total projects:</span><span className="value">{total}</span>
                </div>
            </div>
            <div className="center">
                <div className="statistics">
                    <div>
                        <span className="description">Open total:</span><span className="value">{isOpen}</span>
                    </div>
                    <div>
                        <span className="description">Close total:</span><span className="value">{total - isOpen}</span>
                    </div>
                </div>
                <Tooltip title={tooltipTitle}>
                    <Progress
                        width={200}
                        type="circle"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        trailColor="#f7495b"
                        percent={openPercent}
                    />
                </Tooltip>
                <div className="statistics">
                    <div>
                        <span className="description">Min hours total:</span><span className="value">{totalMinHours}</span>
                    </div>
                    <div>
                        <span className="description">Max hours total:</span><span className="value">{totalMaxHours}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}