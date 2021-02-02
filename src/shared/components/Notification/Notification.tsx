import { useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification";
import { AppState } from "../../../store/app-state";

export function Notification(): JSX.Element {
    const error = useSelector((state: AppState) => state.appState);
    const isError = useSelector((state: AppState) => state.appState.status === "error");

    const openNotification = () => {
        const args: ArgsProps = {
            message: error.message
        };
        notification.error(args);
    }

    useEffect(() => {
        if (isError) {
            openNotification()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error.message, isError])
    return (
        <></>
    )
}