import React from 'react';
import { Logo } from '../shared/components/Logo/Logo';
import "./AuthLayout.scss";



export interface AuthLayoutProps {
    children: React.ReactChild | React.ReactChild[]

}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="auth-layout">
            <div className="form-wrapper">
                <Logo className="absolute-top" />
                {children}
            </div>
        </div>
    );
}
