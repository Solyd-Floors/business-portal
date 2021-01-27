import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";

export const getMyCart = () => ({ type: "GET_MY_CART" })
export const getMyCartRequest = () => ({ type: "GET_MY_CART_REQUEST" })
export const getMyCartSuccess = payload => ({ type: "GET_MY_CART_SUCCESS", payload })
export const getMyCartFailed = error => ({ type: "GET_MY_CART_FAILED", error })

export function* getMyCartSaga() {
    yield put(getMyCartRequest())
    try {
        let { data: payload } = yield call(axios,"/me/cart")
        yield put(getMyCartSuccess(payload))
    } catch(err){
        yield put(getMyCartFailed(err))
    }
}

export const removeFromCart = ({ CartFloorItemId }) => ({ type: "REMOVE_FROM_CART", CartFloorItemId })
export const removeFromCartRequest = () => ({ type: "REMOVE_FROM_CART_REQUEST" })
export const removeFromCartSuccess = payload => ({ type: "REMOVE_FROM_CART_SUCCESS", payload })
export const removeFromCartFailed = error => ({ type: "REMOVE_FROM_CART_FAILED", error })

export function* removeFromCartSaga({ 
    CartFloorItemId
}) {
    yield put(removeFromCartRequest())
    try {
        let { data: payload } = 
            yield call(axios,{ 
                data: { CartFloorItemId }, 
                url: "/me/cart/remove/item", 
                method: "post" 
            })
        yield put(removeFromCartSuccess(payload))
    } catch(err){
        yield put(removeFromCartFailed(err))
    }
}

export const addFloorBoxesToCart = ({ FloorId, FloorTileSizeId, boxes_amount, mil_type, onStart, onSuccess, onError }) => 
        ({ type: "ADD_FLOOR_BOXES_TO_CART", FloorId, FloorTileSizeId, boxes_amount, mil_type, onStart, onSuccess, onError })
export const addFloorBoxesToCartRequest = () => ({ type: "ADD_FLOOR_BOXES_TO_CART_REQUEST" })
export const addFloorBoxesToCartSuccess = payload => ({ type: "ADD_FLOOR_BOXES_TO_CART_SUCCESS", payload })
export const addFloorBoxesToCartFailed = error => ({ type: "ADD_FLOOR_BOXES_TO_CART_FAILED", error })

export function* addFloorBoxesToCartSaga({ 
    FloorId, FloorTileSizeId, boxes_amount, mil_type, 
    onSuccess, onStart, onError
}) {
    yield call(onStart)
    yield put(addFloorBoxesToCartRequest())
    try {
        let { data: payload } = 
            yield call(axios,{ 
                data: { FloorId, FloorTileSizeId, boxes_amount, mil_type }, 
                url: "/me/cart/add/floor_boxes", 
                method: "post" 
            })
        yield put(addFloorBoxesToCartSuccess(payload))
        yield call(onSuccess)
    } catch(err){
        yield call(onError)
        yield put(addFloorBoxesToCartFailed(err))
    }
}

export const discardCart = () => ({ type: "DISCARD_CART" })
export const discardCartRequest = () => ({ type: "DISCARD_CART_REQUEST" })
export const discardCartSuccess = payload => ({ type: "DISCARD_CART_SUCCESS", payload })
export const discardCartFailed = error => ({ type: "DISCARD_CART_FAILED", error })
export function* discardCartSaga({ onSuccess, onStart,  onError }) {
    if (onStart) yield call(onStart)
    yield put(discardCartRequest())
    try {
        let { data: payload } = yield call(axios, {
            url: "/me/cart/discard",
            method: "post"
        })
        yield put(discardCartSuccess(payload))
        if (onSuccess) yield call(onSuccess)
    } catch(err){
        if (onError) yield call(onError)
        yield put(discardCartFailed(err))
    }
}

export const getSingleOrder = pk => ({ type: "GET_SINGLE_ORDER", pk })
export const getSingleOrderRequest = (pk) => ({ type: "GET_SINGLE_ORDER_REQUEST", pk })
export const getSingleOrderSuccess = (pk,payload) => ({ type: "GET_SINGLE_ORDER_SUCCESS", payload, pk })
export const getSingleOrderFailed = (pk,error) => ({ type: "GET_SINGLE_ORDER_FAILED", error, pk })

export function* getSingleOrderSaga(params) {
    yield put(getSingleOrderRequest(params.pk))
    try {
        let { data: payload } = yield call(axios,`/me/orders/${params.pk}`)
        yield put(getSingleOrderSuccess(params.pk,payload))
    } catch(err){
        yield put(getSingleOrderFailed(params.pk,err))
    }
}

export default function* meSageWatcher() {
    yield takeEvery("GET_MY_CART", getMyCartSaga)
    yield takeEvery("GET_SINGLE_ORDER", getSingleOrderSaga)
    yield takeEvery("REMOVE_FROM_CART", removeFromCartSaga)
    yield takeEvery("ADD_FLOOR_BOXES_TO_CART", addFloorBoxesToCartSaga)
    yield takeEvery("DISCARD_CART", discardCartSaga)
}