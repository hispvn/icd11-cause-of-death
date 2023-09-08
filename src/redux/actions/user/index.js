import {
    SET_USER_ROLES
} from "./type";

export const setUserRole = roles => ({
    type: SET_USER_ROLES,
    payload: roles
})