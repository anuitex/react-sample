import React from "react";
import "./Spinner.scss";
import { Spin } from "antd";
import { AppState } from "store/app-state";
import { useSelector } from "react-redux";

export interface SpinnerProps {
    size?: "small" | "default" | "large"
}



export function Spinner({ size = "large" }: SpinnerProps) {
    const loading: boolean = useSelector((state: AppState) => state.appState.status === "running")
    return (
        (loading ?
            <div className="spinner-wrapper">
                < Spin size={size} />
            </div > : null)
    )
}