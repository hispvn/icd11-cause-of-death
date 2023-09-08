import { combineReducers } from "redux";

// States for fetching all needed metadata for the program
import metadata from "./metadata";

// States for switching between modules
import route from "./route";

// States for Data Entry module: selected TEI, Enrollment, Events
import data from "./data";

// States for Installation module: setting up Attributes, DEs, Certificate Template
import admin from "./admin";

// States for user roles
import user from "./user";

export default combineReducers({ metadata, route, data, admin, user });
