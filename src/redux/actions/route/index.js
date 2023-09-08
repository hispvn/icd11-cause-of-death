import { CHANGE_ROUTE } from "./type";

export const changeRoute = (route) => ({
  type: CHANGE_ROUTE,
  payload: {
    route,
  },
});
