import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";

export const getEmployees = () => ({ type: "GET_EMPLOYEES" })
export const getEmployeesRequest = () => ({ type: "GET_EMPLOYEES_REQUEST" })
export const getEmployeesSuccess = payload => ({ type: "GET_EMPLOYEES_SUCCESS", payload })
export const getEmployeesFailed = error => ({ type: "GET_EMPLOYEES_FAILED", error })

export function* getEmployeesSaga() {
    yield put(getEmployeesRequest())
    try {
        let { data: payload } = yield call(axios,"/my_business/employees")
        yield put(getEmployeesSuccess(payload))
    } catch(err){
        yield put(getEmployeesFailed(err))
    }
}

export const getSingleEmployee = pk => ({ type: "GET_SINGLE_EMPLOYEE", pk })
export const getSingleEmployeeRequest = (pk) => ({ type: "GET_SINGLE_EMPLOYEE_REQUEST", pk })
export const getSingleEmployeeSuccess = (pk,payload) => ({ type: "GET_SINGLE_EMPLOYEE_SUCCESS", payload, pk })
export const getSingleEmployeeFailed = (pk,error) => ({ type: "GET_SINGLE_EMPLOYEE_FAILED", error, pk })

export function* getSingleEmployeeSaga(params) {
    yield put(getSingleEmployeeRequest(params.pk))
    try {
        let { data: payload } = yield call(axios,`/my_business/employees/${params.pk}`)
        yield put(getSingleEmployeeSuccess(params.pk,payload))
    } catch(err){
        yield put(getSingleEmployeeFailed(params.pk,err))
    }
}

export const deleteEmployee = ({ pk, onStart, onErrror, onSuccess }) => ({ type: "DELETE_EMPLOYEE", pk, onStart, onErrror, onSuccess })
export const deleteEmployeeRequest = () => ({ type: "DELETE_EMPLOYEE_REQUEST" })
export const deleteEmployeeSuccess = pk => ({ type: "DELETE_EMPLOYEE_SUCCESS", pk })
export const deleteEmployeeFailed = error => ({ type: "DELETE_EMPLOYEE_FAILED", error })

export function* deleteEmployeeSaga({ pk, onStart, onError, onSuccess }) {
    if (onStart) yield call(onStart)
    yield put(deleteEmployeeRequest())
    try {
        let { data: payload } = 
            yield call(axios,{ url: `/my_business/employees/${pk}`, method: "delete" })
        yield put(deleteEmployeeSuccess(pk)) 
        if (onSuccess) yield call(onSuccess)
    } catch(err){
        yield put(deleteEmployeeFailed(err))
        if (onError) yield call(onError)
    }
}

export const createEmployee = ({ 
    email, password, first_name,
    last_name, address, address2,
    city, state, country, postcode,
    phone_number, 
    onStart, onError, onSuccess 
}) => ({ type: "CREATE_EMPLOYEE", 
    email, password, first_name,
    last_name, address, address2,
    city, state, country, postcode,
    phone_number, 
    onStart, onError, onSuccess 
})
export const createEmployeeRequest = () => ({ type: "CREATE_EMPLOYEE_REQUEST" })
export const createEmployeeSuccess = payload => ({ type: "CREATE_EMPLOYEE_SUCCESS", payload })
export const createEmployeeFailed = error => ({ type: "CREATE_EMPLOYEE_FAILED", error })

export function* createEmployeeSaga({ 
    email, password, first_name,
    last_name, address, address2,
    city, state, country, postcode,
    phone_number, 
    onStart, onError, onSuccess    
}) {
    if (onStart) yield call(onStart)
    yield put(createEmployeeRequest())
    try {
        let { data: payload } = 
            yield call(axios,{ data: { 
                email, password, first_name,
                last_name, address, address2,
                city, state, country, postcode,
                phone_number,
            }, url: `/my_business/employees`, method: "post" })
        yield put(createEmployeeSuccess(payload)) 
        if (onSuccess) yield call(onSuccess, payload.data.employee.id)
    } catch(err){
        yield put(createEmployeeFailed(err))
        if (onError) yield call(onError)
    }
}


export const updateEmployee = ({ pk,
    email, password, first_name,
    last_name, address, address2,
    city, state, country, postcode,
    phone_number, 
    onStart, onError, onSuccess 
}) => ({ type: "UPDATE_EMPLOYEE", pk,
    email, password, first_name,
    last_name, address, address2,
    city, state, country, postcode,
    phone_number, 
    onStart, onError, onSuccess 
})
export const updateEmployeeRequest = () => ({ type: "UPDATE_EMPLOYEE_REQUEST" })
export const updateEmployeeSuccess = payload => ({ type: "UPDATE_EMPLOYEE_SUCCESS", payload })
export const updateEmployeeFailed = error => ({ type: "UPDATE_EMPLOYEE_FAILED", error })

export function* updateEmployeeSaga({ 
    pk, email, password, first_name,
    last_name, address, address2,
    city, state, country, postcode,
    phone_number, 
    onStart, onError, onSuccess    
}) {
    if (onStart) yield call(onStart)
    yield put(updateEmployeeRequest())
    try {
        let { data: payload } = 
            yield call(axios,{ data: { 
                email, password, first_name,
                last_name, address, address2,
                city, state, country, postcode,
                phone_number,
            }, url: `/my_business/employees/${pk}`, method: "patch" })
        yield put(updateEmployeeSuccess(payload)) 
        if (onSuccess) yield call(onSuccess, payload.data.employee.id)
    } catch(err){
        yield put(updateEmployeeFailed(err))
        if (onError) yield call(onError)
    }
}

export const getShipToAddresses = () => ({ type: "GET_SHIP_TO_ADDRESSES" })
export const getShipToAddressesRequest = () => ({ type: "GET_SHIP_TO_ADDRESSES_REQUEST" })
export const getShipToAddressesSuccess = payload => ({ type: "GET_SHIP_TO_ADDRESSES_SUCCESS", payload })
export const getShipToAddressesFailed = error => ({ type: "GET_SHIP_TO_ADDRESSES_FAILED", error })

export function* getShipToAddressesSaga() {
    yield put(getShipToAddressesRequest())
    try {
        let { data: payload } = yield call(axios,"/my_business/ship_to_addresses")
        yield put(getShipToAddressesSuccess(payload))
    } catch(err){
        yield put(getShipToAddressesFailed(err))
    }
}

export const getOrders = () => ({ type: "GET_ORDERS" })
export const getOrdersRequest = () => ({ type: "GET_ORDERS_REQUEST" })
export const getOrdersSuccess = payload => ({ type: "GET_ORDERS_SUCCESS", payload })
export const getOrdersFailed = error => ({ type: "GET_ORDERS_FAILED", error })

export function* getOrdersSaga() {
    yield put(getOrdersRequest())
    try {
        let { data: payload } = yield call(axios,"/my_business/orders")
        yield put(getOrdersSuccess(payload))
    } catch(err){
        yield put(getOrdersFailed(err))
    }
}


export const createShipToAddress = ({ 
    address, onStart, onError, onSuccess 
}) => ({ type: "CREATE_SHIP_TO_ADDRESS", 
    address, onStart, onError, onSuccess 
})
export const createShipToAddressRequest = () => ({ type: "CREATE_SHIP_TO_ADDRESS_REQUEST" })
export const createShipToAddressSuccess = payload => ({ type: "CREATE_SHIP_TO_ADDRESS_SUCCESS", payload })
export const createShipToAddressFailed = error => ({ type: "CREATE_SHIP_TO_ADDRESS_FAILED", error })

export function* createShipToAddressSaga({ 
    address, onStart, onError, onSuccess    
}) {
    if (onStart) yield call(onStart)
    yield put(createShipToAddressRequest())
    try {
        let { data: payload } = 
            yield call(axios,{ data: { 
                address, onStart, onError, onSuccess
            }, url: `/my_business/ship_to_addresses`, method: "post" })
        yield put(createShipToAddressSuccess(payload)) 
        if (onSuccess) yield call(onSuccess, payload.data.ship_to_address.id)
    } catch(err){
        yield put(createShipToAddressFailed(err))
        if (onError) yield call(onError)
    }
}

export const deleteShipToAddress = ({ pk, onStart, onErrror, onSuccess }) => ({ type: "DELETE_SHIP_TO_ADDRESS", pk, onStart, onErrror, onSuccess })
export const deleteShipToAddressRequest = () => ({ type: "DELETE_SHIP_TO_ADDRESS_REQUEST" })
export const deleteShipToAddressSuccess = pk => ({ type: "DELETE_SHIP_TO_ADDRESS_SUCCESS", pk })
export const deleteShipToAddressFailed = error => ({ type: "DELETE_SHIP_TO_ADDRESS_FAILED", error })

export function* deleteShipToAddressSaga({ pk, onStart, onError, onSuccess }) {
    if (onStart) yield call(onStart)
    yield put(deleteShipToAddressRequest())
    try {
        let { data: payload } = 
            yield call(axios,{ url: `/my_business/ship_to_addresses/${pk}`, method: "delete" })
        yield put(deleteShipToAddressSuccess(pk)) 
        if (onSuccess) yield call(onSuccess)
    } catch(err){
        yield put(deleteShipToAddressFailed(err))
        if (onError) yield call(onError)
    }
}


export const getSingleShipToAddress = pk => ({ type: "GET_SINGLE_SHIP_TO_ADDRESS", pk })
export const getSingleShipToAddressRequest = (pk) => ({ type: "GET_SINGLE_SHIP_TO_ADDRESS_REQUEST", pk })
export const getSingleShipToAddressSuccess = (pk,payload) => ({ type: "GET_SINGLE_SHIP_TO_ADDRESS_SUCCESS", payload, pk })
export const getSingleShipToAddressFailed = (pk,error) => ({ type: "GET_SINGLE_SHIP_TO_ADDRESS_FAILED", error, pk })

export function* getSingleShipToAddressSaga(params) {
    yield put(getSingleShipToAddressRequest(params.pk))
    try {
        let { data: payload } = yield call(axios,`/my_business/ship_to_addresses/${params.pk}`)
        yield put(getSingleShipToAddressSuccess(params.pk,payload))
    } catch(err){
        yield put(getSingleShipToAddressFailed(params.pk,err))
    }
}

export default function* myBusinessSagaWatcher() {
    yield takeEvery("GET_ORDERS", getOrdersSaga)
    yield takeEvery("GET_EMPLOYEES", getEmployeesSaga)
    yield takeEvery("GET_SHIP_TO_ADDRESSES", getShipToAddressesSaga)
    yield takeEvery("GET_SINGLE_EMPLOYEE", getSingleEmployeeSaga)
    yield takeEvery("GET_SINGLE_SHIP_TO_ADDRESS", getSingleShipToAddressSaga)
    yield takeEvery("DELETE_EMPLOYEE",deleteEmployeeSaga)
    yield takeEvery("DELETE_SHIP_TO_ADDRESS",deleteShipToAddressSaga)
    yield takeEvery("CREATE_EMPLOYEE",createEmployeeSaga)
    yield takeEvery("CREATE_SHIP_TO_ADDRESS",createShipToAddressSaga)
    yield takeEvery("UPDATE_EMPLOYEE",updateEmployeeSaga)
}