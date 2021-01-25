import store from "../store"

const defaultState = {
    singleEmployeeRequests: {},
    employees: {
        byIds: {},
        allIds: [],
        loading: false,
        error: undefined
    }
} 

const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "GET_EMPLOYEES_REQUEST": 
            return { ...state, employees: { ...state.employees, loading: true } }
        case "GET_EMPLOYEES_SUCCESS":
            let { employees } = action.payload.data
            for (let employee of employees) {
                state.employees.byIds[employee.id] = employee
                if (state.employees.allIds.indexOf(employee.id) === -1) state.employees.allIds.push(employee.id);
            }
            return { 
                ...state, 
                employees: { 
                    ...state.employees, 
                    error: undefined, loading: false, allIds: [ ...state.employees.allIds ], byIds: { ...state.employees.byIds } 
                }
            }
        case "GET_EMPLOYEES_FAILED":
            return { 
                ...state,
                employees: { 
                    ...state.employees,  
                    error: action.error, 
                    loading: false, 
                    allIds: [ ...state.employees.allIds ], 
                    byIds: { ...state.employees.byIds } 
                }
            }


            case "GET_SINGLE_EMPLOYEE_REQUEST":
                return {
                    ...state,
                    singleEmployeeRequests: {
                        ...(
                            Object.keys(state.singleEmployeeRequests).filter(x => x != action.pk)
                                .map(key => state.singleEmployeeRequests[key])
                        ),
                        [action.pk]: {
                            loading: true,
                            error: false,
                            data: undefined
                        }
                    }
                }
            case "GET_SINGLE_EMPLOYEE_FAILED":
                return {
                    ...state,
                    singleEmployeeRequests: {
                        ...(
                            Object.keys(state.singleEmployeeRequests).filter(x => x != action.pk)
                                .map(key => state.singleEmployeeRequests[key])
                        ),
                        [action.pk]: {
                            loading: false,
                            error: action.error,
                            data: undefined
                        }
                    }
                }
            case "GET_SINGLE_EMPLOYEE_SUCCESS":
                if (state.employees.allIds.indexOf(action.payload.data.employee.id) === -1){
                    state.employees.allIds.push(action.payload.data.employee.id)
                } 
                state.employees.byIds[action.payload.data.employee.id] = action.payload.data.employee
                return {
                    ...state,
                    singleEmployeeRequests: {
                        ...(
                            Object.keys(state.singleEmployeeRequests).filter(x => x != action.pk)
                                .map(key => state.singleEmployeeRequests[key])
                        ),
                        [action.pk]: {
                            loading: false,
                            error: false,
                            data: action.payload.data.employee
                        }
                    },
                    employees: { ...state.employees }
                }
            case "DELETE_EMPLOYEE_SUCCESS":
                state.employees.byIds[action.pk] = undefined
                state.employees.allIds = state.employees.allIds.filter(x => x != action.pk)
                return {
                    ...state,
                    employees: { 
                        allIds: [ ...state.employees.allIds ],
                        byIds: { ...state.employees.byIds } 
                    }
                }
            case "CREATE_EMPLOYEE_SUCCESS":
                state.employees.byIds[action.payload.data.employee.id] = action.payload.data.employee
                state.employees.allIds.push(action.payload.data.employee.id)
                return {
                    ...state,
                    employees: { 
                        allIds: [ ...state.employees.allIds ],
                        byIds: { ...state.employees.byIds } 
                    }
                }
        default:
            return state;
    }
}

export default authReducer;