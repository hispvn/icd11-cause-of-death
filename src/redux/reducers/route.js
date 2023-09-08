import { CHANGE_ROUTE } from "../actions/route/type";

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_ROUTE: {
      return action.payload.route;
    }
    default:
      return state;
  }
}
