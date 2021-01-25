import store from "../store"

const defaultState = {
    withPanel: true,
} 

const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "SET_WITH_PANEL":
            state.withPanel = action.value;
            return { ...state }
        default:
            return state;
    }
}

export default authReducer;