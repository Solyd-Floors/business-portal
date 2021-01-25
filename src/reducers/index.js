
import { combineReducers } from 'redux';
import authReducer from "./auth";
import getValidationErrorsReducer from "./validationErrors";
import myBusinessReducer from "./my-business"
import floorsReducer from "./floors"
import uiReducer from "./ui"

const validationErrorsReducer = getValidationErrorsReducer(
    {
        phase1: { "USER": "users", "AUTH": "auth", "COUNTR": "countries" },
    }
)

export default combineReducers({
    auth: authReducer,
    myBusiness: myBusinessReducer,
    floors: floorsReducer,
    ui: uiReducer,
    validationErrors: validationErrorsReducer
});