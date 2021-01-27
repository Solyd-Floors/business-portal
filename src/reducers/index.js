
import { combineReducers } from 'redux';
import authReducer from "./auth";
import getValidationErrorsReducer from "./validationErrors";
import myBusinessReducer from "./my-business"
import floorsReducer from "./floors"
import uiReducer from "./ui"
import meReducer from "./me"

const validationErrorsReducer = getValidationErrorsReducer(
    {
        phase1: { "USER": "users", "AUTH": "auth", "COUNTR": "countries" },
    }
)

export default combineReducers({
    me: meReducer,
    auth: authReducer,
    myBusiness: myBusinessReducer,
    floors: floorsReducer,
    ui: uiReducer,
    validationErrors: validationErrorsReducer
});