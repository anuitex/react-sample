import { EditTwoTone, EyeTwoTone } from '@ant-design/icons';
import * as React from 'react';
import { useCallback, useState } from 'react';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "./MarkdownComponent.scss";
import cn from "classnames";


interface MarkdownComponentProps {
    value: string;
    className?: string;
    disabled: boolean;
    submit?: boolean;
    onChange: (value: string) => void
}

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

const MIN_LENGTH = 6;

export function MarkdownComponent({ value, onChange, disabled, className, submit }: MarkdownComponentProps): JSX.Element {
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("preview");
    const [, setValueState] = useState(value);
    const change = useCallback(
        (value: string) => {
            setValueState(value)
            onChange(value)
        },
        [onChange],
    )

    const getErrorValue = (value: string): boolean => {
        if (submit === undefined) {
            return false;
        }
        return submit && value.length <= MIN_LENGTH
    }

    return (
        <div className={"description " + (className ?? "")} >
            {!disabled ? <div className="md-action" onClick={() => setSelectedTab(selectedTab === "preview" ? "write" : "preview")}>{selectedTab === "preview" ? <EditTwoTone /> : <EyeTwoTone />}</div> : null}
            <div className={cn(selectedTab, getErrorValue(value) ? 'error' : undefined)} >
                <ReactMde initialEditorHeight={50} maxEditorHeight={200} generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                } selectedTab={selectedTab} onTabChange={setSelectedTab} value={value} onChange={change} />
            </div>
            {getErrorValue(value) ? <div className="error-message">{!value.length ? "Is required" : `Should be at least ${MIN_LENGTH} characters`}</div> : null}
        </div >
    )
}
