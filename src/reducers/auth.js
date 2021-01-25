import store from "../store"

const defaultState = {
    loggedIn: false,
    business: undefined,
    getAuth: { loading: true },
    postAuth: { }
} 

const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "POST_INSTALLERS_SUCCESS":
            state.business.Installer = action.payload.data.installer
            return { ...state, auth: { ...state, business: { ...state.business } } }
        case "GET_AUTH_REQUEST": 
            return { ...state, getAuth: { loading: true } }
        case "GET_AUTH_SUCCESS":
            if (action.payload.data.business.isGuest) {
                localStorage.setItem("solyd_floors:guest_token", action.payload.data.token)
            } else {
                localStorage.setItem("solyd_floors_business:token", action.payload.data.token)
            }
            return { ...state, getAuth: { loading: false, data: action.payload }, business: action.payload.data.business, loggedIn: !action.payload.data.business.isGuest }
        case "GET_AUTH_FAILED":
            return { ...state, getAuth: { loading: false, error: action.error } }
        case "POST_AUTH_REQUEST": 
            return { ...state, postAuth: { loading: true } }
        case "POST_AUTH_SUCCESS":
            localStorage.setItem("solyd_floors_business:token", action.payload.data.token)
            return { ...state, postAuth: { loading: false, data: action.payload }, business: action.payload.data.business, loggedIn: true }
        case "POST_AUTH_FAILED":
            return { ...state, postAuth: { loading: false, error: action.error } }
        case "POST_businessS_SUCCESS":
            localStorage.setItem("solyd_floors_business:token", action.payload.data.token)
            return { ...state, business: action.payload.data.business, loggedIn: true }
        case "LOGOUT":
            localStorage.removeItem("solyd_floors_business:token")
            return { ...state, loggedIn: false, business: undefined }
        default:
            return state;
    }
}

export default authReducer;