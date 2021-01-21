
import { combineReducers } from 'redux';
import authReducer from "./auth";
import getValidationErrorsReducer from "./validationErrors";


const validationErrorsReducer = getValidationErrorsReducer(
    {
        phase1: { "USER": "users", "AUTH": "auth", "COUNTR": "countries" },
    }
)

export default combineReducers({
    auth: authReducer,
    validationErrors: validationErrorsReducer
});