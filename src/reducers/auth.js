import store from "../store"

const defaultState = {
    loggedIn: false,
    user: undefined,
    getAuth: { loading: true },
    postAuth: { }
} 

const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "POST_INSTALLERS_SUCCESS":
            state.user.Installer = action.payload.data.installer
            return { ...state, auth: { ...state, user: { ...state.user } } }
        case "GET_AUTH_REQUEST": 
            return { ...state, getAuth: { loading: true } }
        case "GET_AUTH_SUCCESS":
            if (action.payload.data.user.isGuest) {
                localStorage.setItem("solyd_floors:guest_token", action.payload.data.token)
            } else {
                localStorage.setItem("solyd_floors:token", action.payload.data.token)
            }
            return { ...state, getAuth: { loading: false, data: action.payload }, user: action.payload.data.user, loggedIn: !action.payload.data.user.isGuest }
        case "GET_AUTH_FAILED":
            return { ...state, getAuth: { loading: false, error: action.error } }
        case "POST_AUTH_REQUEST": 
            return { ...state, postAuth: { loading: true } }
        case "POST_AUTH_SUCCESS":
            localStorage.setItem("solyd_floors:token", action.payload.data.token)
            return { ...state, postAuth: { loading: false, data: action.payload }, user: action.payload.data.user, loggedIn: true }
        case "POST_AUTH_FAILED":
            return { ...state, postAuth: { loading: false, error: action.error } }
        case "POST_USERS_SUCCESS":
            localStorage.setItem("solyd_floors:token", action.payload.data.token)
            return { ...state, user: action.payload.data.user, loggedIn: true }
        case "LOGOUT":
            localStorage.removeItem("solyd_floors:token")
            return { ...state, loggedIn: false, user: undefined }
        default:
            return state;
    }
}

export default authReducer;