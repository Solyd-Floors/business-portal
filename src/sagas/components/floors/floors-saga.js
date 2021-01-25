import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";


export const getSingleFloor = pk => ({ type: "GET_SINGLE_FLOOR", pk })
export const getSingleFloorRequest = (pk) => ({ type: "GET_SINGLE_FLOOR_REQUEST", pk })
export const getSingleFloorSuccess = (pk,payload) => ({ type: "GET_SINGLE_FLOOR_SUCCESS", payload, pk })
export const getSingleFloorFailed = (pk,error) => ({ type: "GET_SINGLE_FLOOR_FAILED", error, pk })

export function* getSingleFloorSaga(params) {
    yield put(getSingleFloorRequest(params.pk))
    try {
        let { data: payload } = yield call(axios,`/floors/${params.pk}`)
        yield put(getSingleFloorSuccess(params.pk,payload))
    } catch(err){
        yield put(getSingleFloorFailed(params.pk,err))
    }
}

export const getFloors = params => ({ type: "GET_FLOORS", params })
export const getFloorsRequest = () => ({ type: "GET_FLOORS_REQUEST" })
export const getFloorsSuccess = payload => ({ type: "GET_FLOORS_SUCCESS", payload })
export const getFloorsFailed = error => ({ type: "GET_FLOORS_FAILED", error })

export function* getFloorsSaga({params}) {
    yield put(getFloorsRequest())
    try {
        let { data: payload } = yield call(axios,`/floors?${global.string_to_qs(params)}`)
        yield put(getFloorsSuccess(payload))
    } catch(err){
        yield put(getFloorsFailed(err))
    }
}

export default function* floorsSagaWatcher() {
    yield takeEvery("GET_FLOORS", getFloorsSaga)
    yield takeEvery("GET_SINGLE_FLOOR", getSingleFloorSaga)
}