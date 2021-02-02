import { JwtModel } from "features/auth/models";

export class LocalStorageService {
    private static tokenKey: string = "__TOKEN__";

    static get getAuth(): boolean {
        return Boolean(localStorage.getItem(this.tokenKey));
    }

    static get getAccessToken(): JwtModel {
        return JSON.parse(localStorage.getItem(this.tokenKey) as string);
    }

    static set setAccessToken(authData: JwtModel) {
        localStorage.setItem(this.tokenKey, JSON.stringify(authData));
    }

    static removeAuth(): void {
        localStorage.removeItem(this.tokenKey);
    }
}

