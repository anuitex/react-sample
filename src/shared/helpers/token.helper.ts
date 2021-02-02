import { LOGIN_PAGE_URL } from './../../features/auth/urls';
import { LocalStorageService } from "../services/localStorage.service";
import { push } from "react-router-redux";
import jwtDecode from 'jwt-decode';

export interface AuthenticationTokenPayload {
    type: "auth";
    email: string;
    userId: string;
    issued_at: string;
}

export function logOut(): void {
    LocalStorageService.removeAuth();
    push(LOGIN_PAGE_URL.urlTemplate);
    window.location.reload();
}

export function getUerId(): string {
    const token: string = LocalStorageService.getAccessToken.accessToken;
    let tokenData: AuthenticationTokenPayload = jwtDecode(token);
    return tokenData.userId;

}   