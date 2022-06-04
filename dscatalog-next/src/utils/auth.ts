import jwtDecode from 'jwt-decode';
import queryString from 'query-string';
import { AccessToken, Role, LoginResponse } from '../@types';
import { api, AUTH_TOKEN } from './api';

export const loginUser = async (username: string, password: string) => {
    const data = queryString.stringify({
        username,
        password,
        grant_type: "password",
    });

    const login = await api.post('/oauth/token', data, {
        headers: {
            Authorization: AUTH_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then((res) => {
        const { access_token } = res.data;

        localStorage.setItem('@dscatalog/token', JSON.stringify(access_token));

        return res.data;
    })
        .catch((res) => console.log(res));

    return login;
};

export const isAllowedByRole = (routerRoles: Role[] = []) => {
    if (routerRoles.length === 0) return true;

    const { authorities } = getAccessTokenDecoded();

    return routerRoles.some((role) => authorities?.includes(role));
};

export const getAccessTokenDecoded = () => {
    const sessionData = getSessionData();

    try {
        const tokenDecoded = jwtDecode(sessionData.access_token);
        return tokenDecoded as AccessToken;
    } catch (error) {
        return {} as AccessToken;
    }
};

export const getSessionData = () => {
    if (typeof window !== "undefined") {
        const sessionData = localStorage.getItem("authData") || "{}";
        const parsedSessionData = JSON.parse(sessionData);

        return parsedSessionData as LoginResponse;
    }
};


