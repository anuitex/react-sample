import * as React from 'react';
import { TableProjectsComponent } from 'shared/components/TableProjects/TableProjectsComponent';
import { ResponseSearchProjectsModel } from "../models";

interface AllProjectsComponentProps {
    projects?: ResponseSearchProjectsModel
}

export function AllProjectsComponent({ projects }: AllProjectsComponentProps): JSX.Element {
    return (
        <>
            {projects?.items ?
                < TableProjectsComponent isAll={true} projects={projects.items} />
                : null
            }
        </>
    )
}