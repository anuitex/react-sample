//vendors
import React from "react";

//Layouts
import { AuthLayout } from "../../../layout/AuthLayout";

//Containers
import { LoginFormContainer } from "../containers/LoginFormContainer";

interface LoginPageProps { }

// eslint-disable-next-line no-empty-pattern
export function LoginPage({ }: LoginPageProps) {
    return (
        <AuthLayout>
            <LoginFormContainer></LoginFormContainer>
        </AuthLayout>
    )
}