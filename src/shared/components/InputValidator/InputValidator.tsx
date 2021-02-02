import cn from "classnames";
import React from "react";
import "./InputValidator.scss";

export interface InputValidatorProps {
    className?: string;
    submit?: boolean;
    value: string;
    disabled: boolean;
    onKeyUp?: (event: any) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MIN_LENGTH: number = 6;

export function InputValidator({ disabled, submit, className, value, onKeyUp, onChange }: InputValidatorProps): JSX.Element {

    const getErrorValue = (value: string): boolean => {
        if (submit === undefined) {
            return false;
        }
        return submit && value.length <= MIN_LENGTH
    }

    return (
        <div className={cn("wrapper-input-validation", className)}>
            <input disabled={disabled} className={getErrorValue(value) ? 'error' : undefined} onKeyUp={onKeyUp} type="text" value={value} onChange={onChange} />
            {getErrorValue(value) ? <div className="error-message">{!value.length ? "Is required" : `Should be at least ${MIN_LENGTH} characters`}</div> : null}
        </div>
    );
}
