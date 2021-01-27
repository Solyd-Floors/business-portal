import store from "../store"

const defaultState = {
    singleEmployeeRequests: {},
    singleShipToAddressRequests: {},
    employees: {
        byIds: {},
        allIds: [],
        loading: false,
        error: undefined
    },
    ship_to_addresses: {
        byIds: {},
        allIds: [],
        loading: false,
        error: undefined
    },
    orders: {
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

            case "GET_SINGLE_SHIP_TO_ADDRESS_REQUEST":
                return {
                    ...state,
                    singleShipToAddressRequests: {
                        ...(
                            Object.keys(state.singleShipToAddressRequests).filter(x => x != action.pk)
                                .map(key => state.singleShipToAddressRequests[key])
                        ),
                        [action.pk]: {
                            loading: true,
                            error: false,
                            data: undefined
                        }
                    }
                }

            case "GET_SINGLE_SHIP_TO_ADDRESS_FAILED":
                return {
                    ...state,
                    singleShipToAddressRequests: {
                        ...(
                            Object.keys(state.singleShipToAddressRequests).filter(x => x != action.pk)
                                .map(key => state.singleShipToAddressRequests[key])
                        ),
                        [action.pk]: {
                            loading: false,
                            error: action.error,
                            data: undefined
                        }
                    }
                }
            case "GET_SINGLE_SHIP_TO_ADDRESS_SUCCESS":
                if (state.ship_to_addresses.allIds.indexOf(action.payload.data.ship_to_address.id) === -1){
                    state.ship_to_addresses.allIds.push(action.payload.data.ship_to_address.id)
                } 
                state.ship_to_addresses.byIds[action.payload.data.ship_to_address.id] = action.payload.data.ship_to_address
                return {
                    ...state,
                    singleShipToAddressRequests: {
                        ...(
                            Object.keys(state.singleShipToAddressRequests).filter(x => x != action.pk)
                                .map(key => state.singleShipToAddressRequests[key])
                        ),
                        [action.pk]: {
                            loading: false,
                            error: false,
                            data: action.payload.data.ship_to_address
                        }
                    },
                    ship_to_addresses: { ...state.ship_to_addresses }
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
            case "DELETE_SHIP_TO_ADDRESS_SUCCESS":
                state.ship_to_addresses.byIds[action.pk] = undefined
                state.ship_to_addresses.allIds = state.ship_to_addresses.allIds.filter(x => x != action.pk)
                return {
                    ...state,
                    ship_to_addresses: { 
                        allIds: [ ...state.ship_to_addresses.allIds ],
                        byIds: { ...state.ship_to_addresses.byIds } 
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
            case "CREATE_SHIP_TO_ADDRESS_SUCCESS":
                state.ship_to_addresses.byIds[action.payload.data.ship_to_address.id] = action.payload.data.ship_to_address
                state.ship_to_addresses.allIds.push(action.payload.data.ship_to_address.id)
                return {
                    ...state,
                    ship_to_addresses: { 
                        allIds: [ ...state.ship_to_addresses.allIds ],
                        byIds: { ...state.ship_to_addresses.byIds } 
                    }
                }

            case "UPDATE_EMPLOYEE_SUCCESS":
                state.employees.byIds[action.payload.data.employee.id] = action.payload.data.employee
                state.employees.allIds.push(action.payload.data.employee.id)
                return {
                    ...state,
                    employees: { 
                        allIds: [ ...state.employees.allIds ],
                        byIds: { ...state.employees.byIds } 
                    }
                }


            case "GET_SHIP_TO_ADDRESSES_REQUEST": 
                return { ...state, ship_to_addresses: { ...state.ship_to_addresses, loading: true } }
            case "GET_SHIP_TO_ADDRESSES_SUCCESS":
                let { ship_to_addresses } = action.payload.data
                for (let ship_to_address of ship_to_addresses) {
                    state.ship_to_addresses.byIds[ship_to_address.id] = ship_to_address
                    if (state.ship_to_addresses.allIds.indexOf(ship_to_address.id) === -1) state.ship_to_addresses.allIds.push(ship_to_address.id);
                }
                return { 
                    ...state, 
                    ship_to_addresses: { 
                        ...state.ship_to_addresses, 
                        error: undefined, loading: false, allIds: [ ...state.ship_to_addresses.allIds ], byIds: { ...state.ship_to_addresses.byIds } 
                    }
                }
            case "GET_SHIP_TO_ADDRESSES_FAILED":
                return { 
                    ...state,
                    ship_to_addresses: { 
                        ...state.ship_to_addresses,  
                        error: action.error, 
                        loading: false, 
                        allIds: [ ...state.ship_to_addresses.allIds ], 
                        byIds: { ...state.ship_to_addresses.byIds } 
                    }
                }
            case "GET_ORDERS_REQUEST": 
                return { ...state, orders: { ...state.orders, loading: true } }
            case "GET_ORDERS_SUCCESS":
                let { orders } = action.payload.data
                for (let order of orders) {
                    state.orders.byIds[order.id] = order
                    if (state.orders.allIds.indexOf(order.id) === -1) state.orders.allIds.push(order.id);
                }
                return { 
                    ...state, 
                    orders: { 
                        ...state.orders, 
                        error: undefined, loading: false, allIds: [ ...state.orders.allIds ], byIds: { ...state.orders.byIds } 
                    }
                }
            case "GET_ORDERS_FAILED":
                return { 
                    ...state,
                    orders: { 
                        ...state.orders,  
                        error: action.error, 
                        loading: false, 
                        allIds: [ ...state.orders.allIds ], 
                        byIds: { ...state.orders.byIds } 
                    }
                }
        default:
            return state;
    }
}

export default authReducer;