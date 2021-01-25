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



export default function* myBusinessSagaWatcher() {
    yield takeEvery("GET_EMPLOYEES", getEmployeesSaga)
    yield takeEvery("GET_SINGLE_EMPLOYEE", getSingleEmployeeSaga)
    yield takeEvery("DELETE_EMPLOYEE",deleteEmployeeSaga)
    yield takeEvery("CREATE_EMPLOYEE",createEmployeeSaga)
    yield takeEvery("UPDATE_EMPLOYEE",updateEmployeeSaga)
}