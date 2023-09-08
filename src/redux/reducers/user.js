import {
    SET_USER_ROLES
} from "../actions/user/type";

const initialState = {
    userRoles: {
        admin: false,
        data: false,
        view: false
    }
};

export default function ( state = initialState, action ) {
    switch ( action.type ) {
        case SET_USER_ROLES: {
            return {
                ...state,
                userRoles: action.payload
            }
        }
        default:
            return state;
    }
}