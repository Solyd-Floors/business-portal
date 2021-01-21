import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";

export const getAuth = () => ({ type: "GET_AUTH" })
export const getAuthRequest = () => ({ type: "GET_AUTH_REQUEST" })
export const getAuthSuccess = payload => ({ type: "GET_AUTH_SUCCESS", payload })
export const getAuthFailed = error => ({ type: "GET_AUTH_FAILED", error })

export function* getAuthSaga() {
    yield put(getAuthRequest())
    try {
        let { data: payload } = yield call(axios,"/businesses/auth")
        yield put(getAuthSuccess(payload)) 
    } catch(err){
        yield put(getAuthFailed(err))
    }
}

export const postAuth = ({ email, password }) => ({ type: "POST_AUTH", email, password })
export const postAuthRequest = () => ({ type: "POST_AUTH_REQUEST" })
export const postAuthSuccess = payload => ({ type: "POST_AUTH_SUCCESS", payload })
export const postAuthFailed = error => ({ type: "POST_AUTH_FAILED", error })

export const logout = error => ({ type: "LOGOUT", error })

export function* postAuthSaga({ email, password }) {
    yield put(postAuthRequest())
    try {
        let { data: payload } = 
            yield call(axios,{ data: { email, password }, url: "/businesses/auth", method: "post" })
        yield put(postAuthSuccess(payload)) 
    } catch(err){
        yield put(postAuthFailed(err))
    }
}

export default function* authSagaWatcher() {
    yield takeEvery("GET_AUTH", getAuthSaga)
    yield takeEvery("POST_AUTH", postAuthSaga)
}