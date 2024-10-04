import { getBaseUrl } from "../helpers/get-base-url";

export const getMe = async () => {
    const res = await fetch(getBaseUrl() + '/api/user', { method: 'GET' });
    const { data } = await res.json();
    return data;
};
